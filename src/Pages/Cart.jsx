import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Cart = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useContext(CartContext);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;



  // Debug cart state
  useEffect(() => {
    console.log("Current cart state:", cart);
    console.log("Cart in localStorage:", JSON.parse(localStorage.getItem("cart")));
  }, [cart]);

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return Number(priceStr.replace("Ksh ", "").replace(",", "")) || 0;
  };

  const totalItems = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, cartItem) => acc + parsePrice(cartItem.item.price) * cartItem.quantity,
    0
  );

  const validatePhoneNumber = (phone) => {
    const cleanedPhone = phone.replace(/\s/g, "");
    return /^0\d{9}$/.test(cleanedPhone) || /^254\d{9}$/.test(cleanedPhone);
  };

  const handlePay = async () => {
    if (!token) {
      toast.error("Please log in to proceed with payment");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    if (!phone) {
      toast.error("Please enter a phone number");
      return;
    }

    if (!validatePhoneNumber(phone)) {
      toast.error("Please enter a valid phone number (e.g., 07xxxxxxxx or 254xxxxxxxx)");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setLoading(true);
      const orderItems = cart.map((cartItem) => ({
        item: cartItem.item,
        type: cartItem.type,
        quantity: cartItem.quantity,
      }));

      // Create order in DB
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: orderItems,
          phone,
          amount: `Ksh ${totalPrice.toLocaleString()}`,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order created successfully. Initiating MPESA payment...");

      // Format phone number for MPESA
      let formattedPhone = phone.replace(/\s/g, "");
      if (formattedPhone.startsWith("0")) {
        formattedPhone = "254" + formattedPhone.slice(1);
      }

      // Initiate STK Push
      const stkRes = await axios.post(
        "http://localhost:5000/api/mpesa/stkpush",
        { phone: formattedPhone, amount: totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(stkRes.data.message || "Check your phone for MPESA prompt");
      clearCart();
      setPhone("");
    } catch (err) {
      console.error("Payment Error:", err);
      const errorMessage = err.response?.data?.message || "Failed to process payment. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto w-full px-4 py-8 sm:py-12 flex-grow">
        
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/home" className="group flex items-center text-gray-500 hover:text-green-600 transition-colors">
            <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100 group-hover:border-green-200 transition-colors mr-3">
               <FaArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Continue Shopping</span>
          </Link>
          <div className="flex-1 text-center pr-12">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Shopping Cart</h1>
            <p className="text-gray-500 text-sm mt-1">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 mb-4">
                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                  <p className="text-gray-500 text-sm mt-1">Looks like you haven't added anything yet.</p>
                  <Link to="/home" className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
                    Start Exploring
                  </Link>
               </div>
            ) : (
              <ul className="space-y-4">
                {cart.map((cartItem, idx) => (
                  <li
                    key={`${cartItem.item._id}-${idx}`}
                    className="group relative bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100">
                       <img 
                          src={cartItem.item.image || "https://via.placeholder.com/150"} 
                          alt={cartItem.item.title} 
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
                      <h3 className="font-bold text-gray-900 text-lg">{cartItem.item.title || "Unknown Item"}</h3>
                      <p className="text-gray-500 text-sm mt-0.5">{cartItem.type}</p>
                      <p className="text-green-600 font-bold text-sm mt-2">{cartItem.item.price || "N/A"}</p>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 mt-2 sm:mt-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-200/50">
                          <button
                            onClick={() => updateQuantity(cartItem.item._id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-white text-gray-600 rounded-lg shadow-sm hover:text-green-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900">{cartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(cartItem.item._id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white text-gray-600 rounded-lg shadow-sm hover:text-green-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Delete Button */}
                        <button
                          onClick={() => removeItem(cartItem.item._id)}
                          className="flex items-center justify-center w-10 h-10 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all sm:ml-4"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                 <div className="flex justify-between text-gray-500 text-sm">
                   <span>Subtotal ({totalItems} items)</span>
                   <span className="font-medium text-gray-900">Ksh {totalPrice.toLocaleString()}</span>
                 </div>

                 <div className="border-t border-gray-100 pt-4 flex justify-between">
                   <span className="text-base font-bold text-gray-900">Order Total</span>
                   <span className="text-xl font-extrabold text-green-600">Ksh {totalPrice.toLocaleString()}</span>
                 </div>
              </div>

              <div className="space-y-4">
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Phone Number</label>
                   <input
                    type="text"
                    placeholder="07xxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white py-3 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  />
                </div>
                
                <button
                  onClick={handlePay}
                  disabled={loading || cart.length === 0}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/30 transform hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    "Pay with M-PESA"
                  )}
                </button>
                
                <p className="text-center text-xs text-gray-400 mt-4">
                   Secure payment processed via M-PESA.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
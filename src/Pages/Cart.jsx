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
  const [bookingsCount, setBookingsCount] = useState(0);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;

  // Fetch bookings count
  useEffect(() => {
    if (token) {
      const fetchBookings = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/orders/my-orders", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const paidOrders = res.data.filter(order => order.status === 'paid');
          setBookingsCount(paidOrders.length);
        } catch (err) {
          console.error("Fetch Bookings Error:", err);
          toast.error("Failed to fetch bookings");
        }
      };
      fetchBookings();
    }
  }, [token]);

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
      const createRes = await axios.post(
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
    <div className="max-w-2xl mx-auto my-10 p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <Link to="/home" className="text-green-700 hover:text-green-900" aria-label="Back to homepage">
          <FaArrowLeft className="text-xl sm:text-2xl" />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-700 flex-1">
          Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </h1>
      </div>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-sm sm:text-base">
          Your cart is empty.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200 mb-4">
          {cart.map((cartItem, idx) => (
            <li
              key={`${cartItem.item._id}-${idx}`}
              className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <div className="flex-1">
                <span className="font-medium text-sm sm:text-base">
                  {cartItem.item.title || "Unknown Item"} ({cartItem.quantity} x {cartItem.item.price || "N/A"})
                </span>
                <span className="block text-gray-500 text-xs sm:text-sm">
                  {cartItem.type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(cartItem.item._id, -1)}
                  className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
                  aria-label={`Decrease quantity of ${cartItem.item.title || "item"}`}
                >
                  -
                </button>
                <span className="text-sm sm:text-base">{cartItem.quantity}</span>
                <button
                  onClick={() => updateQuantity(cartItem.item._id, 1)}
                  className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
                  aria-label={`Increase quantity of ${cartItem.item.title || "item"}`}
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(cartItem.item._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  aria-label={`Remove ${cartItem.item.title || "item"} from cart`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-base sm:text-lg">Total:</span>
        <span className="font-bold text-base sm:text-lg text-green-600">
          Ksh {totalPrice.toLocaleString()}
        </span>
      </div>

      <input
        type="text"
        placeholder="Enter phone number (e.g., 07xxxxxxxx)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none mb-4 text-sm sm:text-base"
        aria-label="Phone number for MPESA payment"
      />

      <div className="relative">
        <button
          onClick={handlePay}
          disabled={loading || cart.length === 0}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors duration-200 disabled:opacity-60 text-sm sm:text-base"
          aria-label="Pay with MPESA"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            "Pay with MPESA"
          )}
        </button>
        {bookingsCount > 0 && (
          <span className="sm:hidden absolute top-1 right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {bookingsCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default Cart;
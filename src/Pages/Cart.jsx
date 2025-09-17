import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CartContext } from "../Context/CartContext";

const Cart = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useContext(CartContext);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;

  const parsePrice = (priceStr) => {
    return Number(priceStr.replace("Ksh ", "").replace(",", "")) || 0;
  };

  const totalItems = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, cartItem) => acc + parsePrice(cartItem.item.price) * cartItem.quantity,
    0
  );

  const handlePay = async () => {
    if (!phone) return toast.error("Enter phone number");
    if (!token) return toast.error("You must be logged in to pay");

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
          amount: `Ksh ${totalPrice}`,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order created. Initiating MPESA payment...");

      // Initiate STK Push
      const res = await axios.post(
        "http://localhost:5000/api/mpesa/stkpush",
        { phone, amount: totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Payment initiated");

      // Clear cart
      clearCart();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-700">
        Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
      </h1>

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
                  {cartItem.item.title} ({cartItem.quantity} x {cartItem.item.price})
                </span>
                <span className="block text-gray-500 text-xs sm:text-sm">
                  {cartItem.type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(cartItem.item._id, -1)}
                  className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
                  aria-label={`Decrease quantity of ${cartItem.item.title}`}
                >
                  -
                </button>
                <span className="text-sm sm:text-base">{cartItem.quantity}</span>
                <button
                  onClick={() => updateQuantity(cartItem.item._id, 1)}
                  className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
                  aria-label={`Increase quantity of ${cartItem.item.title}`}
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(cartItem.item._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  aria-label={`Remove ${cartItem.item.title} from cart`}
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

      <button
        onClick={handlePay}
        disabled={loading || cart.length === 0}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors duration-200 disabled:opacity-60 text-sm sm:text-base"
        aria-label="Pay with MPESA"
      >
        {loading ? "Processing..." : "Pay with MPESA"}
      </button>
    </div>
  );
};

export default Cart;
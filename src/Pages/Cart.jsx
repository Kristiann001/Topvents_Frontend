import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Cart = ({ user }) => {
  const [cart, setCart] = useState([]);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const total = cart.reduce((acc, item) => acc + Number(item.price || 0), 0);

  const handlePay = async () => {
    if (!phone) return toast.error("Enter phone number");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/mpesa/stkpush",
        { phone, amount: total },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success(res.data.message);
      localStorage.removeItem("cart");
      setCart([]);
    } catch {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="divide-y divide-gray-200 mb-4">
          {cart.map((item, idx) => (
            <li key={idx} className="py-3 flex justify-between items-center">
              <span className="font-medium">{item.title}</span>
              <span className="text-gray-700 font-semibold">KES {item.price}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-lg">Total:</span>
        <span className="font-bold text-lg text-green-600">KES {total}</span>
      </div>

      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none mb-4"
      />

      <button
        onClick={handlePay}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors duration-200"
      >
        Pay with MPESA
      </button>
    </div>
  );
};

export default Cart;

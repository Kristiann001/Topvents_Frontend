import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { toast } from "react-hot-toast";

function Stays() {
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const token = storedUser?.token;
  const isAdmin = storedUser?.role === "Admin";

  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  // Fetch stays
  useEffect(() => {
    const fetchStays = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties/stays");
        setStays(res.data);
      } catch (err) {
        console.error("Failed to fetch stays:", err);
        toast.error("Failed to load stays");
      } finally {
        setLoading(false);
      }
    };
    fetchStays();
  }, []);

  // Add stay
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.price || !form.image) {
      toast.error("All fields are required");
      return;
    }

    try {
      setAdding(true);
      const res = await axios.post(
        "http://localhost:5000/api/properties/stays",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStays((prev) => [...prev, res.data]);
      toast.success("Stay added successfully");
      setForm({ title: "", description: "", price: "", image: "" });
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add stay");
    } finally {
      setAdding(false);
    }
  };

  // Delete stay
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/properties/stays/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStays(stays.filter((s) => s._id !== id));
      toast.success("Stay deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete stay");
    }
  };

  // Customer book
  const handleBook = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${item.title} added to cart`);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-stone-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Hotels & Stays</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Discover comfort and elegance in our curated selection of hotels,
          offering world-class hospitality, modern amenities, and unforgettable experiences.
        </p>
      </div>

      {/* Header + Add Button */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Available Stays</h2>
        {isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Add Stay
          </button>
        )}
      </div>

      {/* Stays Grid */}
      {loading ? (
        <p className="text-center mt-10">Loading stays...</p>
      ) : (
        <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stays.map((s) => (
            <div
              key={s._id}
              className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <img
                src={s.image}
                alt={s.title}
                className="rounded-t-lg w-full h-48 object-cover"
              />
              <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                  {s.title}
                </h5>
                <p className="mb-3 text-gray-700">{s.description}</p>
                <p className="text-lg font-semibold text-gray-900 mb-3">
                  Price: <span className="text-green-600">{s.price}</span>
                </p>

                {!isAdmin && (
                  <button
                    onClick={() => handleBook(s)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Book Now
                  </button>
                )}

                {isAdmin && (
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="inline-flex items-center ml-2 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          ></div>
          <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <form onSubmit={handleAddSubmit}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Stay</h2>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <label className="block mb-2 text-sm font-medium">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full border p-2 rounded mb-3"
                required
              />

              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full border p-2 rounded mb-3"
                rows="4"
                required
              />

              <label className="block mb-2 text-sm font-medium">Price</label>
              <input
                name="price"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full border p-2 rounded mb-3"
                required
              />

              <label className="block mb-2 text-sm font-medium">Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                className="w-full border p-2 rounded mb-4"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  {adding ? "Adding..." : "Add Stay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Stays;

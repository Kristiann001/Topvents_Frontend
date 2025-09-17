import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { toast } from "react-hot-toast";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const firstInputRef = useRef(null);

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    type: "Event",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    fetchItems();
  }, []);

  const isValidImageUrl = (url) => /^https?:\/\/.+/i.test(url);

  const fetchItems = async () => {
    setFetchLoading(true);
    try {
      const [events, getaways, stays] = await Promise.all([
        axios.get("http://localhost:5000/api/events"),
        axios.get("http://localhost:5000/api/getaways"),
        axios.get("http://localhost:5000/api/stays"),
      ]);

      setItems([
        ...events.data.map((e) => ({ ...e, type: "Event" })),
        ...getaways.data.map((g) => ({ ...g, type: "Getaway" })),
        ...stays.data.map((s) => ({ ...s, type: "Stay" })),
      ]);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load items");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!isValidImageUrl(form.imageUrl)) {
      setError("❌ Please enter a valid image URL starting with http:// or https://");
      setLoading(false);
      return;
    }

    const formattedPrice = `Ksh ${form.price.replace(/,/g, '')}`;

    const endpointMap = {
      Event: "/api/events",
      Getaway: "/api/getaways",
      Stay: "/api/stays",
    };
    const endpoint = endpointMap[form.type] || "/api/events";

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000${endpoint}/${currentId}`, {
          title: form.title,
          description: form.description,
          price: formattedPrice,
          image: form.imageUrl,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess("✅ Item updated successfully!");
      } else {
        await axios.post(`http://localhost:5000${endpoint}`, {
          title: form.title,
          description: form.description,
          price: formattedPrice,
          image: form.imageUrl,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess("✅ Item added successfully!");
      }

      resetForm();
      setShowModal(false);
      fetchItems();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (item) => {
    const toastId = toast.custom(
      (t) => (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-md">
          <p className="text-gray-800 mb-4 text-sm md:text-base">
            Are you sure you want to delete <strong>{item.title}</strong>?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm md:text-base"
              onClick={() => toast.dismiss(t.id)}
              aria-label="Cancel deletion"
            >
              No
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm md:text-base"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const endpointMap = {
                    Event: "/api/events",
                    Getaway: "/api/getaways",
                    Stay: "/api/stays",
                  };
                  const endpoint = endpointMap[item.type];
                  await axios.delete(`http://localhost:5000${endpoint}/${item._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  toast.success("✅ Item deleted successfully!");
                  fetchItems();
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to delete item");
                }
              }}
              aria-label={`Confirm deletion of ${item.title}`}
            >
              Yes
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      price: item.price.replace('Ksh ', '').replace(',', ''),
      imageUrl: item.image,
      type: item.type,
    });
    setCurrentId(item._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      imageUrl: "",
      type: "Event",
    });
    setError("");
    setIsEditing(false);
    setCurrentId(null);
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-gray-800 drop-shadow-sm">
            Admin Dashboard
          </h1>

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 border border-green-300 text-sm sm:text-base">
              {success}
            </div>
          )}

          <button
            className="bg-green-600 hover:bg-green-700 transition-colors text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-md font-medium text-sm sm:text-base mb-6"
            onClick={openModal}
            aria-label="Add new item"
          >
            ➕ Add New Item
          </button>

          {fetchLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm sm:text-base">
              No items found
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs sm:text-sm">
                      <tr>
                        <th className="p-3 sm:p-4">Title</th>
                        <th className="p-3 sm:p-4">Description</th>
                        <th className="p-3 sm:p-4">Price</th>
                        <th className="p-3 sm:p-4">Type</th>
                        <th className="p-3 sm:p-4">Image</th>
                        <th className="p-3 sm:p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item._id}
                          className="border-t hover:bg-gray-50 transition"
                        >
                          <td className="p-3 sm:p-4 font-medium text-sm sm:text-base">
                            {item.title}
                          </td>
                          <td className="p-3 sm:p-4 truncate max-w-[120px] sm:max-w-[200px] text-sm sm:text-base">
                            {item.description}
                          </td>
                          <td className="p-3 sm:p-4 text-sm sm:text-base">{item.price}</td>
                          <td className="p-3 sm:p-4 text-sm sm:text-base">{item.type}</td>
                          <td className="p-3 sm:p-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                            />
                          </td>
                          <td className="p-3 sm:p-4 space-x-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                              aria-label={`Edit ${item.title}`}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm transition-colors"
                              aria-label={`Delete ${item.title}`}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="block sm:hidden space-y-4">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <h3 className="font-medium text-base">{item.title}</h3>
                      </div>
                      <p className="text-gray-700 text-sm truncate">
                        {item.description}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        Price: <span className="text-green-600">{item.price}</span>
                      </p>
                      <p className="text-sm text-gray-700">Type: {item.type}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                          aria-label={`Edit ${item.title}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm transition-colors"
                          aria-label={`Delete ${item.title}`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
              <div className="bg-white rounded-2xl shadow-2xl w-full sm:max-w-lg h-full sm:h-auto max-h-[90vh] overflow-y-auto p-4 sm:p-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                    {isEditing ? "Edit Item" : "Add New Item"}
                  </h2>
                  <button
                    className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
                    onClick={() => setShowModal(false)}
                    aria-label="Close modal"
                    disabled={loading}
                  >
                    &times;
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-sm sm:text-base"
                      required
                      aria-label="Item type"
                    >
                      <option value="Event">Event</option>
                      <option value="Getaway">Getaway</option>
                      <option value="Stay">Stay</option>
                    </select>

                    <input
                      ref={firstInputRef}
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Title"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-sm sm:text-base"
                      required
                      aria-label="Item title"
                    />

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Description"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none resize-none h-24 text-sm sm:text-base"
                      required
                      aria-label="Item description"
                    />

                    <input
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Price"
                      type="number"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-sm sm:text-base"
                      required
                      min="0"
                      aria-label="Item price"
                    />

                    <input
                      name="imageUrl"
                      value={form.imageUrl}
                      onChange={handleChange}
                      placeholder="Image URL"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-sm sm:text-base"
                      required
                      aria-label="Item image URL"
                    />
                    {form.imageUrl && isValidImageUrl(form.imageUrl) && (
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="w-full h-40 sm:h-48 object-cover rounded-lg border shadow"
                      />
                    )}

                    {error && (
                      <div className="p-3 rounded-lg bg-red-100 text-red-700 border border-red-300 text-sm sm:text-base">
                        {error}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      className="px-4 sm:px-5 py-2 sm:py-3 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 text-sm sm:text-base"
                      onClick={() => setShowModal(false)}
                      disabled={loading}
                      aria-label="Cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 sm:px-5 py-2 sm:py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-md font-medium text-sm sm:text-base flex items-center"
                      disabled={
                        loading ||
                        !form.title ||
                        !form.description ||
                        !form.price ||
                        !form.imageUrl
                      }
                      aria-label={isEditing ? "Update item" : "Add item"}
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                          Saving...
                        </div>
                      ) : isEditing ? (
                        "Update"
                      ) : (
                        "Add"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
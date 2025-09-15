import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Stays() {
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const isAdmin = storedUser?.role === "Admin";

  const [stays, setStays] = useState([
  {
    id: 1,
    title: "PIYE Beach Resort",
    description:
      "A luxurious coastal escape offering pristine beaches, oceanfront suites, and world-class dining — perfect for relaxation and romance.",
    price: "Ksh 18,500",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Everpeak Mountain Lodge",
    description:
      "Nestled high in the mountains, this serene lodge offers cozy cabins, breathtaking views, and access to scenic hiking and nature trails.",
    price: "Ksh 12,000",
    image:
      "https://images.unsplash.com/photo-1588858027324-cdd07d015c29?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Coral Sands Resort",
    description:
      "A tropical haven surrounded by turquoise waters, vibrant coral reefs, and luxurious beachfront villas for the ultimate island experience.",
    price: "Ksh 20,000",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "Savannah Plains Safari Lodge",
    description:
      "Experience the magic of Africa with guided game drives, luxury tented camps, and panoramic views of the untamed savannah.",
    price: "Ksh 25,000",
    image:
      "https://images.unsplash.com/photo-1709403337027-45324f24fae3?w=600&auto=format&fit=crop&q=60",
  },
]);


  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [adding, setAdding] = useState(false);

  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
  });

  const confirmDelete = (id) => {
    setToDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setToDeleteId(null);
    setShowDeleteConfirm(false);
  };

  const performDelete = () => {
    setStays((prev) => prev.filter((s) => s.id !== toDeleteId));
    setToDeleteId(null);
    setShowDeleteConfirm(false);
  };

  const openAdd = () => setShowAddModal(true);
  const closeAdd = () => {
    setShowAddModal(false);
    setForm({ image: "", title: "", description: "", price: "" });
  };

  const handleFormChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.price || !form.image) return;

    setAdding(true);
    setStays((prev) => [
      ...prev,
      { id: Date.now(), title: form.title, description: form.description, price: form.price, image: form.image },
    ]);
    setAdding(false);
    closeAdd();
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
            onClick={openAdd}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Add Stay
          </button>
        )}
      </div>

      {/* Stays Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stays.map((s) => (
          <div key={s.id} className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition">
            <img src={s.image} alt={s.title} className="rounded-t-lg w-full h-48 object-cover" />
            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{s.title}</h5>
              <p className="mb-3 text-gray-700">{s.description}</p>
              <p className="text-lg font-semibold text-gray-900 mb-3">Price: <span className="text-green-600">{s.price}</span></p>

              {!isAdmin && (
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                  Book Now
                </button>
              )}

              {isAdmin && (
                <div className="relative">
                  <button
                    onClick={() => confirmDelete(s.id)}
                    className="inline-flex items-center ml-2 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>

                  {/* Toast style delete confirmation above card */}
                  {showDeleteConfirm && toDeleteId === s.id && (
                    <div className="absolute top-[-90px] left-0 z-50 w-64 bg-white border border-gray-300 shadow-lg rounded-lg p-4 text-gray-800">
                      <p className="text-sm mb-2">Are you sure you want to delete this stay?</p>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={cancelDelete}
                          className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={performDelete}
                          className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Footer />

      {/* Add Stay Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeAdd}></div>
          <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <form onSubmit={handleAddSubmit}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Stay</h2>
                <button type="button" onClick={closeAdd} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>

              <label className="block mb-2 text-sm font-medium">Image URL</label>
              <input name="image" value={form.image} onChange={handleFormChange} className="w-full border p-2 rounded mb-3" placeholder="https://..." required />

              <label className="block mb-2 text-sm font-medium">Title</label>
              <input name="title" value={form.title} onChange={handleFormChange} className="w-full border p-2 rounded mb-3" placeholder="Stay title" required />

              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full border p-2 rounded mb-3" rows="4" placeholder="Stay description" required />

              <label className="block mb-2 text-sm font-medium">Price</label>
              <input name="price" value={form.price} onChange={handleFormChange} className="w-full border p-2 rounded mb-4" placeholder="Ksh 20000" required />

              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeAdd} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button type="submit" disabled={adding} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
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

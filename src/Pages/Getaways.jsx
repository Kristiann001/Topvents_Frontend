import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Getaways() {
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const isAdmin = storedUser?.role === "Admin";

  const [getaways, setGetaways] = useState([
    {
      id: 1,
      title: "Beach Getaway",
      description:
        "Relax by the ocean with golden sands beneath your feet, sip refreshing cocktails under palm trees, and watch breathtaking sunsets right from your private balcony. Perfect for a romantic escape or family retreat.",
      price: "Ksh 12,000",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      title: "Mountain Retreat",
      description:
        "Escape to a serene mountain lodge surrounded by pine forests and fresh alpine air. Explore scenic hiking trails, cozy up by the fireplace, or simply enjoy the peaceful silence away from the busy city life.",
      price: "Ksh 10,000",
      image:
        "https://images.unsplash.com/photo-1588858027324-cdd07d015c29?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      title: "Tropical Paradise",
      description:
        "Step into an exotic island escape with turquoise waters, white sandy beaches, and luxury villas. Swim with dolphins, indulge in spa treatments, and savor fine dining with ocean views in a true paradise.",
      price: "Ksh 25,000",
      image:
        "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 4,
      title: "Safari Adventure",
      description:
        "Experience the thrill of the wild with guided game drives, majestic wildlife sightings, and luxury tented camps under the stars. Perfect for adventurers seeking unforgettable memories in the heart of nature.",
      price: "Ksh 30,000",
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
    setGetaways((prev) => prev.filter((g) => g.id !== toDeleteId));
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
    setGetaways((prev) => [...prev, { id: Date.now(), ...form }]);
    setAdding(false);
    closeAdd();
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-teal-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Holiday Getaways
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Escape the ordinary and experience unforgettable holiday destinations,
          where relaxation meets adventure and cherished memories are made.
        </p>
      </div>

      {/* Header + Add Button */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Holidays</h2>
        {isAdmin && (
          <button
            onClick={openAdd}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Add Getaway
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {getaways.map((g) => (
          <div
            key={g.id}
            className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition"
          >
            <img
              className="rounded-t-lg w-full h-48 object-cover"
              src={g.image}
              alt={g.title}
            />
            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold text-gray-900">
                {g.title}
              </h5>
              <p className="mb-3 text-gray-700">{g.description}</p>
              <p className="text-lg font-semibold text-gray-900 mb-3">
                Price: <span className="text-green-600">{g.price}</span>
              </p>

              {!isAdmin && (
                <button className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                  Book Now
                </button>
              )}

              {isAdmin && (
                <div className="relative">
                  <button
                    onClick={() => confirmDelete(g.id)}
                    className="px-3 py-2 ml-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>

                  {showDeleteConfirm && toDeleteId === g.id && (
                    <div className="absolute top-[-90px] left-0 z-50 w-64 bg-white border border-gray-300 shadow-lg rounded-lg p-4 text-gray-800">
                      <p className="text-sm mb-2">
                        Are you sure you want to delete this getaway?
                      </p>
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

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeAdd}
          ></div>
          <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <form onSubmit={handleAddSubmit}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Event</h2>
                <button
                  type="button"
                  onClick={closeAdd}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <label className="block mb-2 text-sm font-medium">
                Image URL
              </label>
              <input
                name="image"
                value={form.image}
                onChange={handleFormChange}
                className="w-full border p-2 rounded mb-3"
                placeholder="https://..."
                required
              />

              <label className="block mb-2 text-sm font-medium">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleFormChange}
                className="w-full border p-2 rounded mb-3"
                placeholder="Event title"
                required
              />

              <label className="block mb-2 text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                className="w-full border p-2 rounded mb-3"
                rows="4"
                placeholder="Event description"
                required
              />

              <label className="block mb-2 text-sm font-medium">Price</label>
              <input
                name="price"
                value={form.price}
                onChange={handleFormChange}
                className="w-full border p-2 rounded mb-4"
                placeholder="Ksh 5000"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeAdd}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  {adding ? "Adding..." : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Getaways;

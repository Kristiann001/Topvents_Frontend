import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Events() {
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const isAdmin = storedUser?.role === "Admin";

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Innovations Summit 2024",
      description:
        "Explore the cutting-edge trends in AI, blockchain, and smart technology with industry leaders and innovators.",
      price: "Ksh 18,000",
      image:
        "https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      title: "Business Growth Conference",
      description:
        "Learn from top entrepreneurs about strategies to scale your business, increase revenue, and maximize efficiency.",
      price: "Ksh 22,500",
      image:
        "https://plus.unsplash.com/premium_photo-1679547202671-f9dbbf466db4?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      title: "Startup Insights Forum",
      description:
        "Gain valuable knowledge from successful startup founders, investors, and mentors on how to navigate the challenges of launching a business.",
      price: "Ksh 15,000",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 4,
      title: "AI Revolution Summit",
      description:
        "Dive deep into the future of AI, machine learning, and automation with experts who are transforming industries worldwide.",
      price: "Ksh 20,000",
      image:
        "https://images.unsplash.com/photo-1686397140330-40f4c9919b58?w=600&auto=format&fit=crop&q=60",
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
    setEvents((prev) => prev.filter((ev) => ev.id !== toDeleteId));
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
    setEvents((prev) => [...prev, { id: Date.now(), ...form }]);
    setAdding(false);
    closeAdd();
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-green-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Upcoming Events
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Discover our latest events designed to inspire, educate, and connect
          you with industry leaders.
        </p>
      </div>

      {/* Header + Add Button */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Events</h2>
        {isAdmin && (
          <button
            onClick={openAdd}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Add Event
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition"
          >
            <img
              className="rounded-t-lg w-full h-48 object-cover"
              src={ev.image}
              alt={ev.title}
            />
            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold text-gray-900">
                {ev.title}
              </h5>
              <p className="mb-3 text-gray-700">{ev.description}</p>
              <p className="text-lg font-semibold text-gray-900 mb-3">
                Price: <span className="text-green-600">{ev.price}</span>
              </p>

              {!isAdmin && (
                <button className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                  Book Now
                </button>
              )}

              {isAdmin && (
                <div className="relative">
                  <button
                    onClick={() => confirmDelete(ev.id)}
                    className="px-3 py-2 ml-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>

                  {showDeleteConfirm && toDeleteId === ev.id && (
                    <div className="absolute top-[-90px] left-0 z-50 w-64 bg-white border border-gray-300 shadow-lg rounded-lg p-4 text-gray-800">
                      <p className="text-sm mb-2">
                        Are you sure you want to delete this event?
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
                <h2 className="text-xl font-semibold">Add New Getaway</h2>
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
                placeholder="Getaway title"
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
                placeholder="Getaway description"
                required
              />

              <label className="block mb-2 text-sm font-medium">Price</label>
              <input
                name="price"
                value={form.price}
                onChange={handleFormChange}
                className="w-full border p-2 rounded mb-4"
                placeholder="Ksh 20000"
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
                  {adding ? "Adding..." : "Add Getaway"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Events;

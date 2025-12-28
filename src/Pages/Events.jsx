import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast } from "react-hot-toast";
import { CartContext } from "../Context/CartContext";

function Events() {
  const { addToCart } = useContext(CartContext);

  const storedUser = (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  })();

  const token = storedUser?.token || null;
  const isAdmin = storedUser?.role === "Admin";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
      } catch (err) {
        toast.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = (event) => {
    if (!isAdmin || !token) {
      toast.error("You must be logged in as an Admin");
      return;
    }
    const toastId = toast.custom(
      (t) => (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-md transition-opacity duration-300">
          <p className="text-gray-800 mb-4 text-sm sm:text-base">
            Are you sure you want to delete <strong>{event.title}</strong>?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm sm:text-base"
              onClick={() => toast.dismiss(t.id)}
              aria-label="Cancel deletion"
            >
              No
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm sm:text-base"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await axios.delete(`http://localhost:5000/api/events/${event._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  setEvents(events.filter((ev) => ev._id !== event._id));
                  toast.success("Event deleted successfully");
                } catch (err) {
                  toast.error(err.response?.data?.message || "Failed to delete event");
                }
              }}
              aria-label={`Confirm deletion of ${event.title}`}
            >
              Yes
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  return (
    <>
      <Navbar />
      <div className="relative bg-green-600 text-white py-12 sm:py-16 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Upcoming Events
        </h1>
        <p className="max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-lg opacity-90">
          Discover our latest events designed to inspire, educate, and connect
          you with industry leaders.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Events
        </h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500 text-sm sm:text-base">
            No events available
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-12 sm:pb-16">
            {events.map((item, idx) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-fadeIn"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <a href="#" aria-label={`View ${item.title} details`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-t-lg w-full h-40 sm:h-48 object-cover"
                    loading="lazy"
                  />
                </a>
                <div className="p-4 sm:p-5">
                  <h5 className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                    {item.title}
                  </h5>
                  <p className="mb-3 text-gray-700 text-sm sm:text-base line-clamp-3">
                    {item.description}
                  </p>
                  <p className="mb-3 text-base sm:text-lg font-semibold text-gray-900">
                    Price: <span className="text-green-600">{item.price}</span>
                  </p>
                  <div className="flex gap-2">
                    {storedUser?.role === "Customer" && (
                      <button
                        onClick={() => {
                          addToCart(item, "Event");
                          toast.success(`${item.title} added to cart`);
                        }}
                        className="flex-1 px-4 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                        aria-label={`Book ${item.title}`}
                      >
                        Book Now
                      </button>
                    )}
                    {storedUser?.role === "Admin" && (
                      <button
                        onClick={() => handleDelete(item)}
                        className="flex-1 px-4 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                        aria-label={`Delete ${item.title}`}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Events;
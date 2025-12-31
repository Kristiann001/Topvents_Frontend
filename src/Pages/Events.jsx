import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SearchInput from "../Components/SearchInput";
import { confirmDelete } from "../Components/DeleteConfirmation";
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
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const query = debouncedSearch ? `?search=${debouncedSearch}` : "";
        const res = await axios.get(`http://localhost:5000/api/events${query}`);
        setEvents(res.data);
      } catch {
        // Fixed: Removed unused 'err' variable
        toast.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [debouncedSearch]);

  const handleDelete = (event) => {
    if (!isAdmin || !token) {
      toast.error("You must be logged in as an Admin");
      return;
    }

    confirmDelete({
      title: event.title,
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/events/${event._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEvents(events.filter((ev) => ev._id !== event._id));
          toast.success("Event deleted successfully");
        } catch (err) {
          toast.error(err.response?.data?.message || "Failed to delete event");
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 to-teal-700 text-white py-20 px-4 sm:px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Upcoming Events
          </h1>
          <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover our latest events designed to inspire, educate, and connect
            you with industry leaders.
          </p>
          <SearchInput onSearch={setSearch} placeholder="Search events..." />
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Latest Events
          </h2>
          {events.length > 0 && (
            <span className="text-gray-500 text-sm font-medium">
              Showing {events.length} results
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No events found matching criteria</p>
            <button 
              onClick={() => setSearch("")}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {events.map((item, idx) => (
              <div
                key={item._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="relative aspect-video overflow-hidden">
                   <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm">
                    {item.price}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h5 className="mb-2 text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h5>
                  <p className="mb-4 text-gray-600 text-sm line-clamp-2 flex-grow">
                    {item.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50 flex gap-3">
                    {storedUser?.role === "Customer" && (
                      <button
                        onClick={() => {
                          addToCart(item, "Event");
                          toast.success(`${item.title} added to cart`);
                        }}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 active:scale-95 transition-all shadow-sm hover:shadow-green-200"
                        aria-label={`Book ${item.title}`}
                      >
                        Book Now
                      </button>
                    )}
                    {storedUser?.role === "Admin" && (
                      <button
                        onClick={() => handleDelete(item)}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 active:scale-95 transition-all shadow-sm hover:shadow-red-200"
                        aria-label={`Delete ${item.title}`}
                      >
                        Delete
                      </button>
                    )}
                    {!storedUser && (
                       <button
                       disabled
                       className="flex-1 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-xl cursor-not-allowed"
                     >
                       Login to Book
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
    </div>
  );
}

export default Events;
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SearchInput from "../Components/SearchInput";
import { confirmDelete } from "../Components/DeleteConfirmation";
import { toast } from "react-hot-toast";
import { CartContext } from "../Context/CartContext";

function Stays() {
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

  const [stays, setStays] = useState([]);
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
    const fetchStays = async () => {
      setLoading(true);
      try {
        const query = debouncedSearch ? `?search=${debouncedSearch}` : "";
        const res = await axios.get(`http://localhost:5000/api/stays${query}`);
        setStays(res.data);
      } catch (err) {
        toast.error("Failed to fetch stays");
      } finally {
        setLoading(false);
      }
    };
    fetchStays();
  }, [debouncedSearch]);

  const handleDelete = (stay) => {
    if (!isAdmin || !token) {
      toast.error("You must be logged in as an Admin");
      return;
    }

    confirmDelete({
      title: stay.title,
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/stays/${stay._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStays(stays.filter((s) => s._id !== stay._id));
          toast.success("Stay deleted successfully");
        } catch (err) {
          toast.error(err.response?.data?.message || "Failed to delete stay");
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br bg-stone-600 text-white py-20 px-4 sm:px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Hotels & Stays
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover comfort and elegance in our curated selection of hotels,
            offering world-class hospitality, modern amenities, and unforgettable
            experiences.
          </p>
          <SearchInput onSearch={setSearch} placeholder="Search stays & hotels..." />
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Available Stays
          </h2>
          {stays.length > 0 && (
            <span className="text-gray-500 text-sm font-medium">
              Showing {stays.length} results
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : stays.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No stays found matching criteria</p>
            <button 
              onClick={() => setSearch("")}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {stays.map((item, idx) => (
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
                          addToCart(item, "Stay");
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

export default Stays;
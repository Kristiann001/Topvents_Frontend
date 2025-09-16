import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-transparent backdrop-blur-lg border-transparent shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand */}
        <Link to="/" className="text-3xl font-bold text-black">
          TopVents
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex md:hidden items-center p-2 rounded-lg hover:bg-black/10"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 17 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link to="/" className="text-black hover:text-green-700">
            Home
          </Link>
          <Link to="/events" className="text-black hover:text-green-700">
            Events
          </Link>
          <Link to="/getaways" className="text-black hover:text-green-700">
            Getaways
          </Link>
          <Link to="/stays" className="text-black hover:text-green-700">
            Stays
          </Link>
        </div>

        {/* Right Side */}
        <div
          className="hidden md:flex md:items-center md:space-x-4"
          ref={dropdownRef}
        >
          {user ? (
            <div className="flex items-center space-x-4 relative">
              {/* Cart for Customers only */}
              {user.role === "Customer" && (
                <button
                  onClick={() => navigate("/cart")}
                  className="relative p-2 rounded-full hover:bg-green-100"
                >
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </button>
              )}

              {/* Avatar */}
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 flex items-center justify-center rounded-full ring-2 ring-gray-300 bg-green-600 text-white font-bold cursor-pointer relative"
              >
                {user.name[0].toUpperCase()}

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute top-0 right-12 mt-2 w-36 bg-white border rounded-lg shadow-lg flex flex-col z-50">
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm text-gray-700 hover:text-red-600 text-left w-full"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-green-500 text-black px-4 py-2 rounded-full hover:bg-green-600 hover:text-white">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="border border-green-500 text-black px-4 py-2 rounded-full hover:bg-green-600 hover:text-white">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-md">
          <ul className="flex flex-col py-2 px-4 space-y-2">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-black hover:text-green-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="block py-2 px-3 text-black hover:text-green-700"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/getaways"
                className="block py-2 px-3 text-black hover:text-green-700"
              >
                Getaways
              </Link>
            </li>
            <li>
              <Link
                to="/stays"
                className="block py-2 px-3 text-black hover:text-green-700"
              >
                Stays
              </Link>
            </li>

            {user && user.role === "Customer" && (
              <li>
                <Link
                  to="/cart"
                  className="flex items-center space-x-2 bg-green-100 text-green-700 font-semibold py-2 px-3 rounded-lg hover:bg-green-200"
                >
                  <ShoppingCart className="w-5 h-5" /> <span>Cart</span>
                </Link>
              </li>
            )}

            {user ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-full hover:from-green-600 hover:to-green-700 transition transform hover:scale-105 shadow-lg"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <button className="w-full bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
                      Login
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <button className="w-full border border-green-500 text-green-700 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition">
                      Register
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

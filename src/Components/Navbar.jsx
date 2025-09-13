import { useState, useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react"; // cart icon

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login"; // redirect to login
  };

  return (
    <nav className="bg-transparent backdrop-blur-lg border-transparent shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand Name */}
        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-black">
          TopVents
        </span>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
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

        {/* Navigation Links */}
        <div className="hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium mt-4 md:mt-0 md:items-center">
            <li><a href="/home" className="block py-2 px-3 text-black hover:text-green-700">Home</a></li>
            <li><a href="/events" className="block py-2 px-3 text-black hover:text-green-700">Events</a></li>
            <li><a href="/getaways" className="block py-2 px-3 text-black hover:text-green-700">Getaways</a></li>
            <li><a href="/stays" className="block py-2 px-3 text-black hover:text-green-700">Stays</a></li>
          </ul>
        </div>

        {/* Right side: Avatar + Cart OR Auth Buttons */}
        <div
          className="hidden md:flex md:order-2 space-x-4 items-center relative"
          ref={dropdownRef}
        >
          {user ? (
            <div className="flex items-center space-x-4 relative">
              {/* Dropdown shown to the LEFT of avatar */}
              {showDropdown && (
                <div className="flex items-center bg-white border rounded-lg shadow-lg px-3 py-2">
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-700 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}

              {/* Avatar */}
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full ring-2 ring-gray-300 bg-green-600 text-white font-bold cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.name?.[0]?.toUpperCase()}
              </div>

              {/* Cart Icon */}
              <a
                href="/cart"
                className="relative p-2 rounded-full hover:bg-green-100 transition"
              >
                <ShoppingCart className="w-6 h-6 text-green-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  0
                </span>
              </a>
            </div>
          ) : (
            <>
              <a href="/login">
                <button className="bg-green-500 text-black px-4 py-2 rounded-full hover:bg-green-600 hover:text-white">
                  Login
                </button>
              </a>
              <a href="/register">
                <button className="bg-transparent border border-green-500 text-black px-4 py-2 rounded-full hover:bg-green-600 hover:text-white">
                  Register
                </button>
              </a>
            </>
          )}
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-md">
          <ul className="flex flex-col py-2 px-4 space-y-2">
            <li><a href="/home" className="block py-2 px-3 text-black hover:text-green-700">Home</a></li>
            <li><a href="/events" className="block py-2 px-3 text-black hover:text-green-700">Events</a></li>
            <li><a href="/holidays" className="block py-2 px-3 text-black hover:text-green-700">Getaways</a></li>
            <li><a href="/stays" className="block py-2 px-3 text-black hover:text-green-700">Stays</a></li>

            {user && (
              <>
                <li>
                  <a
                    href="/cart"
                    className="flex items-center space-x-2 bg-green-100 text-green-700 font-semibold py-2 px-3 rounded-lg hover:bg-green-200"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-full hover:from-green-600 hover:to-green-700 transition transform hover:scale-105 shadow-lg"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!user && (
              <>
                <li>
                  <a href="/login">
                    <button className="w-full bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
                      Login
                    </button>
                  </a>
                </li>
                <li>
                  <a href="/register">
                    <button className="w-full border border-green-500 text-green-700 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition">
                      Register
                    </button>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

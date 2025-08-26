import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent backdrop-blur-lg border-transparent shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand Name */}
        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-black">
          TopVents
        </span>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black"
          aria-controls="navbar-search"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
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

        {/* Navigation Links (Desktop) */}
        <div className="hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium mt-4 md:mt-0 md:items-center">
            <li>
              <a
                href="/home"
                className="block py-2 px-3 text-black hover:text-green-700"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/events"
                className="block py-2 px-3 text-black hover:text-green-700"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="/holidays"
                className="block py-2 px-3 text-black hover:text-green-700"
              >
                Holidays
              </a>
            </li>
            <li>
              <a
                href="/hotels"
                className="block py-2 px-3 text-black hover:text-green-700"
              >
                Hotels
              </a>
            </li>
          </ul>
        </div>

        {/* Buttons for desktop view */}
        <div className="hidden md:flex md:order-2 space-x-4">
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
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col font-medium p-4 space-y-3">
          <li>
            <a
              href="/home"
              className="block py-2 px-3 text-black hover:text-green-700"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/events"
              className="block py-2 px-3 text-black hover:text-green-700"
            >
              Events
            </a>
          </li>
          <li>
            <a
              href="/holidays"
              className="block py-2 px-3 text-black hover:text-green-700"
            >
              Holidays
            </a>
          </li>
          <li>
            <a
              href="/hotels"
              className="block py-2 px-3 text-black hover:text-green-700"
            >
              Hotels
            </a>
          </li>

          {/* Login / Signup buttons with spacing */}
          <li className="mt-4">
            <div className="flex flex-col space-y-3">
              <a href="/login">
                <button className="w-full bg-green-500 text-black px-4 py-2 rounded-full hover:bg-green-600 hover:text-white">
                  Login
                </button>
              </a>
              <a href="/register">
                <button className="w-full bg-transparent border border-green-500 text-black px-4 py-2 rounded-full hover:bg-green-600 hover:text-white">
                  Register
                </button>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

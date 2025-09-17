function Footer() {
  return (
    <footer className="bg-transparent backdrop-blur-lg border-t border-gray-300 shadow-md mt-12">
      <div className="max-w-screen-xl mx-auto px-6 py-8 md:py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand */}
          <span className="text-2xl md:text-3xl font-bold text-black text-center md:text-left">
            TopVents
          </span>

          {/* Links */}
          <ul className="flex flex-col items-center space-y-3 md:space-y-0 md:flex-row md:space-x-8 text-sm font-medium text-black">
            <li>
              <a
                href="/events"
                className="hover:text-green-700 hover:underline transition"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="/getaways"
                className="hover:text-green-700 hover:underline transition"
              >
                Getaways
              </a>
            </li>
            <li>
              <a
                href="/stays"
                className="hover:text-green-700 hover:underline transition"
              >
                Stays
              </a>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-6 md:my-8 border-gray-300 shadow-sm" />

        {/* Bottom Note */}
        <div className="text-center">
          <span className="block text-xs md:text-sm text-black">
            © {new Date().getFullYear()}{" "}
            <a
              href="/"
              className="hover:underline text-black font-semibold"
            >
              TopVents™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

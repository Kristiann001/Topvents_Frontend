function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand & Desc */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent mb-4 block">
              TopVents
            </span>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              Your one-stop destination for discovering and booking the best
              events, getaways, and stays. Experience the world with premium
              comfort and ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 tracking-wide uppercase text-sm">
              Discover
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a
                  href="/events"
                  className="hover:text-green-600 transition-colors duration-200"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/getaways"
                  className="hover:text-green-600 transition-colors duration-200"
                >
                  Getaways
                </a>
              </li>
              <li>
                <a
                  href="/stays"
                  className="hover:text-green-600 transition-colors duration-200"
                >
                  Stays
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Social or Other */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 tracking-wide uppercase text-sm">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a
                  href="/privacy"
                  className="hover:text-green-600 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-green-600 transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} TopVents. All Rights Reserved.
          </p>
          {/* Social Icons Placeholder */}
          <div className="flex space-x-4">
            {/* Icons can go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

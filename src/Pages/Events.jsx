import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Events() {
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
          you with industry leaders and professionals.
        </p>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <a href="#">
              <img
                className="rounded-t-2xl w-full h-56 object-cover"
                src="https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&auto=format&fit=crop&q=60"
                alt="Tech Innovations"
              />
            </a>
            <div className="p-6">
              <h5 className="mb-2 text-lg font-bold text-gray-900">
                Tech Innovations Summit 2024
              </h5>
              <p className="mb-4 text-gray-600 text-sm">
                Explore the cutting-edge trends in AI, blockchain, and smart
                technology with industry leaders and innovators.
              </p>
              <a
                href="#"
                className="inline-block px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <a href="#">
              <img
                className="rounded-t-2xl w-full h-56 object-cover"
                src="https://plus.unsplash.com/premium_photo-1679547202671-f9dbbf466db4?w=600&auto=format&fit=crop&q=60"
                alt="Business Growth Conference"
              />
            </a>
            <div className="p-6">
              <h5 className="mb-2 text-lg font-bold text-gray-900">
                Business Growth Conference
              </h5>
              <p className="mb-4 text-gray-600 text-sm">
                Learn strategies from top entrepreneurs to scale your business,
                increase revenue, and maximize efficiency.
              </p>
              <a
                href="#"
                className="inline-block px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <a href="#">
              <img
                className="rounded-t-2xl w-full h-56 object-cover"
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&auto=format&fit=crop&q=60"
                alt="Startup Insights Forum"
              />
            </a>
            <div className="p-6">
              <h5 className="mb-2 text-lg font-bold text-gray-900">
                Startup Insights Forum
              </h5>
              <p className="mb-4 text-gray-600 text-sm">
                Gain valuable knowledge from successful founders, investors, and
                mentors about launching and scaling startups.
              </p>
              <a
                href="#"
                className="inline-block px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <a href="#">
              <img
                className="rounded-t-2xl w-full h-56 object-cover"
                src="https://images.unsplash.com/photo-1686397140330-40f4c9919b58?w=600&auto=format&fit=crop&q=60"
                alt="AI Revolution Summit"
              />
            </a>
            <div className="p-6">
              <h5 className="mb-2 text-lg font-bold text-gray-900">
                AI Revolution Summit
              </h5>
              <p className="mb-4 text-gray-600 text-sm">
                Dive into the future of AI, machine learning, and automation
                with experts shaping tomorrow’s industries.
              </p>
              <a
                href="#"
                className="inline-block px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Events;

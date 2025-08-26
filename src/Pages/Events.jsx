import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Events() {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <a href="#">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src="https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGV2ZW50fGVufDB8fDB8fHww"
                alt="Tech Innovations"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                  Tech Innovations Summit 2024
                </h5>
              </a>
              <p className="mb-3 text-gray-700">
                Explore the cutting-edge trends in AI, blockchain, and smart
                technology with industry leaders and innovators.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <a href="#">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src="https://plus.unsplash.com/premium_photo-1679547202671-f9dbbf466db4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGV2ZW50fGVufDB8fDB8fHww"
                alt="Business Growth Conference"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                  Business Growth Conference
                </h5>
              </a>
              <p className="mb-3 text-gray-700">
                Learn from top entrepreneurs about strategies to scale your
                business, increase revenue, and maximize efficiency.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <a href="#">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGV2ZW50fGVufDB8fDB8fHww"
                alt="Startup Insights Forum"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                  Startup Insights Forum
                </h5>
              </a>
              <p className="mb-3 text-gray-700">
                Gain valuable knowledge from successful startup founders,
                investors, and mentors on how to navigate the challenges of
                launching a business.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <a href="#">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src="https://images.unsplash.com/photo-1686397140330-40f4c9919b58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBldmVudHxlbnwwfHwwfHx8MA%3D%3D"
                alt="AI Revolution Summit"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                  AI Revolution Summit
                </h5>
              </a>
              <p className="mb-3 text-gray-700">
                Dive deep into the future of AI, machine learning, and
                automation with experts who are transforming industries
                worldwide.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
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

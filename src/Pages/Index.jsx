import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Home() {
  // All carousel images
  const images = [
    "https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&auto=format&fit=crop&q=80",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <Navbar />
      <div id="main-content">
        {/* Carousel Section */}
        <section className="relative w-full bg-gray-700">
          <div className="relative w-full">
            {/* Carousel wrapper */}
            <div className="relative h-96 md:h-[500px] overflow-hidden bg-gray-900">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 z-10"></div>

              {/* Slides */}
              {images.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={src}
                    className="w-full h-full object-cover"
                    alt={`Event Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Jumbotron Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                Join Us for Unforgettable Events
              </h1>
              <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                Experience unique gatherings, meet like-minded people, and make
                memories that last a lifetime.
              </p>
              <a
                href="/events"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300"
              >
                Explore More
              </a>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === activeIndex ? "bg-white" : "bg-white/50"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="p-6">
          {/* Header with View All link */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-left text-gray-900 mb-6">
              Upcoming Events
            </h2>

            <a
              href="/events"
              className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
            >
              View All <span className="ml-1">&rarr;</span>
            </a>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src="https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&auto=format&fit=crop&q=60"
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
                  src="https://plus.unsplash.com/premium_photo-1679547202671-f9dbbf466db4?w=600&auto=format&fit=crop&q=60"
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
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&auto=format&fit=crop&q=60"
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
                  src="https://images.unsplash.com/photo-1686397140330-40f4c9919b58?w=600&auto=format&fit=crop&q=60"
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
        </section>
        <section>
          <section className="p-6">
            {/* Header with View All link */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-left text-gray-900">
                Escape to an Amazing Destination
              </h2>
              <a
                href="/holidays"
                className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
              >
                View All <span className="ml-1">&rarr;</span>
              </a>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">
              Explore breathtaking destinations tailored for relaxation,
              adventure, and unforgettable experiences ...
            </p>

            {/* Holiday Booking Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <a href="#">
                  <img
                    className="rounded-t-lg w-full h-48 object-cover"
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60"
                    alt="Beach Getaway"
                  />
                </a>
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    Beach Getaway
                  </h5>
                  <p className="mb-3 text-gray-700">
                    Relax by the ocean, enjoy stunning sunsets, and unwind in a
                    beachfront resort.
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
                    src="https://images.unsplash.com/photo-1588858027324-cdd07d015c29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjByZXRyZWF0fGVufDB8fDB8fHww"
                    alt="Mountain Retreat"
                  />
                </a>
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    Mountain Retreat
                  </h5>
                  <p className="mb-3 text-gray-700">
                    Escape to the mountains, breathe fresh air, and enjoy scenic
                    hiking trails.
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
                    src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&auto=format&fit=crop&q=60"
                    alt="Tropical Paradise"
                  />
                </a>
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    Tropical Paradise
                  </h5>
                  <p className="mb-3 text-gray-700">
                    Enjoy white sandy beaches, crystal-clear waters, and
                    luxurious island stays.
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
                    src="https://images.unsplash.com/photo-1709403337027-45324f24fae3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNhZmFyaSUyMGFkdmVudHVyZXxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Safari Adventure"
                  />
                </a>
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    Safari Adventure
                  </h5>
                  <p className="mb-3 text-gray-700">
                    Discover wildlife, explore vast landscapes, and experience
                    thrilling safari tours.
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
          </section>

          <section className="p-6">
            {/* Beach Destination Card */}
            <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden relative h-auto md:h-80">
              {/* Image */}
              <img
                className="w-full md:w-1/2 h-60 md:h-full object-cover"
                src="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2h8ZW58MHx8MHx8fDA%3D"
                alt="Sarova WhiteSands Mombasa"
              />

              {/* Content */}
              <div className="w-full md:w-1/2 p-5 flex flex-col justify-center">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                  Sarova WhiteSands Mombasa
                </h5>
                <p className="mb-3 text-gray-700 text-sm md:text-base">
                  Nestled along the picturesque coastline of Mombasa, Sarova
                  WhiteSands is a luxurious beachfront resort offering stunning
                  ocean views, pristine white sandy beaches, and world-class
                  hospitality. Enjoy a tranquil retreat with lush tropical
                  gardens, five-star amenities, and a variety of water sports
                  activities. Whether you are looking for relaxation by the
                  poolside, rejuvenating spa treatments, or exquisite dining
                  experiences, this resort provides the perfect blend of
                  adventure and serenity for an unforgettable getaway.
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  Price: $299/night
                </p>
              </div>

              {/* Ad Badge */}
              <a
                href="#"
                className="absolute top-2 right-2 text-gray-500 text-xs md:text-sm"
              >
                Ad
              </a>
            </div>
          </section>
        </section>
        <section className="p-6 bg-gray-100 mt-10 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Major Cities Make Event Hosting More Exciting!
          </h2>
          <p className="text-gray-700 mb-4">
            Ever wondered why some events feel larger than life while others
            struggle to capture attention? A big part of it comes down to
            location. Hosting events in major cities comes with unique
            advantages that make them more thrilling, engaging, and successful.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            Unmatched Infrastructure
          </h3>
          <p className="text-gray-700 mb-3">
            Major cities are built for large-scale events. With world-class
            convention centers, top-notch hotels, and easy transportation, they
            provide a seamless experience for attendees. Whether it's New York,
            London, or Nairobi, the right infrastructure makes a huge
            difference.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            Vibrant Entertainment & Culture
          </h3>
          <p className="text-gray-700 mb-3">
            Big cities are cultural hubs filled with exciting nightlife, live
            performances, and fine dining. Event-goers can enjoy the experience
            beyond just the main event, making the trip even more worthwhile.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            High Foot Traffic & Exposure
          </h3>
          <p className="text-gray-700 mb-3">
            The sheer number of people in major cities means more exposure for
            your event. You get a built-in audience of locals, tourists, and
            business travelers who might be interested in attending.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            Easier Marketing & Media Coverage
          </h3>
          <p className="text-gray-700 mb-3">
            Big cities attract more media attention. Journalists, influencers,
            and bloggers are more likely to cover your event, giving it extra
            visibility.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            Networking Opportunities
          </h3>
          <p className="text-gray-700 mb-3">
            Business events, conferences, and exhibitions thrive in major cities
            because they attract industry leaders. Attendees get a chance to
            meet important connections, making the event even more valuable.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            Endless Accommodation & Dining Options
          </h3>
          <p className="text-gray-700">
            From budget-friendly stays to luxury hotels, major cities offer a
            variety of accommodation options. Plus, attendees can enjoy
            world-class restaurants, making their experience unforgettable.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;

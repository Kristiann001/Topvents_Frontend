import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast } from "react-hot-toast";
import { CartContext } from "../Context/CartContext";

function Home() {
  const { addToCart } = useContext(CartContext);
  const images = [
    "https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&auto=format&fit=crop&q=80",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [getaways, setGetaways] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingGetaways, setLoadingGetaways] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check user role
  useEffect(() => {
    const storedUser = (() => {
      try {
        return JSON.parse(localStorage.getItem("user"));
      } catch {
        return null;
      }
    })();
    setIsAdmin(storedUser?.role === "Admin");
  }, []);

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch events and getaways
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, getawaysResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/events"),
          axios.get("http://localhost:5000/api/getaways"),
        ]);
        setEvents(eventsResponse.data.slice(0, 4));
        setGetaways(getawaysResponse.data.slice(0, 4));
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load events or getaways");
      } finally {
        setLoadingEvents(false);
        setLoadingGetaways(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div id="main-content" className="bg-gray-50">
        {/* Carousel Section */}
        <section className="relative w-full bg-gray-700">
          <div className="relative w-full">
            {/* Carousel wrapper */}
            <div className="relative h-64 sm:h-96 md:h-[500px] overflow-hidden bg-gray-900">
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
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Jumbotron Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4 sm:px-6">
              <h1 className="mb-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Join Us for Unforgettable Events
              </h1>
              <p className="mb-6 text-sm sm:text-lg md:text-xl text-gray-200 sm:px-8 md:px-16 lg:px-48">
                Experience unique gatherings, meet like-minded people, and make
                memories that last a lifetime.
              </p>
              <a
                href="/events"
                className="inline-flex justify-center items-center py-2 sm:py-3 px-4 sm:px-5 text-sm sm:text-base font-medium text-white rounded-lg bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition-colors"
                aria-label="Explore events"
              >
                Explore More
              </a>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-3 sm:bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === activeIndex ? "bg-white" : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Upcoming Events
            </h2>
            <a
              href="/events"
              className="inline-flex items-center px-3 py-2 text-sm sm:text-base font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-shadow shadow-md"
              aria-label="View all events"
            >
              View All <span className="ml-1">&rarr;</span>
            </a>
          </div>

          {loadingEvents ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : events.length === 0 ? (
            <p className="text-center text-gray-500 text-sm sm:text-base">
              No events available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {events.map((event, idx) => (
                <div
                  key={event._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-fadeIn"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <a href="#" aria-label={`View ${event.title} details`}>
                    <img
                      className="rounded-t-lg w-full h-40 sm:h-48 object-cover"
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                    />
                  </a>
                  <div className="p-4 sm:p-5">
                    <h5 className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                      {event.title}
                    </h5>
                    <p className="mb-3 text-gray-700 text-sm sm:text-base line-clamp-3">
                      {event.description}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                      Price: <span className="text-green-600">{event.price}</span>
                    </p>
                    {!isAdmin && (
                      <button
                        onClick={() => {
                          addToCart(event, "Event");
                          toast.success(`${event.title} added to cart`);
                        }}
                        className="inline-flex items-center px-4 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                        aria-label={`Book ${event.title}`}
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Holiday Cards Section */}
        <section className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Escape to an Amazing Destination
            </h2>
            <a
              href="/holidays"
              className="inline-flex items-center px-3 py-2 text-sm sm:text-base font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-shadow shadow-md"
              aria-label="View all getaways"
            >
              View All <span className="ml-1">&rarr;</span>
            </a>
          </div>

          <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
            Explore breathtaking destinations tailored for relaxation, adventure, and unforgettable experiences...
          </p>

          {loadingGetaways ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : getaways.length === 0 ? (
            <p className="text-center text-gray-500 text-sm sm:text-base">
              No getaways available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {getaways.map((getaway, idx) => (
                <div
                  key={getaway._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-fadeIn"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <a href="#" aria-label={`View ${getaway.title} details`}>
                    <img
                      className="rounded-t-lg w-full h-40 sm:h-48 object-cover"
                      src={getaway.image}
                      alt={getaway.title}
                      loading="lazy"
                    />
                  </a>
                  <div className="p-4 sm:p-5">
                    <h5 className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                      {getaway.title}
                    </h5>
                    <p className="mb-3 text-gray-700 text-sm sm:text-base line-clamp-3">
                      {getaway.description}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                      Price: <span className="text-green-600">{getaway.price}</span>
                    </p>
                    {!isAdmin && (
                      <button
                        onClick={() => {
                          addToCart(getaway, "Getaway");
                          toast.success(`${getaway.title} added to cart`);
                        }}
                        className="inline-flex items-center px-4 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                        aria-label={`Book ${getaway.title}`}
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Destination Hotel Card */}
        <section className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden relative h-auto md:h-80">
            <img
              className="w-full md:w-1/2 h-48 sm:h-60 md:h-full object-cover"
              src="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&auto=format&fit=crop&q=60"
              alt="Sarova WhiteSands Mombasa"
              loading="lazy"
            />
            <div className="w-full md:w-1/2 p-4 sm:p-5 flex flex-col justify-center">
              <h5 className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                Sarova WhiteSands Mombasa
              </h5>
              <p className="mb-3 text-gray-700 text-sm sm:text-base line-clamp-4">
                Nestled along the picturesque coastline of Mombasa, Sarova
                WhiteSands is a luxurious beachfront resort offering stunning
                ocean views, pristine white sandy beaches, and world-class
                hospitality. Enjoy a tranquil retreat with lush tropical
                gardens, five-star amenities, and a variety of water sports
                activities.
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                Price: <span className="text-green-600">Ksh 45,000 / night</span>
              </p>
            </div>
            <a
              href="#"
              className="absolute top-2 right-2 text-gray-500 text-xs sm:text-sm"
              aria-label="Advertisement"
            >
              Ad
            </a>
          </div>
        </section>

        {/* Why Major Cities Section */}
        <section className="p-4 sm:p-6 bg-gray-100 mt-6 sm:mt-10 rounded-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Why Major Cities Make Event Hosting More Exciting!
          </h2>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            Ever wondered why some events feel larger than life while others
            struggle to capture attention? A big part of it comes down to
            location. Hosting events in major cities comes

System: with unique advantages that make them more thrilling, engaging, and successful.
          </p>

          {[
            {
              title: "Unmatched Infrastructure",
              text: "Major cities are built for large-scale events. With world-class convention centers, top-notch hotels, and easy transportation, they provide a seamless experience for attendees. Whether it's New York, London, or Nairobi, the right infrastructure makes a huge difference.",
            },
            {
              title: "Vibrant Entertainment & Culture",
              text: "Big cities are cultural hubs filled with exciting nightlife, live performances, and fine dining. Event-goers can enjoy the experience beyond just the main event, making the trip even more worthwhile.",
            },
            {
              title: "High Foot Traffic & Exposure",
              text: "The sheer number of people in major cities means more exposure for your event. You get a built-in audience of locals, tourists, and business travelers who might be interested in attending.",
            },
            {
              title: "Easier Marketing & Media Coverage",
              text: "Big cities attract more media attention. Journalists, influencers, and bloggers are more likely to cover your event, giving it extra visibility.",
            },
            {
              title: "Networking Opportunities",
              text: "Business events, conferences, and exhibitions thrive in major cities because they attract industry leaders. Attendees get a chance to meet important connections, making the event even more valuable.",
            },
            {
              title: "Endless Accommodation & Dining Options",
              text: "From budget-friendly stays to luxury hotels, major cities offer a variety of accommodation options. Plus, attendees can enjoy world-class restaurants, making their experience unforgettable.",
            },
          ].map((section, idx) => (
            <div key={idx} className="mt-4 animate-fadeIn" style={{ animationDelay: `${idx * 100}ms` }}>
              <h3 className="text-lg sm:text-2xl font-semibold text-gray-900">
                {section.title}
              </h3>
              <p className="text-gray-700 mb-3 text-sm sm:text-base">{section.text}</p>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
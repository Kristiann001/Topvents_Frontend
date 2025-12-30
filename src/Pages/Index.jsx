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

  // Get current user from localStorage
  const storedUser = (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  })();

  const isCustomer = storedUser?.role === "Customer";


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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
        {/* Carousel Section */}
        <section className="relative w-full bg-gray-900 mt-16">
          <div className="relative w-full h-[500px] overflow-hidden">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500"></div>

            {/* Slides */}
            {images.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === activeIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
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

            {/* Jumbotron Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-6 max-w-4xl mx-auto">
              <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg">
                <span className="bg-gradient-to-r from-green-300 to-teal-200 bg-clip-text text-transparent">
                  Unforgettable Moments
                </span>
                <br /> Start Here
              </h1>
              <p className="mb-8 text-lg sm:text-xl text-gray-100 leading-relaxed max-w-2xl drop-shadow-md">
                Experience unique gatherings, meet like-minded people, and make
                memories that last a lifetime.
              </p>
              <a
                href="/events"
                className="inline-flex justify-center items-center py-3 px-8 text-base font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-green-500/30"
                aria-label="Explore events"
              >
                Explore Events
              </a>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? "bg-white w-8" 
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
          
          {/* Upcoming Events Section */}
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Upcoming Events
                </h2>
                <p className="text-gray-500 mt-2">Curated experiences just for you</p>
              </div>
              <a
                href="/events"
                className="text-green-600 font-semibold hover:text-green-700 hover:underline flex items-center group"
                aria-label="View all events"
              >
                View All <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>

            {loadingEvents ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">No events scheduled at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {events.map((event, idx) => (
                  <div
                    key={event._id}
                    className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full group"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm">
                        {event.price}
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <h5 className="mb-2 text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">
                        {event.title}
                      </h5>
                      <p className="mb-4 text-gray-600 text-sm line-clamp-2 flex-grow">
                        {event.description}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-50">
                        {isCustomer ? (
                          <button
                            onClick={() => {
                              addToCart(event, "Event");
                              toast.success(`${event.title} added to cart`);
                            }}
                            className="w-full py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 active:scale-95 transition-all shadow-md hover:shadow-green-200"
                            aria-label={`Book ${event.title}`}
                          >
                            Book Now
                          </button>
                        ) : (
                           <a href="/events" className="block text-center w-full py-2.5 text-sm font-medium text-green-600 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                            View Details
                           </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Holiday Cards Section */}
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Featured Getaways
                </h2>
                 <p className="text-gray-500 mt-2">Explore breathtaking destinations</p>
              </div>
              <a
                href="/getaways"
                className="text-teal-600 font-semibold hover:text-teal-700 hover:underline flex items-center group"
                aria-label="View all getaways"
              >
                View All <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>

            {loadingGetaways ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
              </div>
            ) : getaways.length === 0 ? (
               <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">No getaways available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {getaways.map((getaway, idx) => (
                  <div
                    key={getaway._id}
                    className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full group"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={getaway.image}
                        alt={getaway.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal-700 shadow-sm">
                        {getaway.price}
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <h5 className="mb-2 text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-teal-600 transition-colors">
                        {getaway.title}
                      </h5>
                      <p className="mb-4 text-gray-600 text-sm line-clamp-2 flex-grow">
                        {getaway.description}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-50">
                        {isCustomer ? (
                          <button
                            onClick={() => {
                              addToCart(getaway, "Getaway");
                              toast.success(`${getaway.title} added to cart`);
                            }}
                            className="w-full py-2.5 text-sm font-medium text-white bg-teal-600 rounded-xl hover:bg-teal-700 active:scale-95 transition-all shadow-md hover:shadow-teal-200"
                            aria-label={`Book ${getaway.title}`}
                          >
                            Book Now
                          </button>
                        ) : (
                          <a href="/getaways" className="block text-center w-full py-2.5 text-sm font-medium text-teal-600 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors">
                            View Details
                           </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Destination Hotel Card */}
          <section>
             <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden relative min-h-[400px] md:h-auto group">
              <div className="w-full md:w-1/2 relative overflow-hidden">
                <img
                  className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&auto=format&fit=crop&q=60"
                  alt="Sarova WhiteSands Mombasa"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide w-fit mb-4">
                  Featured Stay
                </span>
                <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 leading-tight">
                  Sarova WhiteSands Mombasa
                </h5>
                <p className="mb-6 text-gray-600 text-base leading-relaxed line-clamp-4">
                  Nestled along the picturesque coastline of Mombasa, Sarova
                  WhiteSands is a luxurious beachfront resort offering stunning
                  ocean views, pristine white sandy beaches, and world-class
                  hospitality. Enjoy a tranquil retreat with lush tropical
                  gardens, five-star amenities, and a variety of water sports
                  activities.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xl font-bold text-gray-900">
                    <span className="text-sm text-gray-500 font-normal">Starting from</span> <br/>
                    <span className="text-green-600">Ksh 45,000</span> <span className="text-sm text-gray-500 font-normal">/ night</span>
                  </p>
                  <a href="/stays" className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl">
                    Explore Stays
                  </a>
                </div>
              </div>
              <span className="absolute top-4 left-4 md:left-auto md:right-4 bg-black/30 backdrop-blur-md text-white/80 px-2 py-1 rounded text-xs">
                Ad
              </span>
            </div>
          </section>

          {/* Why Major Cities Section */}
          <section className="bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 sm:p-12 border border-gray-100">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Major Cities Make Event Hosting More Exciting!
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Hosting events in major cities comes with unique advantages that make them more thrilling, engaging, and successful.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Unmatched Infrastructure",
                  text: "World-class convention centers, top-notch hotels, and easy transportation provide a seamless experience.",
                  icon: "🏙️"
                },
                {
                  title: "Vibrant Entertainment",
                  text: "Exciting nightlife, live performances, and fine dining make the trip even more worthwhile.",
                  icon: "🎭"
                },
                {
                  title: "High Exposure",
                  text: "A built-in audience of locals, tourists, and business travelers maximizes visibility.",
                  icon: "👥"
                },
                {
                  title: "Media Coverage",
                  text: "Journalists and influencers are more likely to cover your event in big cities.",
                  icon: "📸"
                },
                {
                  title: "Networking",
                  text: "Attract industry leaders and make valuable connections in thriving business hubs.",
                  icon: "🤝"
                },
                {
                  title: "Luxury Options",
                  text: "From budget stays to 5-star hotels and world-class dining, everything is available.",
                  icon: "🏨"
                },
              ].map((section, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{section.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      <Footer />
    </div>
  );
}

export default Home;
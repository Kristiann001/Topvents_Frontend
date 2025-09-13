import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Stays() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-stone-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Hotels & Stays
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Discover comfort and elegance in our curated selection of hotels,
          offering world-class hospitality, modern amenities, and unforgettable
          experiences.
        </p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <a href="#">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60"
                alt="PIYE Beach Resort"
              />
            </a>
            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                PIYE Beach Resort
              </h5>
              <p className="mb-3 text-gray-700">
                A luxurious coastal escape offering pristine beaches, oceanfront
                suites, and world-class dining — perfect for relaxation and
                romance.
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
                alt="Everpeak Mountain Lodge"
              />
            </a>
            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Everpeak Mountain Lodge
              </h5>
              <p className="mb-3 text-gray-700">
                Nestled high in the mountains, this serene lodge offers cozy
                cabins, breathtaking views, and access to scenic hiking and
                nature trails.
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
                alt="Coral Sands Resort"
              />
            </a>
            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Coral Sands Resort
              </h5>
              <p className="mb-3 text-gray-700">
                A tropical haven surrounded by turquoise waters, vibrant coral
                reefs, and luxurious beachfront villas for the ultimate island
                experience.
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
                alt="Savannah Plains Safari Lodge"
              />
            </a>
            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Savannah Plains Safari Lodge
              </h5>
              <p className="mb-3 text-gray-700">
                Experience the magic of Africa with guided game drives, luxury
                tented camps, and panoramic views of the untamed savannah.
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

export default Stays;

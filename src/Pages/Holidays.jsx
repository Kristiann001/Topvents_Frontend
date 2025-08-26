import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Holidays() {
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
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60"
                alt="Beach Getaway"
              />
            </a>
            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Beach Getaway
              </h5>
              <p className="mb-3 text-gray-700">
                Relax by the ocean with golden sands beneath your feet, sip
                refreshing cocktails under palm trees, and watch breathtaking
                sunsets right from your private balcony. Perfect for a romantic
                escape or family retreat.
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
                Escape to a serene mountain lodge surrounded by pine forests and
                fresh alpine air. Explore scenic hiking trails, cozy up by the
                fireplace, or simply enjoy the peaceful silence away from the
                busy city life.
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
                Step into an exotic island escape with turquoise waters, white
                sandy beaches, and luxury villas. Swim with dolphins, indulge in
                spa treatments, and savor fine dining with ocean views in a true
                paradise.
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
                Experience the thrill of the wild with guided game drives,
                majestic wildlife sightings, and luxury tented camps under the
                stars. Perfect for adventurers seeking unforgettable memories in
                the heart of nature.
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

export default Holidays;

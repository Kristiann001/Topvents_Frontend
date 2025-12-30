import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">
            Terms of Service
          </h1>
          
          <div className="prose prose-green max-w-none text-gray-600 space-y-6">
            <p className="lead text-lg">
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Agreement to Terms</h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and TopVents ("we," "us," or "our"), concerning your access to and use of the TopVents website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. User Representations</h2>
              <p>
                By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Prohibited Activities</h2>
              <p>
                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
            </section>

             <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Contact Us</h2>
              <p>
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at support@topvents.com.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

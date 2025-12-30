import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">
            Privacy Policy
          </h1>
          
          <div className="prose prose-green max-w-none text-gray-600 space-y-6">
            <p className="lead text-lg">
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Introduction</h2>
              <p>
                Welcome to TopVents ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Information We Collect</h2>
              <p>
                We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Names</li>
                <li>Email addresses</li>
                <li>Passwords</li>
                <li>Billing addresses (for purchases)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. How We Use Your Information</h2>
              <p>
                We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>To facilitate account creation and logon process.</li>
                <li>To send administrative information to you.</li>
                <li>To fulfill and manage your orders.</li>
                <li>To protect our Services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Sharing Your Information</h2>
              <p>
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
              </p>
            </section>

             <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Contact Us</h2>
              <p>
                If you have questions or comments about this policy, you may email us at support@topvents.com.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

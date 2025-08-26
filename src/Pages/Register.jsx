import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Register() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <form className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm mx-auto my-20">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            Sign Up
          </h2>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Repeat password
            </label>
            <input
              type="password"
              id="repeat-password"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Register
          </button>

          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?
            <a
              href="/login"
              className="text-green-600 hover:underline dark:text-green-400"
            >
              Login here
            </a>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Register;

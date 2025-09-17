import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      console.log("Sending login request with:", form);
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user and token to localStorage
      const userData = { ...data.user, token: data.token };
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Stored in localStorage:", JSON.parse(localStorage.getItem("user")));

      setMessage("Login successful 🎉");

      setTimeout(() => {
        if (data.user.role === "Admin") {
          console.log("Redirecting to /dashboard");
          navigate("/dashboard");
        } else {
          console.log("Redirecting to /home");
          navigate("/home");
        }
      }, 700);
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-sm mx-auto my-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            Login
          </h2>
          {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
          {message && <p className="text-green-600 mb-3 text-center">{message}</p>}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Login
          </button>
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <a href="/register" className="text-green-600 hover:underline dark:text-green-400">
              Sign up
            </a>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Login;
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
    <div className="min-h-screen flex flex-col relative">
      {/* Fixed Background Layers */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center z-0"></div>
      <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <Navbar />
      </div>
      
      <main className="flex-grow flex items-center justify-center relative z-10 px-4 py-12 sm:py-20">
        <div className="relative w-full max-w-md">
          {/* Subtle glow effect behind card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl blur opacity-30 animate-pulse"></div>
          
          <form
            onSubmit={handleSubmit}
            className="relative bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/50 w-full"
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-gray-500 mt-2 text-sm">Sign in to continue your journey</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50/80 border border-red-100 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-6 p-4 rounded-xl bg-green-50/80 border border-green-100 text-green-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                {message}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-0 bg-white/50 backdrop-blur-sm py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-green-500 transition-all placeholder:text-gray-400"
                  placeholder="name@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-0 bg-white/50 backdrop-blur-sm py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-green-500 transition-all placeholder:text-gray-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 font-bold rounded-xl text-sm px-5 py-3.5 transition-all shadow-lg shadow-green-500/30 transform hover:-translate-y-0.5 active:scale-95"
            >
              Sign In
            </button>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <a href="/register" className="font-semibold text-green-600 hover:text-green-500 transition-colors">
                Create one now
              </a>
            </p>
          </form>
        </div>
      </main>
      
      <div className="relative z-10 w-full">
         <Footer />
      </div>
    </div>
  );
}

export default Login;
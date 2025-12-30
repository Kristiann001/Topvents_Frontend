import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "Customer",
  });
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
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("user", JSON.stringify({ ...data.user, token: data.token }));
      setMessage("Registration successful ✅");
      console.log("Registered user:", data);

      setTimeout(() => {
        if (data.user.role === "Admin") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      }, 700);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fixed Background Layers */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center z-0"></div>
      <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <Navbar />
      </div>

      <main className="flex-grow flex items-center justify-center relative z-10 px-4 py-12 sm:py-20">
        <div className="relative w-full max-w-md">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl blur opacity-30 animate-pulse"></div>

          <form
            onSubmit={handleSubmit}
            className="relative bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/50 w-full"
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Create Account
              </h2>
              <p className="text-gray-500 mt-2 text-sm">Join us and explore the world</p>
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
                <label htmlFor="name" className="block mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-0 bg-white/50 backdrop-blur-sm py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-green-500 transition-all placeholder:text-gray-400"
                  placeholder="John Doe"
                  required
                />
              </div>

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

              <div className="grid grid-cols-2 gap-4">
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
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password2" className="block mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Repeat
                  </label>
                  <input
                    type="password"
                    id="password2"
                    value={form.password2}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-0 bg-white/50 backdrop-blur-sm py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-green-500 transition-all placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Role
                </label>
                <div className="relative">
                  <select
                    id="role"
                    value={form.role}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-0 bg-white/50 backdrop-blur-sm py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-green-500 transition-all appearance-none"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full text-white bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-500 hover:to-green-500 font-bold rounded-xl text-sm px-5 py-3.5 transition-all shadow-lg shadow-teal-500/30 transform hover:-translate-y-0.5 active:scale-95"
            >
              Start Journey
            </button>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-teal-600 hover:text-teal-500 transition-colors">
                 Login here
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

export default Register;
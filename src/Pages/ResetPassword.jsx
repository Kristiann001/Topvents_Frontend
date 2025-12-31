// src/Pages/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ password: "", password2: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/verify-reset-token/${token}`);
        const data = await res.json();
        
        if (res.ok && data.valid) {
          setTokenValid(true);
        } else {
          setError(data.message || "Invalid or expired reset token");
          setTokenValid(false);
        }
      } catch {
        // Fixed: Removed unused 'err' variable
        setError("Failed to verify reset token");
        setTokenValid(false);
      } finally {
        setValidating(false);
      }
    };

    if (token) verifyToken();
  }, [token]);

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const levels = [
      { strength: 1, label: "Weak", color: "bg-red-500" },
      { strength: 2, label: "Fair", color: "bg-orange-500" },
      { strength: 3, label: "Good", color: "bg-yellow-500" },
      { strength: 4, label: "Strong", color: "bg-green-500" },
      { strength: 5, label: "Very Strong", color: "bg-green-600" },
    ];
    return levels[strength - 1] || levels[0];
  };

  const passwordStrength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to reset password");

      setMessage(data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Verifying reset token...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Reset Link</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <a href="/forgot-password" className="inline-block w-full max-w-xs text-white bg-green-600 hover:bg-green-700 font-bold rounded-xl py-3 transition">
              Request New Reset Link
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center z-0"></div>
      <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-0"></div>

      <div className="relative z-10 w-full"><Navbar /></div>
      
      <main className="flex-grow flex items-center justify-center relative z-10 px-20 py-32">
        <div className="relative w-full max-w-md">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl blur opacity-30 animate-pulse"></div>
          
          <div className="relative bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/50">
            <div className="mb-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900">Reset Password</h2>
              <p className="text-gray-500 mt-2 text-sm">Enter your new password below</p>
            </div>

            {error && <div className="mb-6 p-4 rounded-xl bg-red-50/80 border border-red-100 text-red-600 text-sm">{error}</div>}
            {message && <div className="mb-6 p-4 rounded-xl bg-green-50/80 border border-green-100 text-green-600 text-sm">✅ {message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label className="block mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">New Password</label>
                  <input
                    type="password"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-0 bg-white/50 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-green-500"
                    required
                    minLength={6}
                  />
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Strength:</span>
                        <span className={`font-semibold ${passwordStrength.color.replace('bg-', 'text-')}`}>{passwordStrength.label}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${passwordStrength.color} transition-all`} style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Confirm Password</label>
                  <input
                    type="password"
                    id="password2"
                    value={form.password2}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-0 bg-white/50 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-green-500"
                    required
                  />
                  {form.password2 && (
                    <div className="mt-2 flex items-center text-xs">
                      {form.password === form.password2 ? (
                        <><span className="text-green-600 font-medium ml-1">Passwords match</span></>
                      ) : (
                        <><span className="text-red-600 font-medium ml-1">Passwords don't match</span></>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || form.password !== form.password2 || form.password.length < 6}
                className="mt-8 w-full text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 font-bold rounded-xl py-3.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="/login" className="text-sm text-green-600 hover:text-green-500 inline-flex items-center">
                ← Back to Login
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <div className="relative z-10 w-full"><Footer /></div>
    </div>
  );
}

export default ResetPassword;
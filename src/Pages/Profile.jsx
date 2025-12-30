import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../Components/Navbar";
import { User, Mail, Lock, Save } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setForm({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        password: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = user?.token;
      if (!token) throw new Error("Not authenticated");

      const updateData = {
        name: form.name,
        email: form.email,
        // Only include password if user typed something
        ...(form.password ? { password: form.password } : {}),
      };

      const response = await axios.put(
        "http://localhost:5000/api/auth/update",
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local storage with new user info (keep token)
      const updatedUser = { ...user, ...response.data.user };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast.success("Profile updated successfully!");
      setForm((prev) => ({ ...prev, password: "" })); // Clear password field
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
     return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
        </div>
     )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Account Settings</h1>
            <p className="text-gray-500 mt-2">Update your personal information</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
             <div className="h-32 bg-gradient-to-r from-green-500 to-teal-500 relative">
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                   <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg">
                      <div className="h-full w-full rounded-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center text-green-700 text-3xl font-extrabold">
                         {user.name[0].toUpperCase()}
                      </div>
                   </div>
                </div>
             </div>

             <div className="pt-16 pb-8 px-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                         <>
                           <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-2"></div>
                           Saving...
                         </>
                      ) : (
                        <>
                           <Save className="w-5 h-5 mr-2" />
                           Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

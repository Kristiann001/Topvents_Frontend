import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { toast } from "react-hot-toast";
import SearchInput from "../Components/SearchInput";
import { 
  LayoutDashboard, 
  Calendar, 
  Map, 
  Home, 
  Plus, 
  Edit, 
  Trash2, 
  X,
  Filter
} from "lucide-react";
import { confirmDelete } from "../Components/DeleteConfirmation";

export default function AdminDashboard() {

  const firstInputRef = useRef(null);

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Form State
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    type: "Event",
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const token = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"))?.token;
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    fetchItems();
  }, []);

  const isValidImageUrl = (url) => /^https?:\/\/.+/i.test(url);

  const fetchItems = async () => {
    setFetchLoading(true);
    try {
      const [events, getaways, stays] = await Promise.all([
        axios.get("http://localhost:5000/api/events"),
        axios.get("http://localhost:5000/api/getaways"),
        axios.get("http://localhost:5000/api/stays"),
      ]);

      setItems([
        ...events.data.map((e) => ({ ...e, type: "Event" })),
        ...getaways.data.map((g) => ({ ...g, type: "Getaway" })),
        ...stays.data.map((s) => ({ ...s, type: "Stay" })),
      ]);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load items");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidImageUrl(form.imageUrl)) {
      toast.error("Please enter a valid image URL starting with http:// or https://");
      setLoading(false);
      return;
    }

    const formattedPrice = `Ksh ${form.price.replace(/,/g, '')}`;

    const endpointMap = {
      Event: "/api/events",
      Getaway: "/api/getaways",
      Stay: "/api/stays",
    };
    const endpoint = endpointMap[form.type] || "/api/events";

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000${endpoint}/${currentId}`, {
          title: form.title,
          description: form.description,
          price: formattedPrice,
          image: form.imageUrl,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Item updated successfully!");
      } else {
        await axios.post(`http://localhost:5000${endpoint}`, {
          title: form.title,
          description: form.description,
          price: formattedPrice,
          image: form.imageUrl,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Item added successfully!");
      }

      resetForm();
      setShowModal(false);
      fetchItems();
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (item) => {
    confirmDelete({
      title: item.title,
      onConfirm: async () => {
        try {
          const endpointMap = {
            Event: "/api/events",
            Getaway: "/api/getaways",
            Stay: "/api/stays",
          };
          const endpoint = endpointMap[item.type];
          await axios.delete(`http://localhost:5000${endpoint}/${item._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success("Item deleted successfully!");
          fetchItems();
        } catch {
          toast.error("Failed to delete item");
        }
      }
    });
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      price: item.price.replace('Ksh ', '').replace(',', ''),
      imageUrl: item.image,
      type: item.type,
    });
    setCurrentId(item._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      imageUrl: "",
      type: "Event",
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);
  };

  // Derived State for Filtering
  const filteredItems = items.filter((item) => {
    const matchesTab = activeTab === "All" || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Stats
  const stats = [
    { label: "Total Items", value: items.length, icon: LayoutDashboard, color: "bg-blue-500" },
    { label: "Events", value: items.filter(i => i.type === "Event").length, icon: Calendar, color: "bg-green-500" },
    { label: "Getaways", value: items.filter(i => i.type === "Getaway").length, icon: Map, color: "bg-teal-500" },
    { label: "Stays", value: items.filter(i => i.type === "Stay").length, icon: Home, color: "bg-indigo-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 pt-24 pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Manage your events, getaways, and stays.</p>
          </div>
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5 mr-2" />
             Add New Item
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl text-white shadow-sm`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
              {["All", "Event", "Getaway", "Stay"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                  }`}
                >
                  {tab === "All" ? "All Items" : `${tab}s`}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="w-full md:w-72">
               <SearchInput onSearch={setSearch} placeholder="Search items..." />
            </div>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {fetchLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 px-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No items found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50/80 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-12 w-12 flex-shrink-0">
                              <img className="h-12 w-12 rounded-xl object-cover border border-gray-100" src={item.image} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">{item.title}</div>
                              <div className="text-xs text-gray-400">ID: {item._id.slice(-6)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${item.type === 'Event' ? 'bg-green-100 text-green-800' : 
                              item.type === 'Getaway' ? 'bg-teal-100 text-teal-800' : 
                              'bg-indigo-100 text-indigo-800'}`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                          {item.price}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{item.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleEdit(item)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(item)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden divide-y divide-gray-100">
                {filteredItems.map((item) => (
                  <div key={item._id} className="p-4 space-y-3">
                    <div className="flex gap-4">
                      <img className="h-20 w-20 rounded-xl object-cover border border-gray-100" src={item.image} alt="" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                           <h4 className="text-base font-semibold text-gray-900 truncate pr-2">{item.title}</h4>
                           <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold
                            ${item.type === 'Event' ? 'bg-green-50 text-green-700' : 
                              item.type === 'Getaway' ? 'bg-teal-50 text-teal-700' : 
                              'bg-indigo-50 text-indigo-700'}`}>
                            {item.type}
                           </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                        <p className="text-sm font-bold text-gray-900 mt-2">{item.price}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                       <button 
                          onClick={() => handleEdit(item)}
                          className="flex-1 py-2 bg-gray-50 text-blue-600 font-medium rounded-lg text-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center justify-center gap-2"
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(item)}
                          className="flex-1 py-2 bg-gray-50 text-red-600 font-medium rounded-lg text-sm border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowModal(false)}
          ></div>
          
          <div className="relative bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-lg overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 border border-gray-100 flex flex-col max-h-[90vh]">
            {/* Modal Header - Fixed */}
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                  {isEditing ? "Edit Item" : "New Item"}
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {isEditing ? "Modify existing entry details" : "Fill in the details for the new entry"}
                </p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="overflow-y-auto flex-grow custom-scrollbar">
              <form id="admin-modal-form" onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Item Type</label>
                  <div className="relative">
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 pl-4 pr-10 text-gray-900 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none"
                    >
                      <option value="Event">Event</option>
                      <option value="Getaway">Getaway</option>
                      <option value="Stay">Stay</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Title</label>
                  <input
                    ref={firstInputRef}
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g., Tech Conference 2024"
                    className="block w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Price</label>
                    <div className="relative rounded-xl shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-400 sm:text-sm font-medium">Ksh</span>
                        </div>
                        <input
                          name="price"
                          type="number"
                          value={form.price}
                          onChange={handleChange}
                          placeholder="5000"
                          className="block w-full rounded-xl border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-400"
                          required
                          min="0"
                        />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Image URL</label>
                    <input
                      name="imageUrl"
                      value={form.imageUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="block w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter a detailed description..."
                    rows="4"
                    className="block w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Image Preview */}
                {form.imageUrl && isValidImageUrl(form.imageUrl) && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Preview</label>
                    <div className="group relative rounded-2xl overflow-hidden h-48 border border-gray-200 bg-gray-50 shadow-inner">
                      <img src={form.imageUrl} alt="Preview" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Modal Footer - Fixed */}
            <div className="px-8 py-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="admin-modal-form"
                className="px-8 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-xl hover:from-green-500 hover:to-teal-500 focus:ring-4 focus:ring-green-200 transition-all shadow-lg shadow-green-500/20 transform hover:-translate-y-0.5 active:scale-95 flex items-center min-w-[140px] justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-2"></div>
                    Saving...
                  </>
                ) : isEditing ? "Update Item" : "Create Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
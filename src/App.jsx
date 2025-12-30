import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./Pages/Index";
import Events from "./Pages/Events";
import Getaways from "./Pages/Getaways";
import Stays from "./Pages/Stays";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import AdminDashboard from "./Pages/AdminDashboard";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfService from "./Pages/TermsOfService";
import Profile from "./Pages/Profile";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/getaways" element={<Getaways />} />
          <Route path="/stays" element={<Stays />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

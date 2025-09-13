import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Index";
import Events from "./Pages/Events";
import Getaways from "./Pages/Getaways";
import Stays from "./Pages/Stays";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path="/home" element={<Home />}></Route>``
      <Route path="/events" element={<Events />}></Route>
      <Route path="/getaways" element={<Getaways />}></Route>
      <Route path="/stays" element={<Stays />}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { EventsProvider } from "./Context/EventsContext";
import { CartProvider } from "./Context/CartContext";

createRoot(document.getElementById("root")).render(
  <EventsProvider>
    <StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
    </StrictMode>
    ,
  </EventsProvider>
);

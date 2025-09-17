import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (Array.isArray(savedCart)) {
        setCart(savedCart);
      } else {
        console.warn("Invalid cart data in localStorage, initializing empty cart");
        setCart([]);
      }
    } catch (err) {
      console.error("Error loading cart from localStorage:", err);
      setCart([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Error saving cart to localStorage:", err);
    }
  }, [cart]);

  const addToCart = (item, type) => {
    if (!item || !item._id || !item.title || !item.price) {
      console.error("Invalid item data:", item);
      return;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.item._id === item._id && cartItem.type === type);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.item._id === item._id && cartItem.type === type
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { item: { _id: item._id, title: item.title, price: item.price, image: item.image, description: item.description }, quantity: 1, type }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.item._id === id
            ? { ...cartItem, quantity: cartItem.quantity + delta }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.item._id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
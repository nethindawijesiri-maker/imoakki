import { createContext, useState } from "react";

export const ShopContext = createContext();

const DEMO_PRODUCTS = [
  { id: 1, name: "Resin Plaque with Flowers", price: 45, description: "Delicate flowers preserved inside resin.", img: "/images/plaque.jpg" },
  { id: 2, name: "Personalized Nameplate", price: 35, description: "Your name in resin-and-wood blend.", img: "/images/nameplate.jpg" },
  { id: 3, name: "Resin Jewelry Tray", price: 28, description: "Elegant tray for rings crafted in resin.", img: "/images/tray.jpg" },
  { id: 4, name: "Memory Keychain", price: 15, description: "Carry memories in a resin keychain.", img: "/images/keychain.jpg" },
  { id: 1, name: "Resin Plaque with Flowers", price: 45, description: "Delicate flowers preserved inside resin.", img: "/images/plaque.jpg" },
  { id: 4, name: "Memory Keychain", price: 15, description: "Carry memories in a resin keychain.", img: "/images/keychain.jpg" },
  { id: 1, name: "Resin Plaque with Flowers", price: 45, description: "Delicate flowers preserved inside resin.", img: "/images/plaque.jpg" },
  { id: 4, name: "Memory Keychain", price: 15, description: "Carry memories in a resin keychain.", img: "/images/keychain.jpg" },
  { id: 1, name: "Resin Plaque with Flowers", price: 45, description: "Delicate flowers preserved inside resin.", img: "/images/plaque.jpg" },
];


export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);

  return (
    <ShopContext.Provider value={{ products: DEMO_PRODUCTS, cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </ShopContext.Provider>
  );
}
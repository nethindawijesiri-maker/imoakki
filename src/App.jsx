import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { ShopProvider } from "./context/ShopContext";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import CartPage from "./components/CartPage";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ButterflyEffect from "./components/ButterflyEffect";
import CursorSplash from "./components/CursorSplash";
import MarqueeBanner from "./components/MarqueeBanner";
import ShopDetails from "./components/ShopDetails";   // 🆕 new details page
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <AnimatePresence>
        <motion.div
          key="loader"
          className="flex flex-col items-center justify-center h-screen bg-[#001d3d] border-4 border-black 
                     text-[#ffffff] text-6xl md:text-8xl font-hobo drop-shadow-[3px_3px_0px_white] tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typewriter
            words={[' Crafting Memories... ', '🌸 Making Resin Magic 🌸']}
            loop={false}
            
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <ShopProvider>
      <BrowserRouter>
        <div
          className="font-hobo text-gray-800 relative overflow-x-hidden 
                     bg-gradient-to-b from-[#ecf39e] via-[#4f772d] to-[#31572c]"
        >
          <CursorSplash />
          <ButterflyEffect />

          <Navbar toggleCart={() => setShowCart(!showCart)} />

          {/* Cart sidebar always available */}
          {showCart && <CartPage closeCart={() => setShowCart(false)} />}

          <Routes>
            {/* Homepage */}
            <Route path="/" element={
              <>
                <Hero toggleCart={() => setShowCart(!showCart)} />
                
                <Gallery />
                <About />
                <Testimonials />
                <Contact />
                <Footer />
              </>
            } />

            {/* Shop details page */}
            <Route path="/shop/:id" element={<ShopDetails toggleCart={() => setShowCart(!showCart)} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}
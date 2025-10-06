// 1. ADD FiMenu, FiX, and AnimatePresence to your imports
import { useState, useEffect, useContext } from "react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Navbar({ toggleCart }) {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false); 
  const { cart } = useContext(ShopContext);
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  // Scroll Spy (unchanged)
  useEffect(() => {
    if (location.pathname.startsWith("/shop")) return;

    const handleScroll = () => {
      const scrollY = window.scrollY + 150;
      navItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActive(item.label);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change (unchanged)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);


  // ShopDetails page logic (unchanged)
  if (location.pathname.startsWith("/shop/")) {
    return (
      <motion.button
        onClick={toggleCart}
        className="fixed top-5 right-5 font-hobo flex items-center justify-center  
                  px-4 py-3 text-base              /* <-- Mobile styles: small padding & text */
                  md:px-6 md:py-5 md:text-xl           /* <-- Desktop styles: larger padding & text */
                  bg-[white] text-ocean-dark border-2 border-ocean-dark 
                  rounded-full shadow-md hover:bg-ocean-aqua transition z-50"
        animate={{ rotate: totalQty > 0 ? [0, -10, 10, -10, 0] : 0 }}
        transition={{ duration: 0.5 }}
        key={totalQty}
      >
        <FiShoppingCart className="mr-2" />
        Cart
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 border-2 border-black 
                           text-white text-xs font-bold rounded-full w-6 h-6 
                           flex items-center justify-center shadow-[2px_2px_0px_black]">
            {totalQty}
          </span>
        )}
      </motion.button>
    );
  }

  // ✅ Default: Show Responsive Navbar + Cart
  return (
    <>
      {/* 2. ADD responsive classes `hidden md:flex` to the desktop nav */}
      <nav className="fixed top-5 left-0 right-0 z-40 hidden md:flex justify-center">
        <div className="font-hobo flex items-center space-x-8 px-20 py-5 
                        bg-[white] text-ocean-dark border-2 border-ocean-dark 
                        rounded-full shadow-md">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-xl transition-colors duration-300  ${
                active === item.label
                  ? "underline underline-offset-4 text-ocean-dark"
                  : "hover:text-ocean-blue"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Hamburger Button (visible only on small screens) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-5 left-5 z-50 p-3 bg-white border-2 border-ocean-dark rounded-full shadow-md"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-0 left-0 w-full pt-24 pb-8 bg-white/95 backdrop-blur-sm z-40 shadow-lg"
          >
            <div className="flex flex-col items-center space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // Close menu on click
                  className="font-hobo text-2xl text-ocean-dark hover:text-ocean-blue"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Independent cart pill */}
      <motion.button
        onClick={toggleCart}
        className="fixed top-5 right-5 font-hobo flex items-center justify-center  
           px-4 py-3 text-base              
           md:px-6 md:py-5 md:text-xl           
           bg-[white] text-ocean-dark border-2 border-ocean-dark 
           rounded-full shadow-md hover:bg-ocean-aqua transition z-50"
        animate={{ rotate: totalQty > 0 ? [0, -10, 10, -10, 0] : 0 }}
        transition={{ duration: 0.5 }}
        key={totalQty}
      >
        <FiShoppingCart className="mr-2" />
        Cart
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 border-2 border-black 
                           text-white text-xs font-bold rounded-full w-6 h-6 
                           flex items-center justify-center shadow-[2px_2px_0px_black]">
            {totalQty}
          </span>
        )}
      </motion.button>
    </>
  );
}
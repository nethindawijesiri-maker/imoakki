import { useState, useEffect, useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Navbar({ toggleCart }) {
  const [active, setActive] = useState("Home");
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

  // 🌟 Scroll Spy (skip in /shop/:id)
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

  // ✅ ShopDetails page shows ONLY Cart
  if (location.pathname.startsWith("/shop/")) {
    return (
      <motion.button
        onClick={toggleCart}
        className="fixed top-5 right-5 font-hobo flex items-center justify-center px-6 py-3 
                   bg-[white] text-ocean-dark border-2 border-ocean-dark 
                   rounded-full shadow-md hover:bg-ocean-aqua transition z-50"
        animate={{ rotate: totalQty > 0 ? [0, -10, 10, -10, 0] : 0 }}
        transition={{ duration: 0.5 }}
        key={totalQty}
      >
        <FiShoppingCart className="text-xl mr-2" />
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

  // ✅ Default: Show Navbar + Cart
  return (
    <>
      {/* Centered nav pill */}
      <nav className="fixed top-5 left-0 right-0 flex justify-center z-40">
        <div className="font-hobo flex items-center space-x-8 px-10 py-3 
                        bg-[white] text-ocean-dark border-2 border-ocean-dark 
                        rounded-full shadow-md">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition-colors duration-300 ${
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

      {/* Independent cart pill */}
      <motion.button
        onClick={toggleCart}
        className="fixed top-5 right-5 font-hobo flex items-center justify-center px-6 py-3 
                   bg-[white] text-ocean-dark border-2 border-ocean-dark 
                   rounded-full shadow-md hover:bg-ocean-aqua transition z-50"
        animate={{ rotate: totalQty > 0 ? [0, -10, 10, -10, 0] : 0 }}
        transition={{ duration: 0.5 }}
        key={totalQty}
      >
        <FiShoppingCart className="text-xl mr-2" />
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
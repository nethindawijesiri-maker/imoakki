import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";

const playPop = () => {
  const audio = new Audio(
    "https://assets.mixkit.co/sfx/download/mixkit-bubble-pop-up-alert-notification-2357.wav"
  );
  audio.volume = 0.25;
  audio.play();
};

export default function ShopDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  // ✅ Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    playPop();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-hobo text-3xl text-[#132a13]">
        Product not found 😢
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
  };

  // ✅ Generate a fixed "You may also like" list ONCE (never changes)
  const relatedList = useMemo(() => {
    return products.slice(0, 8); // strictly 8 max
  }, [products]);

  // Doodles
  const doodles = ["🌸", "💖", "🌿", "✨", "🦋", "🍀", "⭐", "🌼"];
  const randomDoodle = () => doodles[Math.floor(Math.random() * doodles.length)];

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
  const cardAnim = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
    exit: { opacity: 0, y: -30, scale: 0.9 },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center py-20 px-6 bg-[#fffcea] overflow-hidden">
      <span className="absolute top-16 left-10 text-4xl animate-bounce">{randomDoodle()}</span>
      <span className="absolute bottom-24 right-12 text-5xl animate-float-slow">{randomDoodle()}</span>

      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          className="w-full max-w-5xl bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_black] p-10 flex flex-col md:flex-row gap-10 items-center relative z-10"
        >
          {/* Product image */}
          <motion.img
            src={product.img}
            alt={product.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-full md:w-1/2 max-h-[500px] object-cover rounded-2xl border-2 border-black shadow-lg"
          />

          {/* Product info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-hobo text-[#132a13] mb-4 flex items-center justify-center md:justify-start gap-2 drop-shadow-[2px_2px_0px_#fdf08a]">
              {randomDoodle()} {product.name} {randomDoodle()}
            </h1>
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-[#132a13] mb-6">${product.price}</p>

            {/* Quantity */}
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-white border-2 border-black rounded-full shadow-md hover:bg-[#d8e377]"
              >-</button>
              <span className="font-hobo text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-white border-2 border-black rounded-full shadow-md hover:bg-[#d8e377]"
              >+</button>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.9, rotate: -2 }}
              onClick={handleAddToCart}
              className="px-10 py-3 bg-pink-300 border-2 border-black text-[#132a13] font-hobo 
                         rounded-full shadow-lg hover:bg-pink-400 transition"
            >
              🛒 Add {quantity} to Cart
            </motion.button>

            <div className="mt-6">
              <Link to="/">
                <button className="px-6 py-2 bg-white border-2 border-black rounded-full font-hobo hover:bg-[#d8e377] shadow-md">
                  ⬅ Back to Shop
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Related section (fixed 8 max) */}
      {relatedList.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-6xl mt-16 relative z-10"
        >
          <h2 className="text-3xl font-hobo text-[#132a13] text-center mb-8 drop-shadow-[2px_2px_0px_white]">
            You may also like 💕
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {relatedList.map((r) => (
              <motion.div
                key={r.id}
                variants={cardAnim}
                whileHover={{ scale: 1.03 }}
                className="gallery-card min-w-[260px] max-w-[260px] bg-white border-2 border-black rounded-2xl 
                           shadow-md overflow-hidden flex-shrink-0 flex flex-col
                           transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_16px_rgba(19,42,19,0.3)] cursor-pointer"
                onClick={() => navigate(`/shop/${r.id}`)}
              >
                {/* Image */}
                <img
                  src={r.img}
                  alt={r.name}
                  className="w-full h-44 object-cover border-b-2 border-black"
                />

                {/* Info */}
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="font-hobo text-xl mb-1 text-[#132a13] drop-shadow-[2px_2px_0px_white]">
                    {r.name}
                  </h3>
                  <p className="text-sm mb-2 text-gray-700 line-clamp-2 flex-grow">{r.description}</p>
                  <p className="font-hobo text-[#132a13] mb-4 text-lg">${r.price}</p>
                </div>

                {/* Add to Cart */}
                <div className="mt-auto flex justify-center p-4 pt-0">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: [-2, 2, -2] }}
                    whileTap={{ scale: 0.9, rotate: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(r);
                    }}
                    className="font-hobo text-base px-6 py-2 rounded-full border-2 border-black 
                               bg-white text-[#132a13] shadow-sm hover:bg-[#d8e377] hover:shadow-md 
                               transition-transform flex items-center gap-2"
                  >
                    🛒 Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
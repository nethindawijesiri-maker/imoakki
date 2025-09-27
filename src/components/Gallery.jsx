import { useContext, useRef, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FloatingDoodles from "./FloatingDoodles";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

export default function Gallery() {
  const { products, addToCart } = useContext(ShopContext);
  const scrollRef = useRef(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const scroll = (dir) => {
    if (scrollRef.current) {
      const itemWidth = 270;
      const visibleItems = 3;
      const distance = itemWidth * visibleItems;

      scrollRef.current.scrollBy({
        left: dir === "left" ? -distance : distance,
        behavior: "smooth",
      });
    }
  };

  // 🖱️ Horizontal mouse wheel scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const onWheel = (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault(); // prevent vertical page scroll
          el.scrollBy({
            left: e.deltaY,
            behavior: "smooth",
          });
        }
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const cardAnim = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotate: -3 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-20 flex justify-center w-full overflow-hidden bg-[#caf0f8]"
    >
      <FloatingDoodles type="gallery" />

      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={container}
        className="relative z-10 w-[95%] max-w-6xl bg-[#001d3d] border-2 border-black rounded-3xl shadow-lg p-10"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", damping: 14 }}
          className="text-5xl font-hobo text-[#caf0f8] text-center mb-12 [text-shadow:_3px_3px_0px_#001d3d]"
        >
          Craft Gallery
        </motion.h2>

        {/* Arrow Buttons */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20
                     bg-white border-2 border-black text-[#001d3d] 
                     px-5 py-4 rounded-full font-hobo text-xl hover:bg-[#90e0ef] transition shadow-md"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20
                     bg-white border-2 border-black text-[#001d3d] 
                     px-5 py-4 rounded-full font-hobo text-xl hover:bg-[#90e0ef] transition shadow-md"
        >
          <FaChevronRight />
        </button>

        {/* Scrollable Row */}
        <motion.div
          ref={scrollRef}
          variants={container}
          className="flex space-x-6 overflow-x-auto scrollbar-hide 
                     snap-x snap-mandatory pb-6 pr-12 scroll-smooth"
        >
          {products.map((p) => (
            <motion.div
              key={p.id}
              variants={cardAnim}
              className="gallery-card min-w-[260px] max-w-[260px] bg-white border-2 border-black rounded-2xl 
                         shadow-md overflow-hidden snap-start flex-shrink-0 flex flex-col
                         transition-all duration-500 hover:-translate-y-2 
                         hover:shadow-[0_8px_16px_rgba(19,42,19,0.3)] z-10"
              whileHover={{ scale: 1.03 }}
            >
              {/* Wrap with Link to go to ShopDetails */}
              <Link to={`/shop/${p.id}`} className="flex flex-col flex-1">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-44 object-cover border-b-2 border-black"
                />

                <div className="flex flex-col flex-1 p-4">
                  <h3 className="font-hobo text-xl mb-1 text-[#001d3d] drop-shadow-[2px_2px_0px_#90e0ef]">
                    {p.name}
                  </h3>
                  <p className="text-sm mb-2 text-[#001d3d]/80 line-clamp-2 flex-grow">
                    {p.description}
                  </p>
                  <p className="font-hobo text-[#001d3d] mb-4 text-lg">${p.price}</p>
                </div>
              </Link>

              {/* Add to Cart button */}
              <div className="mt-auto flex justify-center p-4 pt-0">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    rotate: [-2, 2, -2],
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{
                    scale: 0.85,
                    rotate: 0,
                    transition: { type: "spring", stiffness: 500, damping: 15 },
                  }}
                  onClick={() => addToCart(p)}
                  className="font-hobo text-base px-6 py-2 rounded-full border-2 border-black 
                             bg-white text-[#001d3d] shadow-sm 
                             hover:bg-[#00b4d8] hover:text-white hover:shadow-md 
                             transition-transform flex items-center gap-2"
                >
                  🛒 Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
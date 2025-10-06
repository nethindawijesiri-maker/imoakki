import { FaInstagram, FaFacebook, FaTiktok, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 14 },
    },
  };

  return (
    <section 
     style={{ backgroundColor: "#001d3d"}}>
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={container}
      className="relative py-12 bg-[#caf0f8] 
                 border-t-4 border-black rounded-t-3xl shadow-lg text-center overflow-hidden"
    >
 
      {/* Social icons row */}
      <motion.div
        variants={container}
        className="flex justify-center space-x-6 mb-6 relative z-10"
      >
        {/* Instagram */}
        <motion.a
          variants={item}
          href="#"
          className="bg-white border-2 border-black rounded-full p-4 text-[#001d3d] shadow-md
                     transition-transform duration-300 hover:scale-125 hover:rotate-6 hover:text-pink-500"
        >
          <FaInstagram size={24} />
        </motion.a>

        {/* Facebook */}
        <motion.a
          variants={item}
          href="#"
          className="bg-white border-2 border-black rounded-full p-4 text-[#001d3d] shadow-md
                     transition-transform duration-300 hover:scale-125 hover:-rotate-6 hover:text-[#0077b6]"
        >
          <FaFacebook size={24} />
        </motion.a>

        {/* TikTok */}
        <motion.a
          variants={item}
          href="#"
          className="bg-white border-2 border-black rounded-full p-4 text-[#001d3d] shadow-md
                     transition-transform duration-300 hover:scale-125 hover:rotate-12 hover:text-black"
        >
          <FaTiktok size={24} />
        </motion.a>
      </motion.div>

      {/* Back to Top button */}
      <motion.div variants={item} className="mb-6 relative z-10">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95, rotate: -2 }}
          onClick={scrollToTop}
          className="font-hobo text-lg px-8 py-3 flex items-center gap-2 mx-auto
                     bg-[#001d3d] border-2 border-black text-white rounded-full shadow-lg
                     hover:bg-[#00b4d8] transition-all duration-300 hover:scale-110"
        >
          <FaArrowUp /> Back to Top
        </motion.button>
      </motion.div>

      {/* Copyright */}
      <motion.p
        variants={item}
        className="font-hobo text-[#001d3d] md:text-xl [text-shadow:_1px_1px_0px_#90e0ef] relative z-10"
      >
       💕 © 2025 Anvora Tech. All rights reserved. 💕
      </motion.p>

      <motion.p
        variants={item}
        className="text-[11px] text-[#001d3d] font-medium mt-2 italic relative z-10 px-6"
      >
        🌸Crafting joy, resin dreams, and memories that sparkle🌸
      </motion.p>
    </motion.footer>
    </section>
  );
  
}

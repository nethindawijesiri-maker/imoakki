import FloatingDoodles from "./FloatingDoodles";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 flex justify-center w-full overflow-hidden bg-ocean-foam"
    >
      {/* 🌸 Floating doodles */}
      <FloatingDoodles type="about" />

      {/* Main Panel */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.9, rotate: -2 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
          type: "spring",
          stiffness: 80,
        }}
        className="relative z-10 w-[90%] max-w-4xl bg-[#90e0ef] border-2 border-black 
                   rounded-3xl shadow-lg p-10 text-center"
      >
        {/* Title */}
        <motion.h2
          initial={{ y: -40, opacity: 0, scale: 0.8 }}
          animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.2,
            duration: 0.8,
            type: "spring",
            damping: 12,
          }}
          className="font-hobo text-5xl text-[#001d3d] mb-4 [text-shadow:_3px_3px_0px_#caf0f8]"
        >
          About Us
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="italic text-[#0077b6] mb-8 text-lg"
        >
          ✨ A little story behind the crafts we love ✨
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="text-[#001d3d] font-medium text-lg leading-relaxed"
        >
          At <span className="font-hobo text-[#0077b6]">Imo Crafts</span>, every piece is handmade with 💖, 
          carefully designed to capture your memories in playful, one‑of‑a‑kind resin art.  
          From plaques that preserve beautiful flowers 🌸, to trays, jewelry 💍, and keychains 🔑,  
          we celebrate nature 🌿, warmth, and creativity 🎨 in everything we craft.
        </motion.p>
      </motion.div>
    </section>
  );
}
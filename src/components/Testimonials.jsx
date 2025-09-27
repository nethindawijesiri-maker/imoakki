import FloatingDoodles from "./FloatingDoodles";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.3 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotate: -2 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-20 flex justify-center w-full overflow-hidden bg-[#caf0f8]" // foam base
    >
      {/* ✨ floating doodles for background */}
      <FloatingDoodles type="testimonials" />

      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={container}
        className="relative z-10 w-[90%] max-w-5xl bg-[#90e0ef] border-2 border-black 
                   rounded-3xl shadow-lg p-10"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", damping: 10 }}
          className="font-hobo text-5xl text-[#001d3d] text-center mb-12 [text-shadow:_3px_3px_0px_#caf0f8]"
        >
          Customer Love 💕
        </motion.h2>

        {/* Testimonials Grid */}
        <motion.div variants={container} className="grid md:grid-cols-2 gap-10">
          {/* Card 1 */}
          <motion.blockquote
            variants={card}
            className="relative bg-white border-2 border-black rounded-2xl shadow-md p-6 
                       text-[#001d3d] font-medium leading-relaxed transition duration-300
                       hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_6px_12px_rgba(0,29,61,0.35)]"
          >
            <div className="absolute -top-6 left-6 bg-[#00b4d8] text-white border-2 border-black rounded-full px-3 py-2 text-2xl">
              😊
            </div>
            <p>
              “My custom plaque touched my heart! Truly beautiful and heartfelt —
              a keepsake I’ll treasure forever.”
            </p>
          </motion.blockquote>

          {/* Card 2 */}
          <motion.blockquote
            variants={card}
            className="relative bg-white border-2 border-black rounded-2xl shadow-md p-6 
                       text-[#001d3d] font-medium leading-relaxed transition duration-300
                       hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_6px_12px_rgba(0,29,61,0.35)]"
          >
            <div className="absolute -top-6 left-6 bg-[#00b4d8] text-white border-2 border-black rounded-full px-3 py-2 text-2xl">
              🌸
            </div>
            <p>
              “Imo Crafts brought my memory to life with such detail!
              It feels like a piece of my story preserved in resin ✨”
            </p>
          </motion.blockquote>
        </motion.div>
      </motion.div>
    </section>
  );
}
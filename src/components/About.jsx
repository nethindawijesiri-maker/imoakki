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
      // Background color (light blue/foam) is the canvas for the card
      className="relative py-24 flex justify-center w-full overflow-hidden bg-[#caf0f8]" 
    > 
      {/* 🌸 Floating doodles */} 
      <FloatingDoodles type="about" /> 

      {/* Main Panel: Now has the aggressive, curved border you requested */} 
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }} 
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} 
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1], 
          type: "spring", 
          stiffness: 80, 
        }} 
        // KEY UPDATE: Using `rounded-[4rem]` or `rounded-[60px]` for the maximum curve effect.
        className="relative z-10 w-[90%] max-w-5xl bg-[#90e0ef] border-2 rounded-2xl border-black 
                   rounded-2xl shadow-xl p-10 md:p-16 text-center text-[#001d3d] font text-lg text-[#001d3d]" 
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
          className="font-hobo text-5xl md:text-6xl text-[#ff6699] mb-4 [text-shadow:_3px_3px_0px_#ffc8dd]" 
        > 
          Our Craft Story
        </motion.h2> 

        {/* Subtitle */} 
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}} 
          transition={{ delay: 0.4, duration: 0.7 }} 
          className="italic text-[#0077b6] mb-10 text-xl font-serif" 
        > 
          "Where every bubble tells a story." ✨ 
        </motion.p> 

        {/* Description */} 
        <motion.p 
          initial={{ opacity: 0, y: 40 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}} 
          transition={{ delay: 0.6, duration: 0.9 }} 
          className="text-xl leading-relaxed max-w-3xl mx-auto" 
        > 
          At **Imo Crafts**, every piece is handmade with genuine passion and a sprinkle of magic 💖. We specialize in capturing your dearest memories—from wedding flowers 🌸 to simple trinkets—and preserving them in playful, one-of-a-kind resin art. Our mission is to combine the warmth of handcrafted quality with vibrant creativity 🎨, ensuring your story shines forever.
        </motion.p> 

        {/* Simple CTA Button */}
        <motion.a
          href="#gallery" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-8 px-8 py-3 bg-[#0077b6] text-white font-bold text-xl rounded-full 
                     border-2 border-[#001d3d] shadow-[4px_4px_0px_#001d3d] hover:shadow-none 
                     transition duration-200"
        >
          View Our Gallery →
        </motion.a>
      </motion.div> 
    </section> 
  ); 
}
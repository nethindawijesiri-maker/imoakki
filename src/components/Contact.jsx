import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FloatingDoodles from "./FloatingDoodles";

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25 } },
  };

  const item = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 12 },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 flex justify-center w-full overflow-hidden bg-[#001d3d]"
    >
     

      {/* Main Panel */}
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={container}
        className="w-[90%] max-w-3xl bg-[#90e0ef] border-2 border-black rounded-3xl shadow-lg p-10 relative z-10"
      >
        {/* Heading */}
        <motion.div variants={item} className="flex items-center justify-center gap-4 mb-4">
          <span className="animate-bounce">🌸</span>
          <h2 className="font-hobo text-5xl text-[#001d3d] [text-shadow:_3px_3px_0px_#caf0f8]">
            Contact Us
          </h2>
          <span className="animate-bounce">💖</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-center text-[#001d3d] mb-8 font-medium text-lg"
        >
          We’d love to hear from you 💌 Let’s craft memories together ✨
        </motion.p>

        {/* Form */}
        <motion.form variants={container} className="space-y-8">
          
          {/* Name field */}
          <motion.div variants={item} className="relative">
            <input
              type="text"
              className="w-full p-4 bg-white border-2 border-black rounded-3xl shadow-sm 
                         font-hobo text-[#001d3d] focus:outline-none focus:ring-4 focus:ring-[#00b4d8]"
              placeholder="Your Name"
            />
            <span className="absolute -top-6 left-2 font-hobo text-sm text-[#001d3d] bg-[#90e0ef] px-3">
              👤 Name
            </span>
          </motion.div>

          {/* Email field */}
          <motion.div variants={item} className="relative">
            <input
              type="email"
              className="w-full p-4 bg-white border-2 border-black rounded-3xl shadow-sm 
                         font-hobo text-[#001d3d] focus:outline-none focus:ring-4 focus:ring-[#0077b6]"
              placeholder="you@example.com"
            />
            <span className="absolute -top-6 left-2 font-hobo text-sm text-[#001d3d] bg-[#90e0ef] px-3">
              📧 Email
            </span>
          </motion.div>

          {/* Message field */}
          <motion.div variants={item} className="relative">
            <textarea
              className="w-full p-4 h-32 bg-white border-2 border-black rounded-3xl shadow-sm 
                         font-hobo text-[#001d3d] focus:outline-none focus:ring-4 focus:ring-[#00b4d8]"
              placeholder="Write your message here..."
            />
            <span className="absolute -top-6 left-2 font-hobo text-sm text-[#001d3d] bg-[#90e0ef] px-3">
              💬 Message
            </span>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={item} className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95, rotate: -1 }}
              type="submit"
              className="font-hobo md:text-2xl px-10 py-4 rounded-full border-2 border-black 
                         text-white bg-pink-400 hover:bg-pink-500 shadow-lg 
                         hover:shadow-[0_8px_16px_rgba(242,90,143,0.5)]
                         transition-transform flex items-center gap-2"
            >
              💕 Send Message ✨
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
}
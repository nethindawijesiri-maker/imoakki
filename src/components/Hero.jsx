import { motion } from "framer-motion";
import MarqueeBanner from "./MarqueeBanner";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-between bg-[#dff6ff] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-10 md:pt-16 flex-1">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-left z-10 max-w-xl">
          <h1 className="font-fredoka text-6xl sm:text-7xl md:text-8xl text-[#001d3d] drop-shadow-[4px_4px_0px_#ffffff] leading-tight">
            imo <br /> craft
          </h1>

          <motion.button
            initial={{
              scale: 1,
              backgroundColor: "#001d3d",
              color: "#ffffff",
              borderColor: "#000000",
            }}
            whileHover={{
              scale: 1.07,
              backgroundColor: "#ffffff",
              color: "#001d3d",
              borderColor: "#001d3d",
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            animate={{
              scale: 1,
              backgroundColor: "#001d3d",
              color: "#ffffff",
              borderColor: "#000000",
              transition: { duration: 0.15, ease: "easeOut" },
            }}
            whileTap={{
              scale: 0.94,
              transition: { duration: 0.1, ease: "easeOut" },
            }}
            className="mt-8 font-hobo text-lg sm:text-xl md:text-2xl px-8 py-3 rounded-full border-2 shadow-md"
            onClick={() => {
              document
                .getElementById("gallery")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            shop now
          </motion.button>
        </div>

        {/* Right Side: Character Image */}
        <div >
          <img
  src="/images/imo-craft-hero.png"
  alt="Imo Craft Character"
  className="
    w-full max-w-[650px]   /* default limit */
    sm:max-w-[380px]       /* small screens */
    md:max-w-[460px]       /* tablets */
    lg:max-w-[0px]       /* desktop */
    xl:max-w-[600px]       /* big screens */
    max-h-[600px]          /* cap vertical size */
    object-contain drop-shadow-xl
  "
/>
        </div>
      </div>

      {/* ✅ Marquee at bottom */}
      <div className="w-full">
        <MarqueeBanner />
      </div>
    </section>
  );
}


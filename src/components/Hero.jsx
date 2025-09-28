import { motion } from "framer-motion";
import MarqueeBanner from "./MarqueeBanner";

// Importing the images based on the provided files
import ImoCraftLogoChained from "/images/imo-craft-logo-chained.png";
import OdelshaCharacter from "/images/imo-craft-hero.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-between bg-[#dff6ff] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Main content container */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-10 md:pt-16 flex-1 relative">
        
        {/* 'imo craft' Logo Image Container */}
        <div className="relative w-full flex flex-col items-center md:items-start pt-16 md:pt-0 mb-10 md:mb-0">
          
          {/* 'imo craft' Logo Image */}
          <img
            src={ImoCraftLogoChained}
            alt="imo craft logo hanging by chains"
            // Mobile: Centered, max-w-sm (small size)
            // Desktop (md+): Bigger and slightly down, positioned left.
            className="w-full max-w-sm object-contain z-20 
                       md:absolute 
                       md:w-[850px]    // Made the logo even BIGGER
                       md:max-w-none 
                       md:top-[10px]   // Moved slightly down from previous -20px
                       md:left-[-220px] // Moved further left for visual balance
                      "
          />

          {/* 'shop now' button */}
          <motion.button
            initial={{ scale: 1, backgroundColor: "#001d3d", color: "#ffffff" }}
            whileHover={{ scale: 1.07, backgroundColor: "#ffffff", color: "#001d3d", border: "2px solid #001d3d", transition: { duration: 0.2, ease: "easeInOut" } }}
            animate={{ scale: 1, backgroundColor: "#001d3d", color: "#ffffff", transition: { duration: 0.15, ease: "easeOut" } }}
            whileTap={{ scale: 0.94, transition: { duration: 0.1, ease: "easeOut" } }}
            
            // Positioning for mobile and desktop
            className="mt-8 font-hobo text-lg sm:text-xl md:text-2xl px-8 py-3 rounded-full border-2 shadow-xl z-30 
                       relative md:absolute 
                       md:bottom-[100px] // Moved button slightly down
                       md:left-[100px] 
                       "
            onClick={() => {
              document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            shop now
          </motion.button>
        </div>

        {/* Character Image - Right Content */}
        <div className="w-full md:w-1/2 flex justify-center items-center md:items-end md:justify-end mt-16 md:mt-0">
          <img
            src={OdelshaCharacter}
            alt="Imo Craft Character, Odelsha"
            // Mobile/Default: Smaller size to fit screen
            // Desktop (md+): Moved further right and is slightly larger.
            className="w-[90%] max-w-[400px] object-contain drop-shadow-xl z-10
                       md:w-auto md:max-w-none 
                       md:h-[650px] lg:h-[750px] // Increased height
                       md:relative 
                       md:right-[-50px] // MOVED FURTHER RIGHT (from previous 80px)
                       md:top-[-20px] // Moved slightly up (less than previous 50px)
                      "
          />
        </div>
        
      </div>

      {/* Marquee at bottom */}
      <div className="w-full">
        <MarqueeBanner />
      </div>
    </section>
  );
}
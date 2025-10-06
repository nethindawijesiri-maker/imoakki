import { motion, useScroll, useTransform } from "framer-motion"; // <-- NEW IMPORTS
import MarqueeBanner from "./MarqueeBanner";

// Importing the images based on the provided files
import ImoCraftLogoChained from "/images/imo-craft-logo-chained.png";
import OdelshaCharacter from "/images/imo-craft-hero.png";

export default function Hero() {
  // 1. Setup the scroll listener for the entire page
  const { scrollYProgress } = useScroll();

  // 2. Define Transformations for Elements

  // Parallax for Odelsha Character (Moves slightly slower than scroll, giving depth)
  // Maps scroll progress (0 to 0.5) to a Y-axis movement (0 to 120px)
  const odelshaY = useTransform(scrollYProgress, [0, 1.5], [0, 1]);

  // Parallax for Imo Craft Logo (Moves faster than scroll, making it stick out)
  // Maps scroll progress (0 to 0.5) to a Y-axis movement (0 to -200px)
  const logoY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);

  // Parallax for 'shop now' button (Subtle downward drift and fade)
  // Maps scroll progress (0 to 0.3) to a Y-axis movement (0 to 50px)
  const buttonY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);


  return (
    <section
      id="home"
      className="relative flex flex-col justify-between bg-[#dff6ff] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Main content container */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-10 md:pt-16 flex-1 relative">
        
        {/* 'imo craft' Logo and Button Container (Left Side) */}
        <div className="relative w-full flex flex-col items-center md:items-start pt-16 md:pt-0 mb-10 md:mb-0 -mt-[210px] md:mt-0">
          
          {/* 'imo craft' Logo Image - WRAPPED IN motion.div */}
          {/* We use a motion.div to apply the parallax style */}
          <motion.div style={{ y: logoY }} className="relative z-20">
            <img
              src={ImoCraftLogoChained}
              alt="imo craft logo hanging by chains"
              className="w-full max-w-sm object-contain 
                          md:absolute 
                          md:w-[900px] 
                          md:max-w-none 
                          md:top-[-75px]
                          md:left-[-400px]"
            />
          </motion.div>

          {/* 'shop now' button - EXISTING motion.button UPDATED WITH STYLE */}
          <motion.button
            // APPLIED PARALLAX STYLES HERE
            style={{ y: buttonY, opacity: buttonOpacity }}
            
            initial={{ scale: 1, backgroundColor: "#001d3d", color: "#ffffff" }}
            whileHover={{ scale: 1.07, backgroundColor: "#ffffff", color: "#001d3d", border: "2px solid #001d3d", transition: { duration: 0.2, ease: "easeInOut" } }}
            animate={{ scale: 1, backgroundColor: "#001d3d", color: "#ffffff", transition: { duration: 0.15, ease: "easeOut" } }}
            whileTap={{ scale: 0.94, transition: { duration: 0.1, ease: "easeOut" } }}
            
            className="mt-8 font-hobo text-lg sm:text-xl md:text-2xl px-8 py-3 rounded-full border-2 shadow-xl z-30 -mt-[15px] md:mt-0
                        relative md:absolute 
                        md:bottom-[150px]
                        md:left-[1px]"
            onClick={() => {
              document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            shop now
          </motion.button>
        </div>

        {/* Character Image - Right Content - WRAPPED IN motion.div */}
        <div className="w-[90%] md:w-1/2 flex justify-center items-center md:items-end md:justify-end -mt-2 md:mt-0 md:ml-0  ml-9">
          {/* We wrap the image in a motion.div to apply the parallax style */}
          <motion.div style={{ y: odelshaY }} className="relative z-10">
            <img
              src={OdelshaCharacter}
              alt="Imo Craft Character, Odelsha"
              className="w-[90%] max-w-[400px] object-contain drop-shadow-xl
                          md:w-auto md:max-w-none 
                          md:h-[1000px] lg:h-[1100px] 
                          md:relative 
                          md:right-[-350px] 
                          md:top-[4px]"
            />
          </motion.div>
        </div>
        
      </div>

      {/* Marquee at bottom */}
      <div className="w-full">
        <MarqueeBanner />
      </div>
    </section>
  );
}
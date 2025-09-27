import { motion } from "framer-motion";

// pastel/cartoon theme colors
const colors = ["#f79ac0", "#ecf39e", "#90be6d", "#f4a261", "#a8dadc"];

export default function ButterflyEffect() {
  // generate e.g. 18 butterflies
  const butterflies = Array.from({ length: 18 });

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-hidden z-10">
      {butterflies.map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * window.innerWidth;
        const endX = Math.random() * window.innerWidth;
        const duration = 20 + Math.random() * 20; // between 20-40s
        const delay = Math.random() * 15; // stagger butterflies
        const size = 20 + Math.random() * 20; // 20px - 40px

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: startX, y: "110vh", opacity: 0 }}
            animate={{
              x: [startX, endX],
              y: ["110vh", "-20vh"],
              opacity: [0, 1, 1, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Cartoon butterfly SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-8 h-8"
              style={{
                fill: color,
                stroke: "#000",
                strokeWidth: 2,
                width: size,
                height: size,
              }}
            >
              <path d="M32 32c4-10 14-14 20-12 4 2 8 8 8 14s-2 12-8 14c-6 2-16-2-20-12zM32 32c-4-10-14-14-20-12-4 2-8 8-8 14s2 12 8 14c6 2 16-2 20-12z" />
              <circle cx="32" cy="32" r="3" stroke="#000" fill="black" />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
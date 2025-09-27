import { motion } from "framer-motion";

const doodles = [
  { icon: "🌸", x: "10%", delay: 0, size: "3xl", color: "text-pink-500" },
  { icon: "✨", x: "80%", delay: 2, size: "2xl", color: "text-yellow-400" },
  { icon: "🌿", x: "5%", delay: 1, size: "4xl", color: "text-green-600" },
  { icon: "💖", x: "90%", delay: 3, size: "3xl", color: "text-pink-400" },
];

export default function FloatingDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {doodles.map((d, i) => (
        <motion.span
          key={i}
          initial={{ y: "120vh", opacity: 0, scale: 0.8 }}
          animate={{
            y: ["120vh", "-20vh"],
            x: [d.x, `calc(${d.x} + ${i % 2 === 0 ? "50px" : "-50px"})`],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 25 + i * 6,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${d.color} text-${d.size}`}
          style={{ left: d.x }}
        >
          {d.icon}
        </motion.span>
      ))}
    </div>
  );
}
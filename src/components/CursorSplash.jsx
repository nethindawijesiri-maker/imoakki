import { useEffect, useRef, useState } from "react";

export default function CursorSplash() {
  const canvasRef = useRef(null);
  let particles = [];
  const [active, setActive] = useState(true); // flower effect toggle

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Handle disabling on hover
    const disableElements = ["nav a", "button", ".gallery-card"];

    disableElements.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener("mouseenter", () => setActive(false));
        el.addEventListener("mouseleave", () => setActive(true));
      });
    });

    // Mouse move add particles
    const onMouseMove = (e) => {
      if (!active) return; // disable on hover over UI
      for (let i = 0; i < 1; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 10 + 8,
          dx: (Math.random() - 0.5) * 1.2,
          dy: (Math.random() - 0.5) * 1.2,
          petals: Math.floor(Math.random() * 3) + 5,
          color: getRandomFlowerColor(),
          life: 0,
          maxLife: 60 + Math.random() * 20, // shorter life
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life++;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        } else {
          let alpha = 1 - p.life / p.maxLife;
          drawFlower(ctx, p.x, p.y, p.size, p.petals, p.color, alpha);
        }
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    ></canvas>
  );
}

// Flower drawing as before...
function drawFlower(ctx, x, y, radius, petals, color, alpha) {
  ctx.save();
  ctx.translate(x, y);

  for (let i = 0; i < petals; i++) {
    const angle = (i * Math.PI * 2) / petals;
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    ctx.beginPath();
    ctx.ellipse(
      Math.cos(angle) * radius * 0.3,
      Math.sin(angle) * radius * 0.3,
      radius / 2,
      radius,
      angle,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function getRandomFlowerColor() {
  const colors = [
    { r: 255, g: 182, b: 193 }, // pink
    { r: 221, g: 160, b: 221 }, // lavender
    { r: 255, g: 228, b: 181 }, // yellow
    { r: 173, g: 216, b: 230 }, // light blue
    { r: 144, g: 238, b: 144 }, // green
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
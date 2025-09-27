export default function MarqueeBanner() {
  const promos = [
    "🌟 20% Off for First-Time Buyers",
    "🚚 Free Shipping Over $50",
    "🎨 Custom Resin Orders Available",
    "💝 Handmade Keepsakes Crafted With Love",
    "✨ Capture Memories in Resin",
  ];

  return (
    <div className="relative overflow-hidden bg-[#001d3d] border-y-2 border-black py-4 shadow-md">
      <div
        className="animate-marquee whitespace-nowrap flex text-xl md:text-2xl font-hobo 
                   tracking-wide text-[#001d3d] drop-shadow-[2px_2px_0px_black] hover:[animation-play-state:paused]"
      >
        {promos.map((promo, i) => (
          <span
            key={i}
            className="mx-12 px-4 py-1 rounded-full border-2 border-black bg-white shadow-sm hover:bg-pink-200 transition"
          >
            {promo}
          </span>
        ))}
        {/* Repeat for continuous loop */}
        {promos.map((promo, i) => (
          <span
            key={`repeat-${i}`}
            className="mx-12 px-4 py-1 rounded-full border-2 border-black bg-white shadow-sm hover:bg-pink-200 transition"
          >
            {promo}
          </span>
        ))}
      </div>
    </div>
  );
}
import FloatingDoodles from "./FloatingDoodles";
import { motion, AnimatePresence } from "framer-motion"; // <-- Import AnimatePresence
import { useInView } from "react-intersection-observer";
import { useState } from "react";

// ---------------------------------------------------------------------
// --- MOCK DATA (Replace with real API call later) ---
// ---------------------------------------------------------------------
const mockReviews = [
  {
    id: 1,
    name: "imashi",
    rating: 5,
    message:
      "My custom plaque touched my heart! Truly beautiful and heartfelt — a keepsake I’ll treasure forever. The detail is incredible!",
    emoji: "😊",
  },
  {
    id: 2,
    name: "thisuni",
    rating: 5,
    message:
      "Imo Crafts brought my memory to life with such detail! It feels like a piece of my story preserved in resin ✨ Highly recommend!",
    emoji: "🌸",
  },
  {
    id: 3,
    name: "shehani",
    rating: 4,
    message:
      "The keychain came out perfectly, exactly as I imagined! The process was smooth and the communication was great. Will be ordering again!",
    emoji: "💖",
  },
  {
    id: 4,
    name: "Mark T.",
    rating: 5,
    message:
      "Exceptional craftsmanship. The custom coaster set is a huge hit! Worth every penny for such a unique and personal gift.",
    emoji: "🌟",
  },
  {
    id: 5,
    name: "Chloe L.",
    rating: 4,
    message:
      "A gorgeous piece of art! Took a little longer than expected, but the quality made up for the wait. Very happy with my resin flower block.",
    emoji: "🌼",
  },
];

// ---------------------------------------------------------------------
// --- STAR RATING COMPONENT ---
// ---------------------------------------------------------------------
const StarRating = ({ rating, onClick = () => {} }) => {
  const fullStars = Math.floor(rating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span
        key={i}
        className={`text-2xl cursor-pointer ${
          i < fullStars ? "text-yellow-400" : "text-gray-300"
        }`}
        onClick={() => onClick(i + 1)} // Handle click for rating input
      >
        ★
      </span>
    );
  }
  return <div className="flex space-x-0.5">{stars}</div>;
};

// ---------------------------------------------------------------------
// --- SINGLE REVIEW CARD COMPONENT ---
// ---------------------------------------------------------------------
const ReviewCard = ({ review, variants }) => (
  <motion.blockquote
    variants={variants}
    className="relative bg-white border-2 border-black rounded-2xl shadow-md p-6 pt-10
               text-[#001d3d] font-medium leading-relaxed transition duration-300
               hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_6px_12px_rgba(0,29,61,0.35)]"
  >
    <div className="absolute -top-6 left-6 bg-[#00b4d8] text-white border-2 border-black rounded-full px-3 py-2 text-2xl">
      {review.emoji}
    </div>
    <div className="flex justify-between items-start mb-2">
      <StarRating rating={review.rating} />
      <span className="font-bold text-lg text-[#001d3d]">{review.name}</span>
    </div>
    <p className="mt-2 text-base italic">“{review.message}”</p>
  </motion.blockquote>
);

// ---------------------------------------------------------------------
// --- ADD REVIEW MODAL COMPONENT (The Pop-up) ---
// ---------------------------------------------------------------------
const ReviewFormModal = ({ isOpen, onClose }) => {
  const [currentRating, setCurrentRating] = useState(5);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send the data to the API:
    // { name, rating: currentRating, message }
    console.log("Review submitted!", { name, rating: currentRating, message });
    
    // Reset form and close
    alert(`Thank you, ${name}! Your ${currentRating}-star review will be posted after approval.`);
    setName('');
    setMessage('');
    setCurrentRating(5);
    onClose(); 
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose} // Allows closing by clicking outside
    >
      <motion.div
        initial={{ y: "-100vh", opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: "100vh", opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the form
        className="bg-white border-4 border-black rounded-3xl p-8 w-full max-w-lg shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl font-bold text-[#001d3d] hover:text-red-500 transition"
          aria-label="Close Review Form"
        >
          &times;
        </button>
        <h3 className="font-hobo text-4xl text-[#001d3d] text-center mb-6 [text-shadow:_2px_2px_0px_#caf0f8]">
          Share Your Love! 💖
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-bold text-[#001d3d] mb-1">Your Name</label>
            <input 
              id="name" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Happy Customer"
              required
              className="w-full p-3 border-2 border-black rounded-xl focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8] outline-none" 
            />
          </div>

          <div>
            <label className="block text-lg font-bold text-[#001d3d] mb-1">Your Rating: {currentRating} Stars</label>
            <StarRating rating={currentRating} onClick={setCurrentRating} />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-bold text-[#001d3d] mb-1">Your Message</label>
            <textarea 
              id="message" 
              rows="4" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you loved..."
              required
              className="w-full p-3 border-2 border-black rounded-xl focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8] outline-none"
            ></textarea>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 px-8 py-3 bg-[#001d3d] text-[#90e0ef] font-bold text-lg rounded-full 
                       border-2 border-black shadow-[4px_4px_0px_#caf0f8] hover:shadow-[2px_2px_0px_#caf0f8]
                       transition duration-200"
          >
            Submit Review
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------
// --- MAIN TESTIMONIALS COMPONENT ---
// ---------------------------------------------------------------------
export default function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  // State for the "Add Review" modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Display only the first 3 reviews for the preview
  const reviewsForPreview = mockReviews.slice(0, 3);

  // Framer Motion variants
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 },
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

  // Handler for "See All Reviews" (placeholder logic)
  const handleSeeAllReviews = () => {
    console.log("Navigating to all reviews page/modal...");
    alert("This button would show all reviews or redirect to a reviews page!");
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

        {/* Testimonials Grid (Preview of 3) */}
        <motion.div
          variants={container}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10" // Use lg:grid-cols-3 for 3 reviews in one row on large screens
        >
          {reviewsForPreview.map((review) => (
            <ReviewCard key={review.id} review={review} variants={card} />
          ))}
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">
          {/* See All Reviews Button */}
          <motion.button
            onClick={handleSeeAllReviews}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#00b4d8] text-white font-bold text-lg rounded-full 
                       border-2 border-black shadow-[4px_4px_0px_#001d3d] hover:shadow-[2px_2px_0px_#001d3d]
                       transition duration-200"
          >
            See All Reviews ({mockReviews.length})
          </motion.button>

          {/* Add Review Button (Opens the Modal) */}
          <motion.button
            onClick={handleOpenModal} // <-- Opens the modal
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#001d3d] text-[#90e0ef] font-bold text-lg rounded-full 
                       border-2 border-black shadow-[4px_4px_0px_#caf0f8] hover:shadow-[2px_2px_0px_#caf0f8]
                       transition duration-200"
          >
            Add A Review
          </motion.button>
        </div>
      </motion.div>

      {/* The Review Submission Modal */}
      <AnimatePresence>
        {isModalOpen && <ReviewFormModal isOpen={isModalOpen} onClose={handleCloseModal} />}
      </AnimatePresence>
    </section>
  );
}
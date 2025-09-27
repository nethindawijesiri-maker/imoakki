import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaTrash, FaShoppingCart, FaHeart, FaTimes } from "react-icons/fa";

export default function CartPage({ closeCart }) {
  const { cart, removeFromCart, clearCart } = useContext(ShopContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section className="fixed top-0 right-0 w-96 h-full bg-[#eaf28c] border-l-4 border-black rounded-l-3xl shadow-2xl z-50 overflow-y-auto flex flex-col animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b-4 border-black bg-white shadow">
        <div className="flex items-center gap-2">
          <FaShoppingCart className="text-[#132a13] text-2xl" />
          <h3 className="font-hobo text-2xl text-[#132a13] drop-shadow-[2px_2px_0px_white]">
            Your Cart
          </h3>
          <FaHeart className="text-pink-500 animate-bounce ml-2" />
        </div>

        {/* ✅ Close Button */}
        <button
          onClick={closeCart}
          className="bg-pink-300 border-2 border-black rounded-full p-2 hover:bg-pink-400 transition transform hover:scale-110"
        >
          <FaTimes className="text-black text-lg" />
        </button>
      </div>

      {/* Cart Content */}
      <div className="flex-1 p-6">
        {cart.length === 0 ? (
          <p className="text-gray-600 font-hobo text-center text-lg">
            🛒 Your cart is empty 💔
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white border-2 border-black rounded-2xl p-3 shadow-md"
              >
                <div>
                  <p className="font-hobo text-[#132a13]">{item.name}</p>
                  <p className="text-sm text-gray-700">
                    ${item.price} × {item.qty}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-pink-300 border-2 border-black rounded-full px-3 py-1 text-sm font-hobo hover:bg-pink-400 transition transform hover:scale-110 flex items-center"
                >
                  <FaTrash className="mr-1" /> Remove
                </button>
              </div>
            ))}

            <hr className="border-black" />

            <p className="mt-4 font-hobo text-lg text-[#132a13] flex justify-between">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </p>

            <button className="mt-4 w-full py-3 bg-green-400 border-2 border-black text-[#132a13] font-hobo text-lg rounded-full shadow-md hover:bg-green-500 hover:scale-105 transition transform">
              💳 Checkout (Demo)
            </button>

            <button
              onClick={clearCart}
              className="mt-3 w-full py-2 bg-white border-2 border-black font-hobo text-[#132a13] rounded-full hover:bg-pink-100 transition"
            >
              🗑️ Clear Cart
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
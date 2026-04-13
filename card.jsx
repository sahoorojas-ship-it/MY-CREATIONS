import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FunPlayground() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 overflow-hidden">
      
      {/* Title */}
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-4xl font-bold text-white mb-8"
      >
        🎈 Fun Animation Playground 🎈
      </motion.h1>

      {/* Animated Button */}
      <motion.button
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
        onClick={() => setClicked(!clicked)}
        className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-2xl shadow-lg"
      >
        Click Me 😎
      </motion.button>

      {/* Fun Box */}
      <motion.div
        animate={{
          x: clicked ? 200 : -200,
          rotate: clicked ? 360 : 0,
          borderRadius: clicked ? "50%" : "20%",
          backgroundColor: clicked ? "#34D399" : "#60A5FA",
        }}
        transition={{ type: "spring", stiffness: 120 }}
        className="w-32 h-32 mt-10 flex items-center justify-center text-white font-bold"
      >
        {clicked ? "🎉 Yay!" : "😴"}
      </motion.div>

      {/* Floating Emojis */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 300, opacity: 0 }}
          animate={{
            y: -300,
            opacity: [0, 1, 1, 0],
            x: Math.random() * 200 - 100,
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute text-2xl"
        >
          ✨
        </motion.div>
      ))}

      {/* Bouncing Ball */}
      <motion.div
        animate={{ y: [0, -150, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="w-10 h-10 bg-yellow-300 rounded-full mt-16 shadow-lg"
      />
    </div>
  );
}
import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div
      id="home"
      style={{
        backgroundImage: "url('/media/bg-image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="text-[var(--text)] min-h-screen flex items-center px-10 py-20 md:py-28"
    >
      {/* Optional overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

      <div className="relative grid md:grid-cols-2 gap-12 w-full items-center">
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_0_10px_rgba(39,165,222,0.6)]"
          >
            Hi — I'm{" "}
            <span className="text-accent">
              Rabiya Ansari
            </span>
          </h1>

          <p className="text-lg md:text-xl opacity-90 max-w-lg mt-3">
            Front-end developer & student. I build accessible, responsive websites and love clean UI.
          </p>

          <motion.a
            href="#projects"
            className="inline-block px-8 py-3 rounded-xl font-semibold uppercase tracking-wider bg-transparent border border-white text-white text-sm md:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,170,255,0.3)] hover:border-[#27A5DE] hover:text-[#27A5DE]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="./media/hero.png"
            alt="avatar"
            className="rounded-2xl shadow-2xl w-72 md:w-96"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;

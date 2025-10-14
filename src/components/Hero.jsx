import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div
      id="home"
      className="bg-[var(--bg)] text-[var(--text)] px-10 pt-28 pb-16 grid md:grid-cols-2 gap-10 items-center"
    >

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Hi — I'm <span className="text-accent">Rabiya Ansari</span>
        </h1>
        <p className="text-lg opacity-80">
          Front-end developer & student. I build accessible, responsive websites and love clean UI.
        </p>
        <motion.a
          href="#projects"
          className="inline-block bg-accent text-white px-6 py-3 rounded-full font-medium shadow-lg"
          whileHover={{ scale: 1.08 }}
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
          className="rounded-xl shadow-2xl w-72 md:w-80"
        />
      </motion.div>
    </div>
  );
}

export default Hero;

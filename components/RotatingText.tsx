"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["organized.", "searchable.", "never lost.", "one click away."];

export default function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="inline-block text-[#d6613f] italic font-['Instrument_Serif'] font-normal"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
"use client";
import { motion } from "framer-motion";

const tags = ["DSA", "OS", "DBMS", "CN", "OOPs", "Maths III", "COA", "AI/ML"];

export default function FloatingTags() {
  return (
    <div className="relative w-full h-full min-h-[300px]">
      {tags.map((tag, i) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: `${(i * 37) % 90}%`,
            left: `${(i * 53) % 85}%`,
          }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}
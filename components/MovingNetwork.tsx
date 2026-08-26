"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Node = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
};

export default function MovingNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;

      if (!container || !canvas) return;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      let width = 0;
      let height = 0;
      let animationFrame: number;

      const nodes: Node[] = [];
      const nodeCount = 65;
      const maxDistance = 230;

      const resize = () => {
        const rect = container.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (nodes.length === 0) {
          for (let i = 0; i < nodeCount; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;

            nodes.push({
              x,
              y,
              baseX: x,
              baseY: y,
              radius: Math.random() * 2 + 1,
            });
          }
        }
      };

      resize();

      const moveNodes = () => {
        nodes.forEach((node, index) => {
          gsap.to(node, {
            x: node.baseX + gsap.utils.random(-90, 90),
            y: node.baseY + gsap.utils.random(-70, 70),
            duration: gsap.utils.random(4, 8),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.03,
          });
        });
      };

      moveNodes();

      const draw = () => {
        ctx.clearRect(0, 0, width, height);

        // Connections
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              const opacity =
                (1 - distance / maxDistance) * 0.22;

              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);

              ctx.strokeStyle = `rgba(214, 97, 63, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        // Nodes
        nodes.forEach((node) => {
          ctx.beginPath();

          ctx.arc(
            node.x,
            node.y,
            node.radius,
            0,
            Math.PI * 2
          );

          ctx.fillStyle = "rgba(255, 250, 240, 0.9)";
          ctx.fill();

          ctx.beginPath();

          ctx.arc(
            node.x,
            node.y,
            node.radius * 3,
            0,
            Math.PI * 2
          );

          ctx.fillStyle = "rgba(214, 97, 63, 0.08)";
          ctx.fill();
        });

        animationFrame = requestAnimationFrame(draw);
      };

      draw();

      window.addEventListener("resize", resize);

      return () => {
        window.removeEventListener("resize", resize);

        cancelAnimationFrame(animationFrame);

        gsap.killTweensOf(nodes);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative my-20 h-[520px] w-full overflow-hidden bg-[#14110f]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />

      {/* subtle center glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,97,63,0.08),transparent_55%)]" />
    </section>
  );
}
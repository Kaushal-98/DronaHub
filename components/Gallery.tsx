"use client";

import { useEffect, useRef } from "react";
import DriftWall from "@/components/DriftWall";

const items = [
  {
    image: "/images/campus-1.jpg",
    title: "Campus Life",
    href: "#",
  },
  {
    image: "/images/campus-2.jpg",
    title: "Academic Spaces",
    href: "#",
  },
  {
    image: "/images/campus-3.jpg",
    title: "Student Community",
    href: "#",
  },
  {
    image: "/images/campus-4.jpg",
    title: "College Architecture",
    href: "#",
  },
  {
    image: "/images/campus-5.jpg",
    title: "Learning Together",
    href: "#",
  },
  {
    image: "/images/campus-6.jpg",
    title: "Campus Events",
    href: "#",
  },
  {
    image: "/images/campus-7.jpg",
    title: "Everyday Moments",
    href: "#",
  },
  {
    image: "/images/campus-8.jpg",
    title: "Beyond Classrooms",
    href: "#",
  },
  {
    image: "/images/campus-9.jpg",
    title: "Our Community",
    href: "#",
  },
  {
    image: "/images/campus-10.jpg",
    title: "Campus Memories",
    href: "#",
  },
];

export default function Gallery() {
  return (
    <section className="relative w-screen overflow-hidden bg-[#f3eee1]">
      {/* HEADING */}
      <div className="flex w-full flex-col justify-between gap-8 px-6 pt-20 md:flex-row md:items-end md:px-16 md:pt-28 lg:px-20">
        <div>
          <p className="mb-5 text-xs font-semibold tracking-[0.35em] text-[#d6613f]">
            CAMPUS EXPERIENCE
          </p>

          <h2 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-[#14110f] md:text-7xl lg:text-8xl">
            Explore the spaces
            <span className="block font-['Instrument_Serif'] font-normal italic text-[#d6613f]">
              around you.
            </span>
          </h2>
        </div>

        <p className="max-w-md text-base leading-relaxed text-[#625e56] md:text-lg">
          Discover the campus spaces where students learn, connect,
          collaborate and create their journey together.
        </p>
      </div>

      {/* DRIFT WALL */}
      <div className="mt-14 h-[500px] w-screen md:h-[650px] lg:h-[720px]">
        <DriftWall
          items={items}
          columns={7}
          tileWidth={240}
          tileHeight={160}
          gap={20}
          tilt={16}
          turn={-14}
          perspective={1200}
          depth={150}
          speed={42}
          direction="up"
          variance={0.45}
          parallax={0.6}
          lift={64}
          fade={0.45}
          dim={0.4}
          overlayColor="#f3eee1"
          radius={16}
          roll={0}
          pauseOnHover={false}
          grayscale={false}
        />
      </div>

      {/* NETWORK EXPERIENCE */}
      <DronaNetwork />

      {/* BOTTOM */}
      <div className="flex w-full items-center justify-between border-t border-[#14110f]/15 px-6 py-6 md:px-16 lg:px-20">
        <span className="text-xs font-semibold tracking-[0.2em] text-[#625e56]">
          DRONAHUB
        </span>

        <span className="text-xs tracking-[0.15em] text-[#625e56]">
          LEARN · CONNECT · GROW
        </span>
      </div>
    </section>
  );
}

function DronaNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame = 0;

    const mouse = {
      x: -1000,
      y: -1000,
    };

    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    };

    let nodes: Node[] = [];

    const createNodes = () => {
      const rect = wrapper.getBoundingClientRect();

      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
      );

      const count =
        window.innerWidth < 768
          ? 40
          : window.innerWidth < 1200
          ? 70
          : 100;

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
      }));
    };

    const draw = () => {
      const rect = wrapper.getBoundingClientRect();

      ctx.clearRect(0, 0, rect.width, rect.height);

      /* MOVE NODES */
      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 180) {
          const force = (180 - distance) / 180;

          node.vx -= (dx / distance) * force * 0.04;
          node.vy -= (dy / distance) * force * 0.04;
        }

        node.x += node.vx;
        node.y += node.vy;

        node.vx *= 0.995;
        node.vy *= 0.995;

        if (node.x < 0 || node.x > rect.width) {
          node.vx *= -1;
        }

        if (node.y < 0 || node.y > rect.height) {
          node.vy *= -1;
        }
      });

      /* CONNECTIONS */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDistance = 140;

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;

            ctx.beginPath();

            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            ctx.strokeStyle = `rgba(214, 97, 63, ${
              opacity * 0.42
            })`;

            ctx.lineWidth = 1;

            ctx.stroke();
          }
        }
      }

      /* NODES */
      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const active = distance < 130;

        ctx.beginPath();

        ctx.arc(
          node.x,
          node.y,
          active ? node.radius + 1.5 : node.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = active
          ? "rgba(214, 97, 63, 1)"
          : "rgba(20, 17, 15, 0.65)";

        ctx.fill();

        if (active) {
          ctx.beginPath();

          ctx.arc(
            node.x,
            node.y,
            node.radius + 5,
            0,
            Math.PI * 2
          );

          ctx.strokeStyle = "rgba(214, 97, 63, 0.22)";
          ctx.lineWidth = 1;

          ctx.stroke();
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    createNodes();
    draw();

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    window.addEventListener("resize", createNodes);

    return () => {
      cancelAnimationFrame(animationFrame);

      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);

      window.removeEventListener("resize", createNodes);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
  className="relative my-10 h-[360px] w-full overflow-hidden bg-[#1c1917] md:h-[460px]"    >
      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />

      {/* GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(243,238,225,0.15) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(243,238,225,0.15) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "55px 55px",
        }}
      />

      {/* CONTENT */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <p className="mb-5 text-[10px] font-bold tracking-[0.5em] text-[#d6613f] md:text-xs">
          THE DRONAHUB NETWORK
        </p>

        <h3 className="text-5xl font-black tracking-[-0.05em] text-[#f3eee1] md:text-7xl">
          CONNECTED
          <span className="block font-['Instrument_Serif'] font-normal italic text-[#d6613f]">
            by knowledge.
          </span>
        </h3>

        <p className="mt-6 max-w-md px-6 text-sm leading-relaxed text-[#b8b0a4] md:text-base">
          Every resource, student and contribution becomes part of
          one growing campus network.
        </p>
      </div>

      {/* CORNERS */}
      <div className="absolute left-6 top-6 z-20 text-[10px] font-semibold tracking-[0.3em] text-[#8e867b]">
        DRONAHUB / 001
      </div>

      <div className="absolute bottom-6 right-6 z-20 text-[10px] font-semibold tracking-[0.3em] text-[#8e867b]">
        LIVE NETWORK ●
      </div>
    </div>
  );
}
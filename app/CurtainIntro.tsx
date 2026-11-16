"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 700;
const OPEN_MS = 2600;

export default function CurtainIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      setShow(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = previousOverflow;
    }, HOLD_MS + OPEN_MS + 150);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!show) return null;

  return (
    <div className="curtain-wrap" aria-hidden="true">
      {/* LEFT CURTAIN */}
      <div className="curtain curtain-left">
        <div className="fabric-folds" />
        <div className="fabric-light" />
      </div>

      {/* RIGHT CURTAIN */}
      <div className="curtain curtain-right">
        <div className="fabric-folds" />
        <div className="fabric-light" />
      </div>

      <style>{`
        .curtain-wrap {
          position: fixed;
          inset: 0;
          z-index: 999999;
          overflow: hidden;
          pointer-events: none;

          perspective: 1800px;
          perspective-origin: center center;
        }

        .curtain {
          position: absolute;
          top: -4%;
          bottom: -4%;
          width: 53%;
          overflow: hidden;

          background:
            linear-gradient(
              180deg,
              rgba(20, 0, 3, 0.8) 0%,
              rgba(80, 0, 8, 0.15) 16%,
              rgba(0, 0, 0, 0) 52%,
              rgba(30, 0, 3, 0.3) 82%,
              rgba(0, 0, 0, 0.72) 100%
            ),

            repeating-linear-gradient(
              90deg,
              #390004 0%,
              #65070d 2.5%,
              #9c1019 5%,
              #d5222d 7%,
              #a5121c 9%,
              #5d060c 12%,
              #350003 15%,
              #790912 18%,
              #b71822 21%,
              #e0333d 23%,
              #8b0b15 26%,
              #410004 29%
            );

          box-shadow:
            inset 0 0 90px rgba(0, 0, 0, 0.7),
            inset 0 0 30px rgba(255, 80, 90, 0.12),
            0 0 90px rgba(0, 0, 0, 0.85);

          transform-style: preserve-3d;

          /*
           * IMPORTANT:
           * One continuous animation.
           * No intermediate pauses.
           */
          animation-duration: ${OPEN_MS}ms;
          animation-delay: ${HOLD_MS}ms;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(
            0.4,
            0,
            0.2,
            1
          );
        }

        .curtain-left {
          left: -1%;
          transform-origin: left center;
          animation-name: curtain-left-open;
        }

        .curtain-right {
          right: -1%;
          transform-origin: right center;
          animation-name: curtain-right-open;
        }

        /* ================================
           FABRIC FOLDS
        ================================= */

        .fabric-folds {
          position: absolute;
          inset: 0;

          background:
            repeating-linear-gradient(
              90deg,

              rgba(0, 0, 0, 0.62) 0px,
              rgba(0, 0, 0, 0.18) 12px,

              rgba(255, 100, 110, 0.5) 22px,
              rgba(255, 130, 135, 0.15) 30px,

              rgba(0, 0, 0, 0.58) 43px,
              rgba(0, 0, 0, 0.12) 56px,

              rgba(255, 80, 90, 0.4) 68px,
              rgba(255, 80, 90, 0.08) 80px
            );

          mix-blend-mode: overlay;

          animation:
            fabric-wave 2.2s ease-in-out
            ${HOLD_MS}ms infinite alternate;
        }

        /* ================================
           FABRIC LIGHT
        ================================= */

        .fabric-light {
          position: absolute;
          inset: -20%;

          background:
            radial-gradient(
              ellipse at 50% 40%,
              rgba(255, 150, 150, 0.25) 0%,
              rgba(255, 80, 90, 0.08) 28%,
              transparent 65%
            );

          opacity: 0.75;

          animation:
            light-flow 2.6s ease-in-out
            ${HOLD_MS}ms infinite alternate;
        }

        /* =================================
           LEFT CURTAIN
           
           Smooth continuous movement
           from closed → fully open.
        ================================= */

        @keyframes curtain-left-open {
          from {
            transform:
              translate3d(0, 0, 0)
              rotateY(0deg)
              rotateZ(0deg)
              scaleX(1);
          }

          to {
            transform:
              translate3d(-103%, 0, 0)
              rotateY(40deg)
              rotateZ(0deg)
              scaleX(0.06);
          }
        }

        /* =================================
           RIGHT CURTAIN
           
           Smooth continuous movement
           from closed → fully open.
        ================================= */

        @keyframes curtain-right-open {
          from {
            transform:
              translate3d(0, 0, 0)
              rotateY(0deg)
              rotateZ(0deg)
              scaleX(1);
          }

          to {
            transform:
              translate3d(103%, 0, 0)
              rotateY(-40deg)
              rotateZ(0deg)
              scaleX(0.06);
          }
        }

        /* =================================
           SUBTLE FABRIC MOVEMENT
        ================================= */

        @keyframes fabric-wave {
          0% {
            transform:
              translateX(-3px)
              scaleX(0.995);
          }

          50% {
            transform:
              translateX(3px)
              scaleX(1.01);
          }

          100% {
            transform:
              translateX(-2px)
              scaleX(1);
          }
        }

        /* =================================
           LIGHT FLOW
        ================================= */

        @keyframes light-flow {
          0% {
            transform: translateX(-4%);
            opacity: 0.45;
          }

          50% {
            transform: translateX(4%);
            opacity: 0.8;
          }

          100% {
            transform: translateX(-2%);
            opacity: 0.6;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .curtain-wrap {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
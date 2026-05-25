"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  type SpringOptions,
} from "framer-motion";

/* ============================================================
   CursorGlow
   Custom cursor with two layers:
     1. A small cream dot (6 px) that follows the pointer tightly
        via stiff spring physics.
     2. A larger halo ring (40 px) that trails behind on softer
        springs and expands / gains a gold border when hovering
        over interactive elements (buttons, links, [data-cursor]).

   Only active on pointer devices (hover: hover). Hides the
   native OS cursor via globals.css `cursor: none` on html.
   ============================================================ */

/* Spring configs */
const DOT_SPRING: SpringOptions = {
  stiffness: 700,
  damping: 38,
  mass: 0.4,
};

const HALO_SPRING: SpringOptions = {
  stiffness: 160,
  damping: 22,
  mass: 0.7,
};

/* Size tokens */
const DOT_SIZE = 6;
const HALO_SIZE_DEFAULT = 40;
const HALO_SIZE_HOVER = 72;

/* Colours */
const COLOR_DOT = "#F5EDE0"; // warm cream
const COLOR_HALO_DEFAULT = "rgba(237, 224, 204, 0.08)";
const COLOR_HALO_HOVER = "rgba(124, 72, 40, 0.15)";
const COLOR_BORDER_DEFAULT = "rgba(237, 224, 204, 0.25)";
const COLOR_BORDER_HOVER = "#7C4828"; // muted gold

/* Interactive selectors that trigger the expanded cursor state */
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor]';

export function CursorGlow() {
  /* Raw mouse coordinates (updated every mousemove) */
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  /* Dot follows mouse tightly */
  const dotX = useSpring(mouseX, DOT_SPRING);
  const dotY = useSpring(mouseY, DOT_SPRING);

  /* Halo lags behind on softer springs */
  const haloX = useSpring(mouseX, HALO_SPRING);
  const haloY = useSpring(mouseY, HALO_SPRING);

  /* Hover state */
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  /* Track whether we're inside the window */
  const isInsideRef = useRef(false);

  /* ---- Detect pointer / hover capability ---- */
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsPointerDevice(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  /* ---- Mouse tracking ---- */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isInsideRef.current) {
        isInsideRef.current = true;
        setIsVisible(true);
      }

      /* Check if the target (or any ancestor) is interactive */
      const target = e.target as Element | null;
      if (target) {
        const interactive = target.closest(INTERACTIVE_SELECTOR) !== null;
        setIsHovering(interactive);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    isInsideRef.current = false;
    setIsVisible(false);
    setIsHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    isInsideRef.current = true;
    setIsVisible(true);
  }, []);

  /* Attach/detach global listeners */
  useEffect(() => {
    if (!isPointerDevice) return;

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isPointerDevice, handleMouseMove, handleMouseLeave, handleMouseEnter]);

  /* Don't render on touch-only / non-pointer devices */
  if (!isPointerDevice) return null;

  const haloSize = isHovering ? HALO_SIZE_HOVER : HALO_SIZE_DEFAULT;

  return (
    <>
      {/* ---- Halo ring (slower, larger, expands on hover) ---- */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: haloX,
          y: haloY,
          /* Centre the ring on the cursor */
          translateX: "-50%",
          translateY: "-50%",
          width: haloSize,
          height: haloSize,
          borderRadius: "50%",
          backgroundColor: isHovering ? COLOR_HALO_HOVER : COLOR_HALO_DEFAULT,
          border: `1px solid ${isHovering ? COLOR_BORDER_HOVER : COLOR_BORDER_DEFAULT}`,
          pointerEvents: "none",
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          backdropFilter: isHovering ? "blur(1px)" : "none",
        }}
        animate={{
          width: haloSize,
          height: haloSize,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? COLOR_HALO_HOVER : COLOR_HALO_DEFAULT,
          borderColor: isHovering ? COLOR_BORDER_HOVER : COLOR_BORDER_DEFAULT,
        }}
        transition={{
          width: { type: "spring", stiffness: 260, damping: 24 },
          height: { type: "spring", stiffness: 260, damping: 24 },
          opacity: { duration: 0.2 },
          backgroundColor: { duration: 0.25 },
          borderColor: { duration: 0.25 },
        }}
      />

      {/* ---- Dot (fast, tight, blends with background) ---- */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: "50%",
          backgroundColor: COLOR_DOT,
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.6 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { type: "spring", stiffness: 400, damping: 22 },
        }}
      />
    </>
  );
}

'use client';

import React, { useRef, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from 'framer-motion';

/* ============================================================
   Types
   ============================================================ */

export interface MagneticButtonProps {
  children: React.ReactNode;
  /** Additional class names applied to the motion wrapper */
  className?: string;
  /**
   * Maximum pixel offset the element can move toward the cursor.
   * @default 20
   */
  maxOffset?: number;
  /**
   * Multiplier controlling how strongly the element follows the cursor.
   * Lower = subtler. Range: 0 – 1.
   * @default 0.35
   */
  strength?: number;
  /**
   * Framer Motion spring config for the follow animation.
   */
  springConfig?: SpringOptions;
  /**
   * Framer Motion spring config for the return-to-center animation
   * when the cursor leaves. Defaults to a slightly softer spring.
   */
  returnSpringConfig?: SpringOptions;
}

/* ============================================================
   Default spring configs
   ============================================================ */

const DEFAULT_SPRING: SpringOptions = {
  stiffness: 220,
  damping: 20,
  mass: 0.5,
};

const DEFAULT_RETURN_SPRING: SpringOptions = {
  stiffness: 160,
  damping: 22,
  mass: 0.5,
};

/* ============================================================
   MagneticButton
   ============================================================ */

/**
 * Wraps its children in a magnetic element that moves toward
 * the cursor while hovered and springs back to center on leave.
 *
 * Uses Framer Motion `useMotionValue` + `useSpring` for buttery
 * smooth physics-based motion — no state, no re-renders.
 *
 * ```tsx
 * <MagneticButton>
 *   <Button variant="primary">Shop Now</Button>
 * </MagneticButton>
 * ```
 */
export default function MagneticButton({
  children,
  className = '',
  maxOffset = 20,
  strength = 0.35,
  springConfig = DEFAULT_SPRING,
  returnSpringConfig = DEFAULT_RETURN_SPRING,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Raw motion values — updated directly from mouse events (no re-render) */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /* Springified values for smooth physics */
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  /* Separate return springs (softer bounce on mouse leave) */
  const returnX = useSpring(rawX, returnSpringConfig);
  const returnY = useSpring(rawY, returnSpringConfig);

  /* Track whether we're hovering to decide which spring to use */
  const isHovering = useRef(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      /* Offset clamped to maxOffset */
      const deltaX = Math.max(
        -maxOffset,
        Math.min(maxOffset, (e.clientX - centerX) * strength),
      );
      const deltaY = Math.max(
        -maxOffset,
        Math.min(maxOffset, (e.clientY - centerY) * strength),
      );

      rawX.set(deltaX);
      rawY.set(deltaY);
    },
    [maxOffset, rawX, rawY, strength],
  );

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    /* Spring back to center */
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x,
        y,
        display: 'inline-block',
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

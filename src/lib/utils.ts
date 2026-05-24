import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* ============================================================
   cn — Class Name Utility
   Merges clsx conditional classes with tailwind-merge so that
   later Tailwind classes properly override earlier ones.
   ============================================================ */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/* ============================================================
   lerp — Linear Interpolation
   Returns the value between `start` and `end` at position `t`
   where t is expected to be in [0, 1].

   @example
     lerp(0, 100, 0.5) // → 50
     lerp(200, 400, 0.25) // → 250
   ============================================================ */
export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

/* ============================================================
   clamp — Numeric Clamp
   Constrains `value` so it is never less than `min` or greater
   than `max`.

   @example
     clamp(150, 0, 100) // → 100
     clamp(-5, 0, 100)  // → 0
     clamp(42, 0, 100)  // → 42
   ============================================================ */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

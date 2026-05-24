"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   LoadingScreen
   Full-screen branded loading experience.
   - Espresso brown background (#3B2A21)
   - Animated HIMA BEANS logotype in Playfair Display (cream)
   - Tagline fades in after the logotype settles
   - Gold progress bar tracks to 100 %
   - Entire screen slides upward off-canvas after 2.5 s
   - Once the exit animation ends the component is unmounted
   ============================================================ */

/* Stagger container — children animate in sequence */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

/* Each letter of the logotype drops in from below */
const letterVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number,number,number,number], // easeOutQuint
    },
  },
};

/* Tagline fades up after logo settles */
const taglineVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 1.05,
      ease: [0.22, 1, 0.36, 1] as [number,number,number,number],
    },
  },
};

/* Progress line fills left-to-right */
const progressVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 2.0,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1] as [number,number,number,number],
    },
  },
};

/* Slide-up exit for the entire overlay */
const overlayExitVariants = {
  exit: {
    y: "-100%",
    transition: {
      duration: 0.85,
      ease: [0.76, 0, 0.24, 1] as [number,number,number,number], // easeInOutQuart
    },
  },
};

const LOGOTYPE = "HIMA BEANS";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  /* Dismiss the loading screen after 2.5 seconds */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          variants={overlayExitVariants}
          exit="exit"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "#3B2A21",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* ---- Subtle grain overlay (matches body::before aesthetic) ---- */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
              backgroundSize: "200px 200px",
              opacity: 0.045,
              mixBlendMode: "overlay",
              pointerEvents: "none",
            }}
          />

          {/* ---- Decorative rings ---- */}
          <div
            style={{
              position: "absolute",
              width: 480,
              height: 480,
              borderRadius: "50%",
              border: "1px solid rgba(176, 141, 87, 0.12)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              border: "1px solid rgba(176, 141, 87, 0.08)",
              pointerEvents: "none",
            }}
          />

          {/* ---- Main content block ---- */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Overline label */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.4em" }}
              animate={{ opacity: 0.45, letterSpacing: "0.5em" }}
              transition={{ duration: 1.0, delay: 0.15, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-sans, Inter, system-ui, sans-serif)",
                fontSize: "0.65rem",
                fontWeight: 500,
                color: "#B08D57",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Specialty Coffee
            </motion.p>

            {/* Logotype — letter by letter */}
            <div
              style={{
                overflow: "hidden",
                paddingBottom: "0.1em",
              }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                  display: "flex",
                  gap: "0.04em",
                  fontFamily:
                    "var(--font-playfair, 'Playfair Display', Georgia, serif)",
                  fontSize: "clamp(2.8rem, 8vw, 5rem)",
                  fontWeight: 700,
                  color: "#F5EFE6",
                  letterSpacing: "0.08em",
                  lineHeight: 1.1,
                }}
              >
                {LOGOTYPE.split("").map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    variants={letterVariants}
                    style={{
                      display: "inline-block",
                      /* Preserve space characters */
                      whiteSpace: "pre",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.p
              variants={taglineVariants}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: "var(--font-sans, Inter, system-ui, sans-serif)",
                fontSize: "0.78rem",
                fontWeight: 400,
                color: "rgba(245, 239, 230, 0.55)",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                marginTop: "1rem",
              }}
            >
              Crafted Above the Clouds
            </motion.p>

            {/* Progress bar */}
            <div
              style={{
                width: "min(260px, 60vw)",
                height: 1,
                backgroundColor: "rgba(176, 141, 87, 0.2)",
                marginTop: "2.5rem",
                borderRadius: 9999,
                overflow: "hidden",
              }}
            >
              <motion.div
                variants={progressVariants}
                initial="hidden"
                animate="visible"
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#B08D57",
                  borderRadius: 9999,
                  transformOrigin: "left center",
                }}
              />
            </div>
          </div>

          {/* ---- Bottom wordmark ---- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            style={{
              position: "absolute",
              bottom: "2rem",
              fontFamily: "var(--font-sans, Inter, system-ui, sans-serif)",
              fontSize: "0.6rem",
              fontWeight: 500,
              color: "#F5EFE6",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            himabeans.com.au
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const ESPRESSO   = '#3B2A21';
const WARM_CREAM = '#F5EFE6';
const MUTED_GOLD = '#B08D57';
const SOFT_BEIGE = '#E6D8C9';
const CHARCOAL   = '#222222';
const STONE      = '#8C8477';

// ─────────────────────────────────────────────────────────────────────────────
// Steam warp paths (looping CSS keyframes, 3 wisps)
// ─────────────────────────────────────────────────────────────────────────────

function SteamWisps({ visible }: { visible: boolean }) {
  return (
    <g
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.2s ease',
      }}
      aria-hidden="true"
    >
      {/* Warp 1 – left */}
      <path
        className="steam-warp steam-warp-1"
        d="M 174 148 C 170 140, 178 132, 173 124 C 168 116, 176 108, 172 100"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      {/* Warp 2 – centre */}
      <path
        className="steam-warp steam-warp-2"
        d="M 200 142 C 196 134, 204 126, 199 118 C 194 110, 202 102, 198 94"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Warp 3 – right */}
      <path
        className="steam-warp steam-warp-3"
        d="M 227 148 C 223 140, 231 132, 226 124 C 221 116, 229 108, 224 100"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      {/* Warp 4 – far-left subtle */}
      <path
        className="steam-warp steam-warp-4"
        d="M 155 152 C 152 144, 158 136, 154 128 C 150 120, 156 112, 153 104"
        stroke="white"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export default function CoffeePourAnimation() {
  const sectionRef    = useRef<HTMLElement>(null);
  const svgRef        = useRef<SVGSVGElement>(null);

  // GSAP targets
  const cupGroupRef   = useRef<SVGGElement>(null);
  const streamRef     = useRef<SVGGElement>(null);
  const fillRectRef   = useRef<SVGRectElement>(null);
  const surfaceRef    = useRef<SVGEllipseElement>(null);
  const dropletRef    = useRef<SVGEllipseElement>(null);
  const labelRef      = useRef<HTMLParagraphElement>(null);
  const altitudeRef   = useRef<HTMLDivElement>(null);
  const watermarkRef  = useRef<HTMLHeadingElement>(null);

  const [steamVisible, setSteamVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Master timeline — scrubbed by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: false, // sticky is handled via CSS
          onUpdate: (self) => {
            // Steam appears when fill > ~50%  (progress 0.4→0.8 maps fill)
            // fill starts at progress 0.40 and is done at 0.80
            const fillProgress = Math.max(0, (self.progress - 0.4) / 0.4); // 0→1 during 40-80%
            setSteamVisible(fillProgress >= 0.5);
          },
        },
      });

      // ── 0-15% Cup fades / scales in ──────────────────────────────────────
      tl.fromTo(
        cupGroupRef.current,
        { autoAlpha: 0, y: 30, scale: 0.92, transformOrigin: '50% 50%' },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.15, ease: 'power2.out' },
        0,
      );

      // Watermark fades in during cup reveal
      tl.fromTo(
        watermarkRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 0.04, duration: 0.15, ease: 'power1.in' },
        0,
      );

      // ── 15-40% Pour stream appears ────────────────────────────────────────
      tl.fromTo(
        streamRef.current,
        { autoAlpha: 0, scaleY: 0, transformOrigin: '50% 0%' },
        { autoAlpha: 1, scaleY: 1, duration: 0.25, ease: 'power2.inOut' },
        0.15,
      );

      // ── 40-80% Coffee fills cup (clipPath rect rises) ─────────────────────
      // fillRect y goes from 220 (bottom of interior) up to 155 (full)
      // We animate a CSS variable that drives the rect
      tl.fromTo(
        fillRectRef.current,
        { attr: { y: 220 } },
        { attr: { y: 155 }, duration: 0.4, ease: 'power1.inOut' },
        0.4,
      );

      // Surface ellipse follows the top of the fill
      tl.fromTo(
        surfaceRef.current,
        { attr: { cy: 220 } },
        { attr: { cy: 155 }, duration: 0.4, ease: 'power1.inOut' },
        0.4,
      );

      // ── 80-90% Stream tapers off, cup full ───────────────────────────────
      tl.to(
        streamRef.current,
        { autoAlpha: 0, scaleY: 0.1, transformOrigin: '50% 0%', duration: 0.1, ease: 'power2.in' },
        0.80,
      );

      // Tiny ripple pulse on the surface (scale x slightly)
      tl.to(
        surfaceRef.current,
        {
          attr: { rx: 38 },
          duration: 0.03,
          yoyo: true,
          repeat: 3,
          ease: 'sine.inOut',
        },
        0.81,
      );

      // Droplet splash fades in briefly
      tl.fromTo(
        dropletRef.current,
        { autoAlpha: 0, attr: { ry: 0 } },
        { autoAlpha: 0.6, attr: { ry: 3 }, duration: 0.04, ease: 'power2.out' },
        0.81,
      );
      tl.to(
        dropletRef.current,
        { autoAlpha: 0, duration: 0.05, ease: 'power2.in' },
        0.85,
      );

      // ── 90-100% Altitude text reveals ────────────────────────────────────
      tl.fromTo(
        altitudeRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.10, ease: 'power2.out' },
        0.90,
      );

    }, section);

    return () => ctx.revert();
  }, []);

  // ── Label text driven by scroll progress ─────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    if (!section || !label) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress;
        if (p < 0.15)        label.textContent = 'Preparing…';
        else if (p < 0.40)   label.textContent = 'Pouring…';
        else if (p < 0.70)   label.textContent = 'Filling…';
        else if (p < 0.88)   label.textContent = 'Almost ready…';
        else                  label.textContent = 'Ready to serve';
      },
    });

    return () => st.kill();
  }, []);

  return (
    <>
      {/* ── CSS for steam animation & stream shimmer ── */}
      <style>{`
        @keyframes steamRise1 {
          0%   { stroke-dashoffset: 80; opacity: 0; }
          15%  { opacity: 0.55; }
          85%  { opacity: 0.55; }
          100% { stroke-dashoffset: -80; opacity: 0; }
        }
        @keyframes steamRise2 {
          0%   { stroke-dashoffset: 80; opacity: 0; }
          15%  { opacity: 0.7; }
          85%  { opacity: 0.7; }
          100% { stroke-dashoffset: -80; opacity: 0; }
        }
        @keyframes steamRise3 {
          0%   { stroke-dashoffset: 80; opacity: 0; }
          15%  { opacity: 0.55; }
          85%  { opacity: 0.55; }
          100% { stroke-dashoffset: -80; opacity: 0; }
        }
        @keyframes steamRise4 {
          0%   { stroke-dashoffset: 60; opacity: 0; }
          15%  { opacity: 0.3; }
          85%  { opacity: 0.3; }
          100% { stroke-dashoffset: -60; opacity: 0; }
        }
        @keyframes streamShimmer {
          0%, 100% { opacity: 0.85; }
          50%       { opacity: 1; }
        }
        @keyframes surfaceShine {
          0%, 100% { rx: 30px; opacity: 0.18; }
          50%       { rx: 33px; opacity: 0.24; }
        }

        .steam-warp-1 {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: steamRise1 3.2s ease-in-out infinite;
        }
        .steam-warp-2 {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: steamRise2 3.2s ease-in-out 0.8s infinite;
        }
        .steam-warp-3 {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: steamRise3 3.2s ease-in-out 1.6s infinite;
        }
        .steam-warp-4 {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: steamRise4 3.8s ease-in-out 0.4s infinite;
        }
        .pour-stream {
          animation: streamShimmer 1.4s ease-in-out infinite;
        }
        .coffee-surface-shine {
          animation: surfaceShine 2s ease-in-out infinite;
        }
      `}</style>

      {/* ── Section: 400vh scrollable space ── */}
      <section
        ref={sectionRef}
        style={{
          height: '400vh',
          position: 'relative',
          backgroundColor: WARM_CREAM,
        }}
        aria-label="Coffee pour animation"
      >
        {/* ── Sticky viewport ── */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '0 1rem',
          }}
        >
          {/* Watermark */}
          <h2
            ref={watermarkRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 'clamp(5rem, 18vw, 14rem)',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: CHARCOAL,
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: '100vw',
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
            aria-hidden="true"
          >
            The Journey
          </h2>

          {/* ── Coffee Cup SVG ─────────────────────────────────────────── */}
          <svg
            ref={svgRef}
            viewBox="0 0 400 400"
            width="min(420px, 90vw)"
            height="min(420px, 90vw)"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Premium ceramic coffee cup filling with coffee"
            style={{ display: 'block', zIndex: 2, position: 'relative' }}
          >
            <defs>
              {/* ── Clip path for coffee fill ── */}
              <clipPath id="coffee-fill-clip">
                {/*
                  Interior cup shape as a clipping region.
                  The rect rises from y=220 (bottom interior) to y=155 (full).
                  We clip to the actual cup interior shape.
                */}
                <path d="M 158 155 Q 155 230 163 242 Q 185 258 200 258 Q 215 258 237 242 Q 245 230 242 155 Z" />
              </clipPath>

              {/* ── Clip path combining fill rect + cup interior ── */}
              <clipPath id="coffee-level-clip">
                <rect
                  ref={fillRectRef}
                  id="fill-level-rect"
                  x="140"
                  y="220"
                  width="120"
                  height="120"
                />
              </clipPath>

              {/* ── Coffee liquid gradient ── */}
              <linearGradient id="coffee-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#2A1C14" />
                <stop offset="40%"  stopColor={ESPRESSO} />
                <stop offset="75%"  stopColor="#5C3D28" />
                <stop offset="100%" stopColor="#2A1C14" />
              </linearGradient>

              {/* ── Cup ceramic gradient ── */}
              <linearGradient id="cup-body-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#D9CBB8" />
                <stop offset="30%"  stopColor={WARM_CREAM} />
                <stop offset="70%"  stopColor="#EDE4D7" />
                <stop offset="100%" stopColor="#C8BAA8" />
              </linearGradient>

              {/* ── Saucer gradient ── */}
              <linearGradient id="saucer-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#EDE4D7" />
                <stop offset="100%" stopColor="#C9BAA6" />
              </linearGradient>

              {/* ── Pour stream gradient ── */}
              <linearGradient id="stream-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={ESPRESSO} stopOpacity="0.9" />
                <stop offset="60%"  stopColor="#5C3D28"  stopOpacity="0.85" />
                <stop offset="100%" stopColor={ESPRESSO} stopOpacity="0.7" />
              </linearGradient>

              {/* ── Handle shadow / depth ── */}
              <radialGradient id="handle-inner" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#D9CBB8" />
                <stop offset="100%" stopColor="#B5A592" />
              </radialGradient>

              {/* ── Cup interior shadow ── */}
              <linearGradient id="interior-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#C0B09C" stopOpacity="0.7" />
                <stop offset="50%"  stopColor="#E8DDD0" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#A89580" stopOpacity="0.7" />
              </linearGradient>

              {/* ── Coffee surface reflection ── */}
              <radialGradient id="surface-shine-grad" cx="45%" cy="40%" r="55%">
                <stop offset="0%"   stopColor="#A0684A" stopOpacity="0.8" />
                <stop offset="100%" stopColor={ESPRESSO} stopOpacity="0" />
              </radialGradient>

              {/* ── Soft drop shadow filter ── */}
              <filter id="cup-shadow" x="-20%" y="-20%" width="140%" height="160%">
                <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor={ESPRESSO} floodOpacity="0.18" />
              </filter>

              {/* ── Subtle glow for stream ── */}
              <filter id="stream-glow" x="-60%" y="-10%" width="220%" height="120%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* ── Rim highlight ── */}
              <linearGradient id="rim-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#B5A592" />
                <stop offset="35%"  stopColor={WARM_CREAM} />
                <stop offset="65%"  stopColor="#EDE4D7" />
                <stop offset="100%" stopColor="#B5A592" />
              </linearGradient>
            </defs>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* Main cup group — fades/scales in during 0-15%             */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <g ref={cupGroupRef} opacity="0">

              {/* ── Saucer ─────────────────────────────────────────────── */}
              <g filter="url(#cup-shadow)">
                {/* Saucer base ellipse */}
                <ellipse cx="200" cy="296" rx="80" ry="12" fill="url(#saucer-grad)" />
                {/* Saucer rim highlight */}
                <ellipse cx="200" cy="293" rx="80" ry="9" fill="none" stroke={WARM_CREAM} strokeWidth="1.5" opacity="0.6" />
                {/* Saucer inner ring indent */}
                <ellipse cx="200" cy="295" rx="36" ry="4.5" fill="none" stroke="#C0B09C" strokeWidth="1" opacity="0.7" />
                {/* Saucer top face */}
                <ellipse cx="200" cy="286" rx="78" ry="10" fill="#EDE4D7" />
                <ellipse cx="200" cy="284" rx="76" ry="8.5" fill={WARM_CREAM} opacity="0.4" />
              </g>

              {/* ── Cup body ───────────────────────────────────────────── */}
              <g filter="url(#cup-shadow)">
                {/*
                  Cup outer silhouette:
                  top opening ~rx=46, y=158
                  widens slightly to base ~rx=42, y=282
                  Ceramic cup with slight taper
                */}
                {/* Back of cup (darker, depth) */}
                <path
                  d="
                    M 154 160
                    Q 152 220 158 255
                    Q 172 284 200 284
                    Q 228 284 242 255
                    Q 248 220 246 160
                    Z
                  "
                  fill="#D2C2AF"
                />
                {/* Main cup body */}
                <path
                  d="
                    M 156 162
                    Q 154 222 160 256
                    Q 174 283 200 283
                    Q 226 283 240 256
                    Q 246 222 244 162
                    Z
                  "
                  fill="url(#cup-body-grad)"
                />
                {/* Inner side shading for depth */}
                <path
                  d="
                    M 160 163
                    Q 158 220 163 253
                    Q 176 280 200 280
                    Q 224 280 237 253
                    Q 242 220 240 163
                    Z
                  "
                  fill="url(#interior-grad)"
                />

                {/* ── Coffee fill (clipped) ── */}
                <g clipPath="url(#coffee-fill-clip)">
                  <g clipPath="url(#coffee-level-clip)">
                    {/* Coffee body */}
                    <path
                      d="M 158 155 Q 155 230 163 242 Q 185 258 200 258 Q 215 258 237 242 Q 245 230 242 155 Z"
                      fill="url(#coffee-grad)"
                    />
                    {/* Coffee surface reflection overlay */}
                    <ellipse
                      cx="200"
                      cy="155"
                      rx="42"
                      ry="8"
                      fill="url(#surface-shine-grad)"
                      opacity="0.35"
                      className="coffee-surface-shine"
                    />
                  </g>
                </g>

                {/* Coffee top surface ellipse (tracks fill level) */}
                <ellipse
                  ref={surfaceRef}
                  id="coffee-surface"
                  cx="200"
                  cy="220"
                  rx="35"
                  ry="6"
                  fill={ESPRESSO}
                  style={{ display: 'none' }}
                />

                {/* ── Ripple droplet on surface ── */}
                <ellipse
                  ref={dropletRef}
                  cx="200"
                  cy="156"
                  rx="8"
                  ry="0"
                  fill="none"
                  stroke={MUTED_GOLD}
                  strokeWidth="1"
                  opacity="0"
                />

                {/* Cup top opening ellipse (rim) */}
                <ellipse
                  cx="200"
                  cy="162"
                  rx="44"
                  ry="9"
                  fill="#C8BAA8"
                />
                <ellipse
                  cx="200"
                  cy="160"
                  rx="43"
                  ry="8"
                  fill="url(#rim-grad)"
                />
                {/* Inner rim dark recess */}
                <ellipse
                  cx="200"
                  cy="161"
                  rx="36"
                  ry="6"
                  fill="#7A6352"
                  opacity="0.18"
                />

                {/* Highlight stripe on cup body */}
                <path
                  d="M 176 168 Q 174 220 177 255"
                  stroke={WARM_CREAM}
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.22"
                />
                <path
                  d="M 182 168 Q 180 220 183 254"
                  stroke={WARM_CREAM}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.14"
                />
              </g>

              {/* ── Handle ─────────────────────────────────────────────── */}
              <g filter="url(#cup-shadow)">
                {/* Outer handle shape */}
                <path
                  d="
                    M 240 185
                    C 268 185, 276 198, 276 218
                    C 276 238, 266 250, 240 250
                  "
                  stroke="#C8BAA8"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Inner handle cutout */}
                <path
                  d="
                    M 240 188
                    C 264 188, 270 200, 270 218
                    C 270 236, 262 247, 240 247
                  "
                  stroke={WARM_CREAM}
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.6"
                />
                {/* Handle shadow line */}
                <path
                  d="
                    M 240 193
                    C 260 193, 265 205, 265 218
                    C 265 231, 259 240, 240 242
                  "
                  stroke="#B5A592"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.45"
                />
              </g>

              {/* ── Steam wisps (appear when >50% full) ── */}
              <SteamWisps visible={steamVisible} />

              {/* ── Pour stream ─────────────────────────────────────────── */}
              <g ref={streamRef} opacity="0" filter="url(#stream-glow)">
                {/*
                  Stream originates from ~x=200, y=30 (from above viewport edge)
                  Thin at top, widens and distorts just before entering cup
                */}
                {/* Main stream body */}
                <path
                  className="pour-stream"
                  d="
                    M 198 20
                    C 198 60, 199 100, 200 130
                    C 200.5 140, 201 148, 202 158
                  "
                  stroke="url(#stream-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Stream widening near cup */}
                <path
                  d="
                    M 196 130
                    C 196 138, 194 148, 193 158
                    M 204 130
                    C 204 138, 206 148, 207 158
                  "
                  stroke={ESPRESSO}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.5"
                />
                {/* Subtle stream shimmer line */}
                <path
                  d="M 199 20 C 199 60, 199.5 100, 200 140"
                  stroke="#7A5035"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.4"
                />
                {/* Impact splash at cup entry */}
                <ellipse
                  cx="200"
                  cy="160"
                  rx="5"
                  ry="2"
                  fill={ESPRESSO}
                  opacity="0.6"
                />
                <ellipse
                  cx="200"
                  cy="160"
                  rx="10"
                  ry="3"
                  fill="none"
                  stroke={ESPRESSO}
                  strokeWidth="0.8"
                  opacity="0.3"
                />
              </g>

              {/* ── HIMA BEANS subtle branding on cup ── */}
              <text
                x="200"
                y="232"
                textAnchor="middle"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontSize="8"
                fill={STONE}
                letterSpacing="3"
                opacity="0.55"
                style={{ userSelect: 'none' }}
              >
                HIMA BEANS
              </text>
              <line
                x1="176"
                y1="237"
                x2="224"
                y2="237"
                stroke={STONE}
                strokeWidth="0.5"
                opacity="0.35"
              />

            </g>
            {/* end cup group */}
          </svg>
          {/* end SVG */}

          {/* ── Progress label ─────────────────────────────────────────── */}
          <p
            ref={labelRef}
            style={{
              position: 'absolute',
              bottom: '10vh',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: STONE,
              opacity: 0.75,
              zIndex: 5,
              whiteSpace: 'nowrap',
              maxWidth: '90vw',
              textAlign: 'center',
            }}
            aria-live="polite"
          >
            Preparing…
          </p>

          {/* ── Progress bar ───────────────────────────────────────────── */}
          <div
            style={{
              position: 'absolute',
              bottom: '8.5vh',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'clamp(80px, 12vw, 120px)',
              height: '1px',
              backgroundColor: SOFT_BEIGE,
              zIndex: 5,
            }}
          >
            <div
              id="progress-bar-fill"
              style={{
                height: '100%',
                width: '0%',
                backgroundColor: MUTED_GOLD,
                transition: 'width 0.1s linear',
              }}
            />
          </div>

          {/* ── Altitude reveal text ───────────────────────────────────── */}
          <div
            ref={altitudeRef}
            style={{
              position: 'absolute',
              top: '12vh',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              opacity: 0,
              zIndex: 5,
              pointerEvents: 'none',
            }}
          >
            <p
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: MUTED_GOLD,
                marginBottom: '0.4em',
              }}
            >
              Origin
            </p>
            <p
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                letterSpacing: '0.1em',
                color: ESPRESSO,
                fontStyle: 'italic',
              }}
            >
              Sourced from 2000m above sea level
            </p>
            <div
              style={{
                width: '2px',
                height: 'clamp(24px, 3vw, 36px)',
                backgroundColor: MUTED_GOLD,
                margin: '1em auto 0',
                opacity: 0.5,
              }}
            />
          </div>

          {/* ── Decorative corner marks ────────────────────────────────── */}
          {[
            { top: '5vh',   left: '5vw',  borderTop: `1px solid ${MUTED_GOLD}`,  borderLeft:  `1px solid ${MUTED_GOLD}` },
            { top: '5vh',   right: '5vw', borderTop: `1px solid ${MUTED_GOLD}`,  borderRight: `1px solid ${MUTED_GOLD}` },
            { bottom: '5vh', left: '5vw', borderBottom: `1px solid ${MUTED_GOLD}`, borderLeft: `1px solid ${MUTED_GOLD}` },
            { bottom: '5vh', right: '5vw', borderBottom: `1px solid ${MUTED_GOLD}`, borderRight: `1px solid ${MUTED_GOLD}` },
          ].map((style, i) => (
            <div
              key={i}
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: 'clamp(16px, 2.5vw, 28px)',
                height: 'clamp(16px, 2.5vw, 28px)',
                opacity: 0.35,
                ...style,
              }}
            />
          ))}
        </div>
        {/* end sticky */}
      </section>

      {/* ── Progress bar scroll sync (lightweight inline script) ── */}
      <ProgressBarSync />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tiny client component: syncs the gold progress bar to scroll
// ─────────────────────────────────────────────────────────────────────────────

function ProgressBarSync() {
  useEffect(() => {
    // Grab the bar from the DOM (rendered above)
    const bar = document.getElementById('progress-bar-fill') as HTMLDivElement | null;
    if (!bar) return;

    const section = document.querySelector<HTMLElement>('[aria-label="Coffee pour animation"]');
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        bar.style.width = `${self.progress * 100}%`;
      },
    });

    return () => st.kill();
  }, []);

  return null;
}

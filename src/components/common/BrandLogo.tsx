/**
 * BrandLogo — Inline reproduction of the Eva's Garden brand identity
 *
 * Template reference: gold calligraphy on navy background
 *   • Butterfly / floral ornament at top
 *   • "Eva's" in large gold script
 *   • "Garden" in larger gold script
 *   • Decorative divider with flourishes
 *   • Tagline: "A venue like no other."
 *   • Sub-tagline: "Timeless. Elegant. Breathtaking."
 *
 * Variants
 *   full    – complete stacked layout, used in hero / login splash
 *   badge   – navy-bg pill card (mark + text stacked), used in footer / admin sidebar
 *   nav     – horizontal tight layout (mark + "Eva's Garden" inline), used in header
 *   compact – mark only, used for favicon-like contexts
 */

import { useEffect } from 'react';

/* ─── Google Fonts (loaded once lazily) ─────────────────────────────────── */
let fontsLoaded = false;
function ensureFonts() {
  if (fontsLoaded || typeof document === 'undefined') return;
  fontsLoaded = true;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@1,400;1,600&display=swap';
  document.head.appendChild(link);
}

/* ─── Gold gradient colours ──────────────────────────────────────────────── */
const G1 = '#ffe580';   // highlight
const G2 = '#d4af37';   // midtone
const G3 = '#b8870f';   // shadow

/* ─── Butterfly / floral ornament SVG ───────────────────────────────────── */
function ButterflyMark({ size = 64 }: { size?: number }) {
  const id = 'bmg'; // gradient id
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={G1} />
          <stop offset="50%"  stopColor={G2} />
          <stop offset="100%" stopColor={G3} />
        </linearGradient>
        <filter id="bmglow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <g stroke={`url(#${id})`} strokeLinecap="round" strokeLinejoin="round"
         filter="url(#bmglow)">

        {/* ── top loop / teardrop ──────────────────────────── */}
        <path d="M40 4 C44 4 48 8 48 13 C48 18 44 21 40 21 C36 21 32 18 32 13 C32 8 36 4 40 4 Z"
              strokeWidth="1.4" />

        {/* ── left upper wing ─────────────────────────────── */}
        <path d="M38 19 C33 19 16 15 8 24 C4 30 16 39 34 31"
              strokeWidth="1.5" />
        {/* ── left lower curl ─────────────────────────────── */}
        <path d="M34 31 C27 35 22 44 30 47 C35 49 40 43 40 37"
              strokeWidth="1.2" />
        {/* ── left inner detail ────────────────────────────── */}
        <path d="M38 22 C32 23 22 22 16 27"
              strokeWidth="0.8" opacity="0.7" />

        {/* ── right upper wing (mirror) ─────────────────────── */}
        <path d="M42 19 C47 19 64 15 72 24 C76 30 64 39 46 31"
              strokeWidth="1.5" />
        {/* ── right lower curl ─────────────────────────────── */}
        <path d="M46 31 C53 35 58 44 50 47 C45 49 40 43 40 37"
              strokeWidth="1.2" />
        {/* ── right inner detail ───────────────────────────── */}
        <path d="M42 22 C48 23 58 22 64 27"
              strokeWidth="0.8" opacity="0.7" />

        {/* ── centre body ─────────────────────────────────── */}
        <path d="M40 21 L40 37"
              strokeWidth="1" />

        {/* ── tiny antennae dots ───────────────────────────── */}
        <circle cx="40" cy="3" r="1.2" fill={`url(#${id})`} strokeWidth="0" />
      </g>
    </svg>
  );
}

/* ─── Decorative divider ─────────────────────────────────────────────────── */
function Divider({ width = 180 }: { width?: number }) {
  return (
    <svg width={width} height="14" viewBox={`0 0 ${width} 14`} fill="none" aria-hidden>
      <line x1="0" y1="7" x2={width * 0.3} y2="7" stroke={G2} strokeWidth="0.8" opacity="0.6" />
      {/* centre flourish */}
      <path
        d={`M${width * 0.35} 7 C${width * 0.4} 3 ${width * 0.45} 1 ${width * 0.5} 7 C${width * 0.55} 13 ${width * 0.6} 11 ${width * 0.65} 7`}
        stroke={G2} strokeWidth="1.1" strokeLinecap="round" fill="none"
      />
      <line x1={width * 0.7} y1="7" x2={width} y2="7" stroke={G2} strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export type BrandVariant = 'full' | 'badge' | 'nav' | 'compact';

interface BrandLogoProps {
  variant?: BrandVariant;
  className?: string;
  /** Scale factor for size (1 = default) */
  scale?: number;
  /** Show the tagline lines (only applies to full / badge) */
  showTagline?: boolean;
}

export default function BrandLogo({
  variant = 'full',
  className = '',
  scale = 1,
  showTagline = true,
}: BrandLogoProps) {
  useEffect(() => { ensureFonts(); }, []);

  /* ── COMPACT: butterfly mark only ───────────────────────────────────────── */
  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}
            style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.6))' }}>
        <ButterflyMark size={Math.round(40 * scale)} />
      </span>
    );
  }

  /* ── NAV: mark + "Eva's Garden" side by side ─────────────────────────────── */
  if (variant === 'nav') {
    const markSize = Math.round(36 * scale);
    const fontSize = Math.round(22 * scale);
    return (
      <span
        className={`inline-flex items-center gap-2 select-none ${className}`}
        style={{ filter: 'drop-shadow(0 2px 12px rgba(212,175,55,0.45))' }}
      >
        <ButterflyMark size={markSize} />
        <span style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: fontSize,
          background: `linear-gradient(135deg, ${G1} 0%, ${G2} 50%, ${G3} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          letterSpacing: '0.02em',
        }}>
          Eva's Garden
        </span>
      </span>
    );
  }

  /* ── BADGE: navy card with stacked full layout ───────────────────────────── */
  if (variant === 'badge') {
    const markSize = Math.round(52 * scale);
    const evasSize = Math.round(32 * scale);
    const gardenSize = Math.round(42 * scale);
    const tagSize = Math.round(9.5 * scale);
    const subSize = Math.round(8.5 * scale);
    return (
      <span
        className={`inline-flex flex-col items-center justify-center select-none rounded-2xl px-5 py-4 ${className}`}
        style={{
          background: 'linear-gradient(160deg, #0d1b3e 0%, #091428 55%, #0a1832 100%)',
          boxShadow: '0 0 32px rgba(212,175,55,0.18), inset 0 1px 0 rgba(255,220,80,0.08)',
          border: '1px solid rgba(212,175,55,0.18)',
        }}
      >
        <ButterflyMark size={markSize} />
        <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: evasSize, lineHeight: 1, marginTop: 2,
          background: `linear-gradient(135deg, ${G1} 0%, ${G2} 55%, ${G3} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Eva's
        </span>
        <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: gardenSize, lineHeight: 1, marginTop: -6,
          background: `linear-gradient(135deg, ${G1} 0%, ${G2} 55%, ${G3} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Garden
        </span>
        {showTagline && (
          <>
            <Divider width={Math.round(120 * scale)} />
            <span style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontSize: tagSize, color: G2, fontStyle: 'italic', letterSpacing: '0.04em', marginTop: 1 }}>
              A venue like no other.
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontSize: subSize, color: G3, fontStyle: 'italic', fontWeight: 600, letterSpacing: '0.05em', marginTop: 2 }}>
              Timeless. Elegant. Breathtaking.
            </span>
          </>
        )}
      </span>
    );
  }

  /* ── FULL: large stacked brand card (hero/login) ─────────────────────────── */
  const markSize = Math.round(72 * scale);
  const evasSize = Math.round(52 * scale);
  const gardenSize = Math.round(70 * scale);
  const tagSize = Math.round(13 * scale);
  const subSize = Math.round(11.5 * scale);

  return (
    <span
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Butterfly ornament */}
      <span style={{ filter: 'drop-shadow(0 0 14px rgba(212,175,55,0.7))' }}>
        <ButterflyMark size={markSize} />
      </span>

      {/* "Eva's" */}
      <span
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: evasSize,
          lineHeight: 1,
          marginTop: 4,
          background: `linear-gradient(135deg, ${G1} 0%, ${G2} 50%, ${G3} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 2px 8px rgba(212,175,55,0.5))',
        }}
      >
        Eva's
      </span>

      {/* "Garden" */}
      <span
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: gardenSize,
          lineHeight: 1,
          marginTop: -10,
          background: `linear-gradient(135deg, ${G1} 0%, ${G2} 50%, ${G3} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 2px 12px rgba(212,175,55,0.55))',
        }}
      >
        Garden
      </span>

      {/* Divider */}
      {showTagline && (
        <>
          <span style={{ marginTop: 8 }}>
            <Divider width={Math.round(180 * scale)} />
          </span>

          {/* Tagline */}
          <span
            style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontSize: tagSize,
              color: G2,
              fontStyle: 'italic',
              letterSpacing: '0.06em',
              marginTop: 4,
              textShadow: '0 0 12px rgba(212,175,55,0.4)',
            }}
          >
            A venue like no other.
          </span>

          {/* Sub-tagline */}
          <span
            style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontSize: subSize,
              color: G3,
              fontStyle: 'italic',
              fontWeight: 600,
              letterSpacing: '0.08em',
              marginTop: 4,
            }}
          >
            Timeless. Elegant. Breathtaking.
          </span>
        </>
      )}
    </span>
  );
}

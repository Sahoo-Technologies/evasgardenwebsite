/**
 * AnimatedLogo — animated wrapper around BrandLogo
 *
 * Variants
 *   nav     → BrandLogo "nav"   (mark + inline text) with mouse 3D tilt + shimmer
 *   default → BrandLogo "badge" (compact navy card)   with gentle breathe + glow
 *   hero    → BrandLogo "badge" with sparks ring (used in Login / Admin splash)
 */

import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import BrandLogo from './BrandLogo';

interface AnimatedLogoProps {
  /** Kept for backward-compat — use scale instead for BrandLogo sizing */
  size?: string;
  /** Multiplier for BrandLogo (1 = default) */
  scale?: number;
  className?: string;
  /** hero = badge + sparks; nav = horizontal mark+text; default = badge gentle */
  variant?: 'hero' | 'nav' | 'default';
}

function Spark({ angle, radius, delay }: { angle: number; radius: number; delay: number }) {
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;
  return (
    <motion.span
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 3, height: 3, left: '50%', top: '50%', marginLeft: -1.5, marginTop: -1.5,
        background: 'radial-gradient(circle, #ffe580 0%, #d4af37 70%, transparent 100%)',
      }}
      animate={{
        x: [0, x * 1.25, x, x * 0.75, 0],
        y: [0, y * 1.25, y, y * 0.75, 0],
        opacity: [0, 0.95, 0.7, 0.35, 0],
        scale: [0.4, 1.5, 1.1, 0.7, 0.4],
      }}
      transition={{ duration: 3.8, delay, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
    />
  );
}

export default function AnimatedLogo({
  scale = 1,
  className = '',
  variant = 'default',
}: AnimatedLogoProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (variant === 'hero') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() { rawX.set(0); rawY.set(0); }

  const sparkAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  /* ── nav: horizontal compact with 3D tilt ───────────────────── */
  if (variant === 'nav') {
    return (
      <motion.div
        ref={ref}
        className={`relative inline-flex items-center justify-center select-none ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {/* shimmer sweep */}
        <motion.span className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg" aria-hidden>
          <motion.span
            className="absolute top-0 bottom-0 w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.38) 50%, transparent 100%)',
              left: '-40%',
            }}
            animate={{ left: ['-40%', '140%'] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
          />
        </motion.span>

        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BrandLogo variant="nav" scale={scale} />
        </motion.div>
      </motion.div>
    );
  }

  /* ── hero / default: badge card with glow + optional sparks ──── */
  return (
    <motion.div
      ref={ref}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      {/* ambient glow */}
      <motion.span
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          filter: 'blur(22px)',
          background: 'radial-gradient(circle, rgba(212,175,55,0.32) 0%, transparent 68%)',
        }}
        animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.82, 1.12, 0.82] }}
        transition={{ duration: variant === 'hero' ? 2.8 : 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <BrandLogo
          variant="badge"
          scale={scale}
          showTagline={variant === 'hero'}
        />
      </motion.div>

      {/* sparks ring for hero variant */}
      {variant === 'hero' &&
        sparkAngles.map((angle, i) => (
          <Spark key={angle} angle={angle} radius={90} delay={i * 0.4} />
        ))}
    </motion.div>
  );
}




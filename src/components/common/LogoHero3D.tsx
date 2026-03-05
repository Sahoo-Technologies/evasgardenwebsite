/**
 * LogoHero3D � cinematic 3D calligraphy logo for the hero section
 *
 * Technique:
 *  � CSS perspective container + translateZ depth layers = real extrusion depth
 *  � Auto Y-axis pendulum rotation (like a holographic coin)
 *  � Mouse hover overrides auto-rotation with 3D tilt tracking
 *  � mix-blend-mode: screen ? navy background dissolves on dark surfaces,
 *    leaving only the luminous gold calligraphy floating
 *  � Diagonal shimmer streak sweeps across calligraphy strokes
 *  � 12 orbiting gold sparks
 *
 * Image required:  public/logo-gold-full.png
 */

import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import BrandLogo from './BrandLogo';

// Shadow-only depth layers — kept very faint so only the front face is readable.
// These exist purely to cast a warm golden depth halo behind the text.
const LAYERS = [
  { z:  -6, opacity: 0.07, blur: 2.5 },
  { z: -14, opacity: 0.05, blur: 5.0 },
  { z: -22, opacity: 0.03, blur: 9.0 },
];

const SPARKS = Array.from({ length: 12 }, (_, i) => ({ angle: i * 30, delay: i * 0.3 }));

function Spark({ angle, delay }: { angle: number; delay: number }) {
  const r = 115;
  const x = Math.cos((angle * Math.PI) / 180) * r;
  const y = Math.sin((angle * Math.PI) / 180) * r;
  return (
    <motion.span
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 4, height: 4,
        left: '50%', top: '50%',
        marginLeft: -2, marginTop: -2,
        background: 'radial-gradient(circle, #ffe580 0%, #d4af37 55%, transparent 100%)',
      }}
      animate={{
        x:       [0, x * 0.55, x, x * 1.12,  x,  x * 0.55, 0],
        y:       [0, y * 0.55, y, y * 1.12,  y,  y * 0.55, 0],
        opacity: [0, 0.5,      1, 0.85,      0.5, 0.25,     0],
        scale:   [0, 1.1,  1.6, 1.2,       0.9,  0.4,      0],
      }}
      transition={{ duration: 4.8, delay, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
    />
  );
}

interface LogoHero3DProps {
  className?: string;
}

export default function LogoHero3D({ className = '' }: LogoHero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  const rotY = useMotionValue(0);
  const rotX = useMotionValue(0);
  const sRotY = useSpring(rotY, { stiffness: 28, damping: 10 });
  const sRotX = useSpring(rotX, { stiffness: 28, damping: 10 });

  // auto-pendulum rotation
  useEffect(() => {
    let dead = false;
    (async () => {
      while (!dead) {
        if (!isHovered.current) {
          await animate(rotY, 10,  { duration: 3.5, ease: 'easeInOut' });
          if (dead) break;
          await animate(rotX, 2.5, { duration: 1.5, ease: 'easeInOut' });
          if (dead) break;
          await animate(rotY, -10, { duration: 3.5, ease: 'easeInOut' });
          if (dead) break;
          await animate(rotX, -2.5,{ duration: 1.5, ease: 'easeInOut' });
        } else {
          await new Promise(r => setTimeout(r, 80));
        }
      }
    })();
    return () => { dead = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rotY.set(((e.clientX - rect.left) / rect.width  - 0.5) * 36);
    rotX.set(((e.clientY - rect.top)  / rect.height - 0.5) * -20);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onMouseEnter = () => { isHovered.current = true; };
  const onMouseLeave = () => { isHovered.current = false; rotY.set(0); rotX.set(0); };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ perspective: '900px' }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* ambient colossal glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '220%', height: '220%', top: '-60%', left: '-60%',
          background: 'radial-gradient(ellipse 55% 48% at 50% 58%, rgba(212,175,55,0.5) 0%, rgba(180,130,20,0.22) 38%, transparent 68%)',
          filter: 'blur(32px)',
        }}
        animate={{ opacity: [0.55, 1, 0.55], scale: [0.88, 1.06, 0.88] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 3D rotation group */}
      <motion.div style={{ rotateY: sRotY, rotateX: sRotX, transformStyle: 'preserve-3d', position: 'relative' }}>

        {/* back-to-front depth layers */}
        {[...LAYERS].reverse().map((layer, i) => (
          <div
            key={i}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            style={{
              transform: `translateZ(${layer.z}px)`,
              opacity: layer.opacity,
              filter: layer.blur > 0 ? `blur(${layer.blur}px)` : undefined,
            }}
          >
            <BrandLogo variant="full" scale={1} showTagline={false} />
          </div>
        ))}

        {/* front face — pulsing glow */}
        <motion.div
          style={{ transform: 'translateZ(22px)', position: 'relative' }}
          animate={{
            filter: [
              'drop-shadow(0 0 14px rgba(212,175,55,0.55))',
              'drop-shadow(0 0 42px rgba(212,175,55,1.0)) drop-shadow(0 0 18px rgba(255,240,90,0.9))',
              'drop-shadow(0 0 14px rgba(212,175,55,0.55))',
            ],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          <BrandLogo variant="full" scale={1} showTagline={false} />
        </motion.div>

        {/* diagonal shimmer streak */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ transform: 'translateZ(24px)', mixBlendMode: 'overlay' }}
        >
          <motion.div
            style={{
              position: 'absolute', top: 0, bottom: 0, width: '30%',
              background: 'linear-gradient(108deg, transparent 0%, rgba(255,255,180,0.5) 40%, rgba(255,255,255,0.82) 50%, rgba(255,255,180,0.5) 60%, transparent 100%)',
              left: '-40%',
            }}
            animate={{ left: ['-40%', '140%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4.2, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>

        {/* rim highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: 'translateZ(24px)',
            background: 'linear-gradient(160deg, rgba(255,240,140,0.12) 0%, transparent 55%, rgba(180,120,10,0.08) 100%)',
            mixBlendMode: 'overlay',
          }}
        />
      </motion.div>

      {/* orbiting sparks � always camera facing */}
      {SPARKS.map(({ angle, delay }) => <Spark key={angle} angle={angle} delay={delay} />)}
    </div>
  );
}

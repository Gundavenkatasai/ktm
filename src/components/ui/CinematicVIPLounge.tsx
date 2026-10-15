import React, { useEffect, useRef, useState, useCallback } from 'react';

export const CinematicVIPLounge: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [time, setTime] = useState(0);
  const rafRef = useRef<number>(0);
  const isActiveRef = useRef(false);

  // Smooth mouse parallax with lerp
  const targetMX = useRef(0);
  const targetMY = useRef(0);
  const currentMX = useRef(0);
  const currentMY = useRef(0);

  const updateProgress = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const totalScrollable = el.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;
    const scrolled = Math.max(0, -rect.top);
    setProgress(Math.min(1, scrolled / totalScrollable));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', onScroll);
  }, [updateProgress]);

  // Mouse parallax
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      targetMX.current = (e.clientX / window.innerWidth - 0.5) * 12;
      targetMY.current = (e.clientY / window.innerHeight - 0.5) * 7;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  // rAF loop for smooth animations
  useEffect(() => {
    let start: number | null = null;
    const tick = (t: number) => {
      if (!start) start = t;
      setTime((t - start) / 1000);

      // Lerp mouse for butter-smooth parallax
      currentMX.current += (targetMX.current - currentMX.current) * 0.04;
      currentMY.current += (targetMY.current - currentMY.current) * 0.04;
      setMouseX(currentMX.current);
      setMouseY(currentMY.current);

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Track if we're in the lounge section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { isActiveRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Entry fade: comes in from black after showroom exits
  const entryFade = Math.min(1, progress * 2.5);
  // Exit fade at bottom
  const exitFade = progress > 0.8 ? 1 - (progress - 0.8) / 0.2 : 1;
  const visibility = entryFade * exitFade;

  // Slow Ken Burns for lounge — very gentle
  const kbScale = 1.0 + time * 0.004;
  const kbX = Math.sin(time * 0.07) * 0.8;
  const kbY = Math.cos(time * 0.05) * 0.5;

  // Candle flicker — subtle intensity change
  const candleIntensity = 0.15 + Math.sin(time * 2.3) * 0.04 + Math.cos(time * 3.7) * 0.02;

  return (
    <section
      ref={sectionRef}
      id="vip-lounge"
      style={{
        position: 'relative',
        height: '200vh',
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#040302',
        }}
      >
        {/* Entry from black */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#010102',
            opacity: 1 - entryFade,
            zIndex: 30,
            pointerEvents: 'none',
          }}
        />

        {/* MAIN LOUNGE IMAGE — Ken Burns + Mouse parallax */}
        <div
          style={{
            position: 'absolute',
            inset: '-8%',
            backgroundImage: 'url(/images/vip-lounge.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: `${50 + mouseX * 0.25}% ${50 + mouseY * 0.2}%`,
            filter: 'contrast(1.06) brightness(0.85) saturate(1.04)',
            transform: `scale(${kbScale}) translate(${kbX + mouseX * 0.12}px, ${kbY + mouseY * 0.08}px)`,
            opacity: visibility,
            willChange: 'transform',
          }}
        />

        {/* Warm candle amber glow — flickers realistically */}
        <div
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '25%',
            right: '25%',
            height: '35%',
            background: `radial-gradient(ellipse, rgba(255,140,30,${candleIntensity}) 0%, rgba(255,90,10,${candleIntensity * 0.4}) 40%, transparent 70%)`,
            filter: 'blur(22px)',
            pointerEvents: 'none',
            zIndex: 4,
            opacity: visibility,
          }}
        />

        {/* Soft bokeh warm light spheres — static CSS positions, animated opacity */}
        {[
          { left: '12%', top: '22%', size: 48, delay: 0 },
          { left: '78%', top: '18%', size: 36, delay: 0.8 },
          { left: '55%', top: '35%', size: 28, delay: 1.6 },
          { left: '28%', top: '55%', size: 42, delay: 0.4 },
          { left: '85%', top: '48%', size: 32, delay: 1.2 },
          { left: '40%', top: '20%', size: 22, delay: 2.0 },
          { left: '65%', top: '60%', size: 38, delay: 0.6 },
        ].map((orb, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: orb.left,
              top: orb.top,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,${150 + (i % 3) * 18},${50 + (i % 4) * 12},0.5) 0%, transparent 70%)`,
              filter: 'blur(10px)',
              opacity: visibility * (0.4 + Math.sin(time * 0.8 + orb.delay) * 0.15),
              pointerEvents: 'none',
              zIndex: 5,
              willChange: 'opacity',
            }}
          />
        ))}

        {/* Cool blue city window glow — top right */}
        <div
          style={{
            position: 'absolute',
            top: '0%',
            right: '0%',
            width: '48%',
            height: '65%',
            background: 'radial-gradient(ellipse at 70% 30%, rgba(50,80,180,0.1) 0%, transparent 65%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
            zIndex: 4,
            opacity: visibility,
          }}
        />

        {/* Film grain */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            opacity: 0.038,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
        >
          <filter id="lounge-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#lounge-grain)" />
        </svg>

        {/* Vignette — warmer tint for lounge atmosphere */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 75% at 50% 52%, transparent 22%, rgba(3,2,1,0.55) 68%, rgba(2,1,1,0.94) 100%)',
            pointerEvents: 'none',
            zIndex: 8,
            opacity: visibility,
          }}
        />

        {/* Top letterbox */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '10vh',
            background: 'linear-gradient(to bottom, rgba(3,2,1,0.95) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 11,
          }}
        />

        {/* Bottom fade to site content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '22vh',
            background: 'linear-gradient(to top, rgba(5,5,7,1) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 11,
          }}
        />

        {/* Scene caption — ultra-subtle, fades in then out */}
        <div
          style={{
            position: 'absolute',
            bottom: '25vh',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15,
            textAlign: 'center',
            opacity: visibility * Math.min(1, entryFade * 2) * (progress > 0.5 ? Math.max(0, 1 - (progress - 0.5) * 3) : 1),
            transition: 'opacity 0.6s ease',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            style={{
              fontFamily: 'Space Grotesk, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.42em',
              color: 'rgba(255,170,60,0.6)',
              textTransform: 'uppercase',
              textShadow: '0 0 20px rgba(255,120,0,0.35)',
            }}
          >
            THE KTM EXPERIENCE
          </div>
        </div>
      </div>
    </section>
  );
};

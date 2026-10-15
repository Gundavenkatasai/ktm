import React, { useEffect, useRef, useState } from 'react';

interface CinematicPosterIntroProps {
  onUnlock: () => void;
  isUnlocked: boolean;
  scrollProgress: number;
}

export const CinematicPosterIntro: React.FC<CinematicPosterIntroProps> = ({
  onUnlock,
  isUnlocked,
  scrollProgress,
}) => {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    let start: number | null = null;
    const tick = (t: number) => {
      if (!start) start = t;
      setTime((t - start) / 1000);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Once fully unlocked & faded, unmount
  if (isUnlocked && scrollProgress >= 0.98) return null;

  // Poster lifts up like a curtain — translateY goes from 0 to -100%
  const curtainLift = scrollProgress * 105; // % lift
  const posterBrightness = 1 - scrollProgress * 0.15;

  // Lens flare drifts slowly across using time
  const flareX = 30 + Math.sin(time * 0.22) * 22;
  const flareY = 32 + Math.cos(time * 0.15) * 10;

  // Slow Ken Burns — image gently zooms and pans
  const kenBurnsScale = 1.0 + time * 0.006;
  const kenBurnsX = Math.sin(time * 0.08) * 1.5;
  const kenBurnsY = Math.cos(time * 0.06) * 1.0;

  // Scroll hint pulse opacity
  const hintOpacity = mounted ? Math.max(0, 1 - scrollProgress * 3) : 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: scrollProgress > 0.6 ? 'none' : 'auto',
        cursor: 'pointer',
        overflow: 'hidden',
        // Curtain lift: entire poster slides upward
        transform: `translateY(-${curtainLift}%)`,
        transition: isUnlocked ? 'transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
      }}
      onClick={onUnlock}
    >
      {/* POSTER IMAGE — Ken Burns slow motion zoom + drift */}
      <div
        style={{
          position: 'absolute',
          inset: '-8%',
          backgroundImage: 'url(/images/ktm-poster-fire.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 50%',
          filter: `contrast(1.15) brightness(${posterBrightness}) saturate(1.12)`,
          transform: `scale(${kenBurnsScale}) translate(${kenBurnsX}%, ${kenBurnsY}%)`,
          willChange: 'transform',
        }}
      />

      {/* Film grain — SVG noise, always present */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          opacity: 0.042,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      >
        <filter id="poster-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#poster-grain)" />
      </svg>

      {/* Anamorphic lens flare — thin bright streak */}
      <div
        style={{
          position: 'absolute',
          top: `${flareY}%`,
          left: '-10%',
          width: '120%',
          height: '1.5px',
          background: `linear-gradient(90deg,
            transparent 0%,
            rgba(255,200,80,0) 18%,
            rgba(255,210,120,0.6) ${flareX - 8}%,
            rgba(255,255,200,0.95) ${flareX}%,
            rgba(255,210,120,0.6) ${flareX + 8}%,
            rgba(255,160,40,0.1) 82%,
            transparent 100%
          )`,
          zIndex: 6,
          pointerEvents: 'none',
          filter: 'blur(0.4px)',
        }}
      />
      {/* Soft bloom around flare center */}
      <div
        style={{
          position: 'absolute',
          top: `${flareY - 2}%`,
          left: `${flareX - 8}%`,
          width: '16%',
          height: '4%',
          background: 'radial-gradient(ellipse, rgba(255,220,120,0.18) 0%, transparent 70%)',
          filter: 'blur(6px)',
          zIndex: 6,
          pointerEvents: 'none',
        }}
      />

      {/* Deep cinematic vignette — oval center clear */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 75% 70% at 50% 45%, transparent 0%, rgba(3,3,5,0.45) 60%, rgba(2,2,4,0.96) 100%)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {/* Bottom black gradient — grounds the image */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '38%',
          background: 'linear-gradient(to top, #030304 0%, rgba(3,3,4,0.7) 55%, transparent 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* Top fade */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '18%',
          background: 'linear-gradient(to bottom, rgba(3,3,4,0.85) 0%, transparent 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* SCROLL HINT — bottom center, fades as you scroll */}
      <div
        style={{
          position: 'absolute',
          bottom: '5vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.8rem',
          opacity: hintOpacity,
          transition: 'opacity 2s ease',
          pointerEvents: 'none',
        }}
      >
        {/* Progress bar that fills as you scroll */}
        <div
          style={{
            width: '100px',
            height: '1.5px',
            background: 'rgba(255,102,0,0.2)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${scrollProgress * 100}%`,
              background: 'linear-gradient(90deg, #ff5500, #ffaa00)',
              boxShadow: '0 0 10px rgba(255,102,0,0.9)',
              transition: 'width 0.08s linear',
              borderRadius: '1px',
            }}
          />
        </div>

        <span
          style={{
            fontFamily: 'Space Grotesk, monospace',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.36em',
            color: 'rgba(255,102,0,0.9)',
            textTransform: 'uppercase',
            textShadow: '0 0 24px rgba(255,80,0,0.8)',
          }}
        >
          SCROLL TO ENTER
        </span>

        {/* Mouse wheel icon */}
        <div
          style={{
            width: '22px',
            height: '36px',
            borderRadius: '11px',
            border: '1.5px solid rgba(255,102,0,0.55)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '5px',
            boxShadow: '0 0 16px rgba(255,102,0,0.22)',
          }}
        >
          <div
            style={{
              width: '3px',
              height: '6px',
              borderRadius: '1.5px',
              background: 'linear-gradient(to bottom, #ff6600, #ffaa00)',
              animation: 'scrollBob 1.9s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </div>
  );
};

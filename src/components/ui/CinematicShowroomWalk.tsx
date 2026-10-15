import React, { useEffect, useRef, useState, useCallback } from 'react';

// Each station has its own real unique photo angle
const BIKE_STATIONS = [
  {
    id: 'duke-1390',
    label: '1390 Super Duke R',
    sublabel: '180 HP  ·  LC8 V-Twin  ·  2026',
    image: '/images/bike-station-1.jpg',
    bgPosition: 'center 55%',
  },
  {
    id: 'duke-evo',
    label: 'Super Duke R EVO',
    sublabel: 'Track Package  ·  Full Carbon  ·  Limited',
    image: '/images/bike-station-2.jpg',
    bgPosition: 'center 50%',
  },
  {
    id: 'adventure-1290',
    label: '1290 Super Adventure S',
    sublabel: 'WP Apex Semi-Active  ·  All Terrain',
    image: '/images/bike-station-3.jpg',
    bgPosition: 'center 45%',
  },
  {
    id: 'rc-8c',
    label: 'RC 8C',
    sublabel: 'Track Only  ·  130 HP  ·  Carbon Monocoque',
    image: '/images/bike-station-4.jpg',
    bgPosition: 'center 50%',
  },
  {
    id: 'adventure-890',
    label: '890 Adventure R',
    sublabel: 'Off-Road King  ·  100 HP  ·  Rally Spec',
    image: '/images/bike-station-5.jpg',
    bgPosition: 'center 48%',
  },
];

interface Props {
  onWalkComplete: () => void;
}

export const CinematicShowroomWalk: React.FC<Props> = ({ onWalkComplete }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0–1 through entire section
  const rafRef = useRef<number>(0);
  const lastScrollY = useRef(0);

  const updateProgress = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const totalScrollable = el.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;
    const scrolled = Math.max(0, -rect.top);
    const p = Math.min(1, scrolled / totalScrollable);
    setProgress(p);
    if (p >= 0.99) onWalkComplete();
  }, [onWalkComplete]);

  useEffect(() => {
    const onScroll = () => {
      if (lastScrollY.current === window.scrollY) return;
      lastScrollY.current = window.scrollY;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  // ── PHASE CALCULATIONS ──────────────────────────────────────────────
  // Phase 0–0.12: Entry — showroom wide shot, camera slowly pushes in
  // Phase 0.12–0.85: Aisle walk — 5 bike stations, each occupies ~14%
  // Phase 0.85–1.0: Exit — fade to black, lounge fades in

  const ENTRY_END = 0.12;
  const EXIT_START = 0.85;
  const AISLE_RANGE = EXIT_START - ENTRY_END; // 0.73

  // Wide showroom entry shot
  const entryProgress = Math.min(1, progress / ENTRY_END);
  const wideOpacity = progress < EXIT_START ? 1 : 1 - (progress - EXIT_START) / 0.15;

  // Per-bike visibility — which bike we're currently at
  const aisleProgress = progress < ENTRY_END ? 0 : Math.min(1, (progress - ENTRY_END) / AISLE_RANGE);
  const bikeIndex = Math.min(BIKE_STATIONS.length - 1, Math.floor(aisleProgress * BIKE_STATIONS.length));
  const bikeLocalProgress = (aisleProgress * BIKE_STATIONS.length) % 1; // 0–1 within current bike

  // Fullscreen bike reveal opacity
  const bikeRevealOpacity = progress < ENTRY_END ? 0 : Math.min(1, (progress - ENTRY_END) / 0.05);

  // For exit transition: fade to black 
  const exitBlack = progress > EXIT_START ? Math.min(1, (progress - EXIT_START) / 0.15) : 0;

  // Wide shot slow push — scale 1.0→1.15 over entry
  const wideScale = 1.0 + entryProgress * 0.12;
  const widePanY = entryProgress * 4; // gentle upward look

  // Current active bike image slow Ken Burns
  const bikePanX = (bikeLocalProgress - 0.5) * 2; // −1→+1
  const bikeScale = 1.04 + bikeLocalProgress * 0.05;

  return (
    <section
      ref={sectionRef}
      id="showroom"
      style={{
        position: 'relative',
        height: '560vh',
        width: '100%',
      }}
    >
      {/* STICKY CINEMA VIEWPORT */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#020203',
        }}
      >

        {/* ── LAYER 1: Wide Showroom Aisle Entry Shot ── */}
        <div
          style={{
            position: 'absolute',
            inset: '-6%',
            backgroundImage: 'url(/images/showroom-aisle-wide.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: `center ${48 + widePanY}%`,
            filter: 'contrast(1.1) brightness(0.82) saturate(1.04)',
            transform: `scale(${wideScale})`,
            opacity: wideOpacity,
            willChange: 'transform, opacity',
          }}
        />

        {/* ── LAYER 2: Individual Bike Fullscreen Reveal ── */}
        {BIKE_STATIONS.map((bike, i) => {
          const isCurrent = i === bikeIndex;
          // opacity: current bike = bikeRevealOpacity, others = 0
          // Smooth crossfade: when transitioning away, previous bike fades
          const isPrev = i === bikeIndex - 1;
          let layerOpacity = 0;
          if (isCurrent) layerOpacity = bikeRevealOpacity;
          if (isPrev && bikeLocalProgress < 0.15) {
            layerOpacity = bikeRevealOpacity * (1 - bikeLocalProgress / 0.15);
          }

          return (
            <div
              key={bike.id}
              style={{
                position: 'absolute',
                inset: '-5%',
                backgroundImage: `url(${bike.image})`,
                backgroundSize: 'cover',
                backgroundPosition: bike.bgPosition,
                filter: 'contrast(1.12) brightness(0.9) saturate(1.06)',
                transform: isCurrent
                  ? `scale(${bikeScale}) translateX(${bikePanX * 0.8}%)`
                  : 'scale(1.04)',
                opacity: layerOpacity,
                transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'transform, opacity',
              }}
            />
          );
        })}

        {/* ── LAYER 3: Film Grain (always) ── */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 12,
            opacity: 0.04,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
        >
          <filter id="sw-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#sw-grain)" />
        </svg>

        {/* ── LAYER 4: Vignette ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 82% 80% at 50% 50%, transparent 28%, rgba(2,2,4,0.68) 75%, rgba(1,1,3,0.96) 100%)',
            pointerEvents: 'none',
            zIndex: 13,
          }}
        />

        {/* ── LAYER 5: Top & Bottom letterbox fades ── */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '10vh',
            background: 'linear-gradient(to bottom, rgba(2,2,4,0.92) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 14,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '14vh',
            background: 'linear-gradient(to top, rgba(2,2,4,0.95) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 14,
          }}
        />

        {/* ── LAYER 6: Exit to black ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#010103',
            opacity: exitBlack,
            pointerEvents: 'none',
            zIndex: 18,
          }}
        />

        {/* ── LAYER 7: Bike Name HUD — appears during aisle walk ── */}
        {progress >= ENTRY_END && progress < EXIT_START && (
          <div
            style={{
              position: 'absolute',
              bottom: '16vh',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              textAlign: 'center',
              opacity: Math.min(1, bikeRevealOpacity * 1.5) * Math.min(1, (1 - bikeLocalProgress) * 4),
              transition: 'opacity 0.6s ease',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Station counter */}
            <div
              style={{
                fontFamily: 'Space Grotesk, monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.4em',
                color: 'rgba(255,102,0,0.6)',
                marginBottom: '0.4rem',
                textTransform: 'uppercase',
              }}
            >
              {String(bikeIndex + 1).padStart(2, '0')} / {String(BIKE_STATIONS.length).padStart(2, '0')}
            </div>

            {/* Bike name */}
            <div
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontWeight: 800,
                letterSpacing: '0.06em',
                color: '#ffffff',
                textTransform: 'uppercase',
                textShadow: '0 2px 40px rgba(0,0,0,0.9)',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}
            >
              {BIKE_STATIONS[bikeIndex]?.label}
            </div>

            {/* Spec line */}
            <div
              style={{
                fontFamily: 'Space Grotesk, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,160,60,0.75)',
                textTransform: 'uppercase',
              }}
            >
              {BIKE_STATIONS[bikeIndex]?.sublabel}
            </div>

            {/* Orange underline */}
            <div
              style={{
                margin: '0.75rem auto 0',
                width: '40px',
                height: '1.5px',
                background: 'linear-gradient(90deg, transparent, #ff6600, transparent)',
                boxShadow: '0 0 8px rgba(255,102,0,0.6)',
              }}
            />
          </div>
        )}

        {/* ── LAYER 8: Scroll progress dot row ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '9vh',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            opacity: progress >= ENTRY_END && progress < EXIT_START ? 0.8 : 0,
            transition: 'opacity 0.8s ease',
            pointerEvents: 'none',
          }}
        >
          {BIKE_STATIONS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === bikeIndex ? '20px' : '5px',
                height: '3px',
                borderRadius: '1.5px',
                background: i === bikeIndex
                  ? 'linear-gradient(90deg, #ff5500, #ffaa00)'
                  : i < bikeIndex
                    ? 'rgba(255,102,0,0.4)'
                    : 'rgba(255,255,255,0.15)',
                boxShadow: i === bikeIndex ? '0 0 8px rgba(255,102,0,0.7)' : 'none',
                transition: 'all 0.5s cubic-bezier(0.25,1,0.5,1)',
              }}
            />
          ))}
        </div>

        {/* ── LAYER 9: Entry ambient orange glow on floor ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '-5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '30%',
            background: `radial-gradient(ellipse, rgba(255,90,0,${0.06 + aisleProgress * 0.06}) 0%, transparent 70%)`,
            filter: 'blur(30px)',
            pointerEvents: 'none',
            zIndex: 11,
          }}
        />
      </div>
    </section>
  );
};

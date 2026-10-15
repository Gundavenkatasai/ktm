import React from 'react';
import { Volume2, Sparkles, Layers, ChevronDown, Compass, Gauge, ShieldCheck, Flame } from 'lucide-react';
import { CINEMATIC_CHAPTERS, type ChapterItem } from '../../data/chaptersData';
import { SHOWROOM_BIKES } from '../../data/showroomData';
import { soundSystem } from '../../utils/audioSystem';
import type { Colorway, ModelVariant } from '../../types';
import { COLORWAYS } from '../../data/ktmData';

interface CinematicScrollOverlaysProps {
  activeChapterIndex: number;
  chapterProgress: number;
  is3DMode: boolean;
  onToggle3DMode: () => void;
  chassisXrayActive: boolean;
  onToggleChassisXray: () => void;
  currentColorway: Colorway;
  onSelectColorway: (c: Colorway) => void;
  variant: ModelVariant;
  onSelectVariant: (v: ModelVariant) => void;
  onOpenSpecs: () => void;
  onOpenTestRide: () => void;
  onRevEngine: () => void;
}

export const CinematicScrollOverlays: React.FC<CinematicScrollOverlaysProps> = ({
  activeChapterIndex,
  chapterProgress,
  is3DMode,
  onToggle3DMode,
  chassisXrayActive,
  onToggleChassisXray,
  currentColorway,
  onSelectColorway,
  variant: _variant,
  onSelectVariant: _onSelectVariant,
  onOpenSpecs,
  onOpenTestRide,
  onRevEngine,
}) => {
  const handleRev = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundSystem.revEngine();
    onRevEngine();
  };

  return (
    <div className="cinematic-storytelling-root">
      {/* ── 1. INVISIBLE NATURAL SCROLL TRACK (ANCHORS FOR SCROLLING) ── */}
      <div className="cinematic-scroll-track" aria-hidden="true">
        {CINEMATIC_CHAPTERS.map((chapter, index) => (
          <section
            key={chapter.id}
            id={`chapter-${chapter.id}`}
            className="cinematic-scroll-anchor"
            style={{
              height:
                index === 0
                  ? '160vh'
                  : index === 1
                  ? '180vh'
                  : index === 2
                  ? '160vh'
                  : index === 3
                  ? '180vh'
                  : index === 4
                  ? '180vh'
                  : '160vh',
            }}
          />
        ))}
      </div>

      {/* ── 2. PINNED PRESENTATION VIEWPORT (100% GHOST & OVERLAP FREE) ── */}
      <div
        className="cinematic-fixed-viewport"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: is3DMode ? 'none' : 'auto',
          zIndex: 10,
        }}
      >
        {/* Subtle Top Edge Chapter Micro-Progress Line (Hidden at start) */}
        <div
          style={{
            position: 'absolute',
            top: '3.75rem',
            left: 0,
            width: '100%',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.04)',
            pointerEvents: 'none',
            opacity: activeChapterIndex === 0 && chapterProgress < 0.25 ? 0 : 1,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, Math.max(0, chapterProgress * 100))}%`,
              background: 'linear-gradient(90deg, #ff6600, #ff8533)',
              boxShadow: '0 0 10px rgba(255, 102, 0, 0.6)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>

        {/* ── CHAPTER OVERLAYS (CHAPTER 0 IS PURE POSTER — ZERO TEXT) ── */}
        {CINEMATIC_CHAPTERS.map((chapter: ChapterItem, index: number) => {
          // Chapter 0 is the pure Hero Poster scene: NO text or metric overlays!
          if (index === 0) return null;

          const isCurrent = activeChapterIndex === index;

          // Compute smooth cinematic entering / exiting transforms
          let opacity = 0;
          let translateY = 20;
          let filterBlur = 4;

          if (isCurrent && !is3DMode) {
            if (index > 0 && chapterProgress < 0.12) {
              const enterP = chapterProgress / 0.12;
              opacity = enterP;
              translateY = (1 - enterP) * 18;
              filterBlur = (1 - enterP) * 4;
            } else if (index < CINEMATIC_CHAPTERS.length - 1 && chapterProgress > 0.88) {
              const exitP = (chapterProgress - 0.88) / 0.12;
              opacity = 1 - exitP;
              translateY = -exitP * 18;
              filterBlur = exitP * 4;
            } else {
              opacity = 1;
              translateY = 0;
              filterBlur = 0;
            }
          }

          const isVisible = opacity > 0.01;

          return (
            <div
              key={chapter.id}
              className={`cinematic-chapter-overlay chapter-index-${index}`}
              style={{
                position: 'absolute',
                top: '6.2rem',
                left: '4.5vw',
                maxWidth: '680px',
                opacity,
                transform: `translate3d(0, ${translateY}px, 0)`,
                filter: filterBlur > 0.1 ? `blur(${filterBlur}px)` : 'none',
                transition:
                  'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: isCurrent && opacity > 0.4 ? 'auto' : 'none',
                visibility: isVisible ? 'visible' : 'hidden',
              }}
            >
              {/* Chapter badge and category */}
              <div className="chapter-badge-line">
                <span className="chapter-number-pill">CHAPTER {chapter.number}</span>
                <span className="chapter-category-tag">{chapter.title}</span>
                {index === 3 && (
                  <span
                    style={{
                      background: 'rgba(255, 102, 0, 0.2)',
                      color: '#ff6600',
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem',
                      fontFamily: 'var(--font-mono)',
                      border: '1px solid #ff6600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <Volume2 size={12} /> DIALOGUE: "OPTIMIZE AIRFLOW"
                  </span>
                )}
              </div>

              {/* Main Headline */}
              <h1 className="chapter-main-title">{chapter.headline}</h1>

              {/* Subtitle */}
              <div className="chapter-subtitle">{chapter.subtitle}</div>

              {/* Narrative Description */}
              <p className="chapter-description">{chapter.description}</p>

              {/* Metric Cards Grid */}
              <div className="chapter-metrics-grid">
                {chapter.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="chapter-metric-card">
                    <div className="metric-label">{m.label}</div>
                    <div className="metric-value">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* ── SPECIFIC SCENE INTERACTIVE ELEMENTS ── */}
              {/* SCENE 01: HERO POSTER */}
              {index === 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={handleRev}
                    className="btn-ktm-primary"
                    style={{ padding: '0.75rem 1.6rem', fontSize: '0.85rem' }}
                  >
                    <Flame size={16} /> REV LC8 ENGINE
                  </button>
                  <button
                    type="button"
                    onClick={onOpenSpecs}
                    className="btn-ktm-secondary"
                    style={{ padding: '0.75rem 1.4rem', fontSize: '0.85rem' }}
                  >
                    <ShieldCheck size={16} /> FULL SPECIFICATIONS
                  </button>
                </div>
              )}

              {/* SCENE 02: SHOWROOM FLEET HIGHLIGHT */}
              {index === 1 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: '#ff6600',
                      letterSpacing: '0.12em',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    // MATTIGHOFEN SHOWROOM FLEET (AUTHENTIC KTM RANGE)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {SHOWROOM_BIKES.slice(0, 4).map((b) => (
                      <div
                        key={b.id}
                        style={{
                          background: 'rgba(20, 20, 28, 0.85)',
                          border: '1px solid rgba(255, 102, 0, 0.3)',
                          padding: '0.4rem 0.75rem',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#ffffff',
                        }}
                      >
                        <span style={{ color: '#ff6600', fontWeight: 700 }}>{b.name}</span>
                        <span style={{ color: '#888899', marginLeft: '0.5rem' }}>{b.power}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SCENE 04: ENGINEERING OFFICE SPEECH BADGE */}
              {index === 3 && (
                <div
                  style={{
                    background: 'rgba(15, 15, 22, 0.88)',
                    borderLeft: '3px solid #ff6600',
                    padding: '0.8rem 1.2rem',
                    maxWidth: '520px',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    lineHeight: '1.5',
                    color: '#d0d1dc',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  <div style={{ color: '#ff6600', fontWeight: 700, marginBottom: '0.2rem' }}>
                    AERODYNAMICS CHIEF ENGINEER:
                  </div>
                  "We need to optimize the airflow, the airflow right here. The front winglet vortex stabilizes the front axle past 250 km/h."
                </div>
              )}

              {/* SCENE 05: THE MACHINE REVEALED (MACRO EXPLORATION & 3D CONTROLS) */}
              {index === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={onToggle3DMode}
                      className="btn-ktm-primary"
                      style={{ padding: '0.75rem 1.6rem', fontSize: '0.85rem' }}
                    >
                      <Compass size={16} />
                      {is3DMode ? 'RETURN TO CINEMATIC FILM' : 'ENTER 360° 3D INSPECTION'}
                    </button>

                    <button
                      type="button"
                      onClick={onToggleChassisXray}
                      className="btn-ktm-secondary"
                      style={{
                        padding: '0.75rem 1.4rem',
                        fontSize: '0.85rem',
                        borderColor: chassisXrayActive ? '#ff6600' : 'rgba(255,255,255,0.2)',
                        color: chassisXrayActive ? '#ff6600' : '#ffffff',
                      }}
                    >
                      <Layers size={16} />
                      {chassisXrayActive ? 'X-RAY: ACTIVE (CHASSIS)' : 'TOGGLE X-RAY CHASSIS'}
                    </button>
                  </div>

                  {/* Colorway Customizer Picker */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.3rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#9999a8' }}>
                      LIVERY:
                    </span>
                    {COLORWAYS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => onSelectColorway(c)}
                        style={{
                          background: c.mainColor,
                          border: currentColorway.id === c.id ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.2)',
                          width: '26px',
                          height: '26px',
                          cursor: 'pointer',
                          boxShadow: currentColorway.id === c.id ? '0 0 10px #ff6600' : 'none',
                        }}
                        title={c.name}
                      />
                    ))}
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ffffff' }}>
                      {currentColorway.name}
                    </span>
                  </div>
                </div>
              )}

              {/* SCENE 06: FINAL BRAND MOMENT (CTA PANEL) */}
              {index === 5 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={onToggle3DMode}
                    className="btn-ktm-primary"
                    style={{ padding: '0.85rem 1.8rem', fontSize: '0.9rem' }}
                  >
                    <Sparkles size={16} /> EXPLORE THE MACHINE (3D)
                  </button>
                  <button
                    type="button"
                    onClick={onOpenTestRide}
                    className="btn-ktm-secondary"
                    style={{ padding: '0.85rem 1.6rem', fontSize: '0.9rem' }}
                  >
                    BOOK A TEST RIDE
                  </button>
                  <button
                    type="button"
                    onClick={onOpenSpecs}
                    className="btn-ktm-secondary"
                    style={{ padding: '0.85rem 1.4rem', fontSize: '0.9rem' }}
                  >
                    <Gauge size={16} /> SPEC SHEET
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* ── SILENT MINIMAL SCROLL CHEVRON (100% TEXTLESS, FADES OUT ON SCROLL) ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.8rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'rgba(255, 102, 0, 0.7)',
            pointerEvents: activeChapterIndex === 0 && chapterProgress < 0.2 ? 'auto' : 'none',
            cursor: 'pointer',
            opacity: activeChapterIndex === 0 && chapterProgress < 0.2 ? 1 - chapterProgress / 0.2 : 0,
            transition: 'opacity 0.4s ease',
            animation: 'scrollBob 2s infinite ease-in-out',
            zIndex: 20,
          }}
          onClick={() => {
            const nextEl = document.getElementById('chapter-showroom');
            if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll to enter showroom"
        >
          <ChevronDown size={22} />
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Volume2, VolumeX, Compass, ShieldCheck, Flame, Menu, X, Calendar } from 'lucide-react';
import type { ModelVariant } from '../../types';
import { soundSystem } from '../../utils/audioSystem';

interface NavigationProps {
  variant: ModelVariant;
  onSelectVariant: (v: ModelVariant) => void;
  is3DMode: boolean;
  onToggle3DMode: () => void;
  activeChapterIndex: number;
  onSelectChapter: (idx: number) => void;
  onOpenSpecs: () => void;
  onOpenTestRide: () => void;
  onRevEngine: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  variant,
  onSelectVariant,
  is3DMode,
  onToggle3DMode,
  activeChapterIndex,
  onSelectChapter,
  onOpenSpecs,
  onOpenTestRide,
  onRevEngine,
}) => {
  const [isMuted, setIsMuted] = useState(soundSystem.getMutedState());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSoundToggle = () => {
    const muted = soundSystem.toggleMute();
    setIsMuted(muted);
  };

  const handleRev = () => {
    soundSystem.revEngine();
    onRevEngine();
  };

  const navChapters = [
    { label: '01 HERO', index: 0 },
    { label: '02 SHOWROOM', index: 1 },
    { label: '03 TRANSITION', index: 2 },
    { label: '04 STUDIO', index: 3 },
    { label: '05 MACHINE', index: 4 },
    { label: '06 REVEAL', index: 5 },
  ];

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        background: 'rgba(5, 5, 8, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 102, 0, 0.25)',
      }}
    >
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Brand Mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button
            type="button"
            onClick={() => onSelectChapter(0)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              textAlign: 'left',
            }}
          >
            <div
              style={{
                background: '#ff6600',
                color: '#000000',
                fontWeight: 900,
                fontSize: '1.15rem',
                letterSpacing: '-0.04em',
                padding: '0.25rem 0.6rem',
                lineHeight: 1,
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              }}
            >
              KTM
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'Barlow Condensed',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  fontStyle: 'italic',
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                BEYOND THE RIDE
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  color: '#ff6600',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                }}
              >
                1390 SUPER DUKE {variant} // READY TO RACE
              </div>
            </div>
          </button>

          {/* Model Switcher (R vs EVO) */}
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(255, 255, 255, 0.06)',
              padding: '2px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <button
              type="button"
              onClick={() => {
                soundSystem.playHapticClick(500, 0.04);
                onSelectVariant('R');
              }}
              style={{
                padding: '0.25rem 0.65rem',
                fontSize: '0.7rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                background: variant === 'R' ? '#ff6600' : 'transparent',
                color: variant === 'R' ? '#000000' : '#888899',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              R (MANUAL)
            </button>
            <button
              type="button"
              onClick={() => {
                soundSystem.playHapticClick(650, 0.04);
                onSelectVariant('EVO');
              }}
              style={{
                padding: '0.25rem 0.65rem',
                fontSize: '0.7rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                background: variant === 'EVO' ? '#ff6600' : 'transparent',
                color: variant === 'EVO' ? '#000000' : '#888899',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              EVO (SEMI-ACTIVE)
            </button>
          </div>
        </div>

        {/* Center: Chapter Quick Jump Links (Desktop) */}
        <nav
          aria-label="Experience Chapters"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
          }}
          className="desktop-nav-links"
        >
          {navChapters.map((ch) => {
            const isActive = activeChapterIndex === ch.index;
            return (
              <button
                key={ch.index}
                type="button"
                onClick={() => onSelectChapter(ch.index)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#ff6600' : '#8f90a0',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 800 : 600,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  padding: '0.3rem 0',
                  borderBottom: isActive ? '2px solid #ff6600' : '2px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                {ch.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Audio Toggle, 3D Toggle, Specs & CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleSoundToggle}
            className="btn-ktm-secondary"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              borderColor: !isMuted ? '#ff6600' : 'rgba(255,255,255,0.15)',
              color: !isMuted ? '#ff6600' : '#ffffff',
            }}
            title={isMuted ? 'Unmute LC8 V-Twin Audio Engine' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{isMuted ? 'AUDIO OFF' : 'LC8 ACTIVE'}</span>
          </button>

          {/* Rev Trigger */}
          <button
            type="button"
            onClick={handleRev}
            className="btn-ktm-secondary"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
            title="Throttle Rev Pulse"
          >
            <Flame size={14} color="#ff6600" />
            <span>REV</span>
          </button>

          {/* 3D Turntable Toggle */}
          <button
            type="button"
            onClick={onToggle3DMode}
            className="btn-ktm-secondary"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              borderColor: is3DMode ? '#ff6600' : 'rgba(255,255,255,0.15)',
              color: is3DMode ? '#ff6600' : '#ffffff',
            }}
          >
            <Compass size={14} />
            <span>{is3DMode ? '3D VIEW' : '3D ORBIT'}</span>
          </button>

          {/* Specs Modal Button */}
          <button
            type="button"
            onClick={onOpenSpecs}
            className="btn-ktm-secondary"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <ShieldCheck size={14} />
            <span>SPECS</span>
          </button>

          {/* Book Test Ride Button */}
          <button
            type="button"
            onClick={onOpenTestRide}
            className="btn-ktm-primary"
            style={{
              padding: '0.45rem 1.1rem',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Calendar size={14} />
            <span>TEST RIDE</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              padding: '0.3rem',
              display: 'none',
              cursor: 'pointer',
            }}
            className="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(8, 8, 12, 0.98)',
            borderTop: '1px solid rgba(255, 102, 0, 0.3)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navChapters.map((ch) => (
            <button
              key={ch.index}
              type="button"
              onClick={() => {
                onSelectChapter(ch.index);
                setMobileMenuOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                color: activeChapterIndex === ch.index ? '#ff6600' : '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 700,
                padding: '0.5rem 0',
              }}
            >
              {ch.label}
            </button>
          ))}
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => {
                onOpenSpecs();
                setMobileMenuOpen(false);
              }}
              className="btn-ktm-secondary"
              style={{ flex: 1, padding: '0.7rem' }}
            >
              SPECS
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenTestRide();
                setMobileMenuOpen(false);
              }}
              className="btn-ktm-primary"
              style={{ flex: 1, padding: '0.7rem' }}
            >
              TEST RIDE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import { useEffect, useState } from 'react';
import { ArrowDown, Compass, Play, Volume2, Shield, Flame } from 'lucide-react';
import type { ModelVariant } from '../../types';
import { soundSystem } from '../../utils/audioSystem';

interface HeroSectionProps {
  variant: ModelVariant;
  onExploreClick: () => void;
  onToggleFreeOrbit: () => void;
  isFreeOrbit: boolean;
}

export const HeroSection = ({
  variant,
  onExploreClick,
  onToggleFreeOrbit,
  isFreeOrbit,
}: HeroSectionProps) => {
  const [shotPhase, setShotPhase] = useState<'blackout' | 'first-light' | 'reveal'>('blackout');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShotPhase('first-light'), 300);
    const timer2 = setTimeout(() => setShotPhase('reveal'), 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleAudioToggle = () => {
    const muted = soundSystem.toggleMute();
    setIsPlayingAudio(!muted);
    if (!muted) {
      soundSystem.revEngine();
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '5.5rem 2rem 2.5rem 2rem',
        overflow: 'hidden',
      }}
    >
      {/* 
        MASSIVE BACKGROUND TYPOGRAPHY: "RIDE" & "DIE" (Matching Reference Video at 00:51 - 00:54)
        Positioned behind the 3D motorcycle with high-impact bold athletic slant
      */}
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 3vw',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: shotPhase === 'reveal' ? 0.95 : 0,
          transition: 'opacity 1.2s ease',
        }}
      >
        <span
          className="font-racing"
          style={{
            fontSize: 'clamp(5.5rem, 16vw, 19rem)',
            lineHeight: 0.8,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.9)',
            userSelect: 'none',
          }}
        >
          RIDE
        </span>
        <span
          className="font-racing"
          style={{
            fontSize: 'clamp(5.5rem, 16vw, 19rem)',
            lineHeight: 0.8,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.9)',
            userSelect: 'none',
          }}
        >
          DIE
        </span>
      </div>

      {/* Top Telemetry & Status Bar */}
      <div
        style={{
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          opacity: shotPhase === 'blackout' ? 0 : 1,
          transition: 'opacity 0.8s ease',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="tech-badge">
            RIDER // 01 // READY TO RACE
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              fontFamily: 'Space Grotesk, monospace',
              color: '#ff6600',
              fontWeight: 700,
            }}
          >
            {variant === 'R' ? 'WP MECHANICAL' : 'WP SAT ELECTRONIC'}
          </span>
        </div>

        <div
          style={{
            textAlign: 'right',
            fontFamily: 'Space Grotesk, monospace',
            fontSize: '0.75rem',
            color: '#8e8e9e',
          }}
        >
          <div style={{ color: '#ffffff', fontWeight: 800 }}>MY2026 1390 SUPER DUKE {variant}</div>
          <div>190 PS // 145 NM // 1,350 CC</div>
        </div>
      </div>

      {/* Bottom Interactive Control Zone Matching Reference Video */}
      <div
        style={{
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '2rem',
          zIndex: 10,
          opacity: shotPhase === 'reveal' ? 1 : 0,
          transition: 'all 1s ease',
        }}
      >
        {/* Left Side: Circular Interactive Play/Sound Button (Matching Video at 00:53) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button
            type="button"
            onClick={handleAudioToggle}
            title={isPlayingAudio ? 'Mute Engine' : 'Ignite V-Twin Audio'}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: isPlayingAudio ? '#ff6600' : 'rgba(15, 15, 20, 0.85)',
              border: '2px solid #ff6600',
              color: isPlayingAudio ? '#000000' : '#ff6600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: isPlayingAudio
                ? '0 0 35px rgba(255, 102, 0, 0.85)'
                : '0 0 15px rgba(255, 102, 0, 0.35)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isPlayingAudio ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            {isPlayingAudio ? <Volume2 size={26} /> : <Play size={24} style={{ marginLeft: '4px' }} />}
          </button>

          <div>
            <div
              style={{
                fontFamily: 'Space Grotesk, monospace',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#ff6600',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              LC8 V-TWIN AUDIO
            </div>
            <div
              style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#ffffff',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              {isPlayingAudio ? 'ENGINE RUNNING (1,350 RPM)' : 'CLICK TO IGNITE ENGINE'}
            </div>
          </div>
        </div>

        {/* Center / Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              soundSystem.playHapticClick(600, 0.05);
              onExploreClick();
            }}
            className="btn-ktm-primary"
          >
            Explore Experience <ArrowDown size={18} />
          </button>

          <button
            type="button"
            onClick={() => {
              soundSystem.playHapticClick(520, 0.04);
              onToggleFreeOrbit();
            }}
            className="btn-ktm-secondary"
          >
            <Compass size={18} color="#ff6600" />
            {isFreeOrbit ? 'Lock Camera' : 'Free 360° Orbit'}
          </button>

          {isPlayingAudio && (
            <button
              type="button"
              onClick={() => soundSystem.revEngine()}
              className="btn-ktm-secondary"
              style={{ borderColor: '#ff6600', color: '#ff6600' }}
            >
              <Flame size={16} /> Rev Throttle
            </button>
          )}
        </div>

        {/* Right Side: Key Telemetry Summary */}
        <div
          className="glass-panel crosshair-corner"
          style={{
            padding: '1rem 1.5rem',
            background: 'rgba(10, 10, 14, 0.85)',
            minWidth: '220px',
          }}
        >
          <div style={{ fontSize: '0.65rem', color: '#888899', fontFamily: 'Space Grotesk, monospace' }}>
            HYPER-NAKED APEX
          </div>
          <div
            className="font-racing"
            style={{ fontSize: '1.8rem', color: '#ffffff', lineHeight: 1, marginTop: '2px' }}
          >
            190 PS // 145 NM
          </div>
          <div style={{ fontSize: '0.72rem', color: '#ff6600', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '4px' }}>
            <Shield size={12} /> CAM SHIFT VALVE TIMING
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Compass, Zap, X, Eye, Play, Pause } from 'lucide-react';
import { soundSystem } from '../../utils/audioSystem';

interface TurntableHUDProps {
  currentAngle: number; // 0 to 360
  isAutoRotate: boolean;
  onToggleAutoRotate: () => void;
  rotateSpeed: number;
  onSetRotateSpeed: (speed: number) => void;
  onSelectAnglePreset: (angleDeg: number) => void;
  lightingPreset: 'studio' | 'orange-rim' | 'blackout-laser';
  onSelectLightingPreset: (preset: 'studio' | 'orange-rim' | 'blackout-laser') => void;
  headlightBeamActive: boolean;
  onToggleHeadlightBeam: () => void;
  chassisXrayActive: boolean;
  onToggleChassisXray: () => void;
  onClose: () => void;
}

export const TurntableHUD: React.FC<TurntableHUDProps> = ({
  currentAngle,
  isAutoRotate,
  onToggleAutoRotate,
  rotateSpeed,
  onSetRotateSpeed,
  onSelectAnglePreset,
  lightingPreset,
  onSelectLightingPreset,
  headlightBeamActive,
  onToggleHeadlightBeam,
  chassisXrayActive,
  onToggleChassisXray,
  onClose,
}) => {
  // Format readable angle name
  const getAngleLabel = (deg: number) => {
    const normalized = Math.round(((deg % 360) + 360) % 360);
    if (normalized >= 340 || normalized <= 20) return `${normalized}° FRONT APEX`;
    if (normalized > 20 && normalized < 70) return `${normalized}° HERO 3/4`;
    if (normalized >= 70 && normalized <= 110) return `${normalized}° RIGHT PROFILE`;
    if (normalized > 110 && normalized < 160) return `${normalized}° REAR THREE-QUARTER`;
    if (normalized >= 160 && normalized <= 200) return `${normalized}° REAR 200/55`;
    if (normalized > 200 && normalized < 250) return `${normalized}° LEFT REAR 3/4`;
    if (normalized >= 250 && normalized <= 290) return `${normalized}° LEFT PROFILE`;
    return `${normalized}° FRONT COCKPIT`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 35,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '5.5rem 2rem 2rem 2rem',
      }}
    >
      {/* Top 360 Control Bar */}
      <div
        style={{
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
        }}
      >
        {/* Azimuth / Angle Indicator Dial */}
        <div
          className="glass-panel crosshair-corner"
          style={{
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            background: 'rgba(8, 8, 12, 0.9)',
            border: '1px solid rgba(255, 102, 0, 0.4)',
          }}
        >
          <Compass size={22} color="#ff6600" />
          <div>
            <div
              style={{
                fontSize: '0.65rem',
                color: '#88889a',
                fontFamily: 'Space Grotesk, monospace',
                letterSpacing: '0.12em',
              }}
            >
              TURNTABLE AZIMUTH
            </div>
            <div
              className="font-racing"
              style={{ fontSize: '1.25rem', color: '#ffffff', lineHeight: 1 }}
            >
              {getAngleLabel(currentAngle)}
            </div>
          </div>
        </div>

        {/* Exit 360 Mode */}
        <button
          type="button"
          onClick={() => {
            soundSystem.playHapticClick(500, 0.04);
            onClose();
          }}
          className="btn-ktm-secondary"
          style={{ padding: '0.6rem 1.1rem', fontSize: '0.8rem', gap: '0.4rem' }}
        >
          <X size={16} /> Exit 360° Studio
        </button>
      </div>

      {/* Bottom Floating Control Panel */}
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          pointerEvents: 'auto',
          background: 'rgba(10, 10, 15, 0.92)',
          border: '1px solid rgba(255, 102, 0, 0.35)',
          borderRadius: '4px',
          backdropFilter: 'blur(20px)',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 102, 0, 0.15)',
        }}
      >
        {/* Quick Angle Presets */}
        <div>
          <div
            style={{
              fontSize: '0.68rem',
              color: '#88889a',
              fontFamily: 'Space Grotesk, monospace',
              letterSpacing: '0.1em',
              marginBottom: '0.4rem',
            }}
          >
            CAMERA ANGLE PRESETS
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[
              { label: '0° FRONT', deg: 0 },
              { label: '45° HERO', deg: 45 },
              { label: '90° PROFILE', deg: 90 },
              { label: '180° REAR', deg: 180 },
              { label: '315° COCKPIT', deg: 315 },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  soundSystem.playHapticClick(650, 0.04);
                  onSelectAnglePreset(p.deg);
                }}
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  fontFamily: 'Space Grotesk, monospace',
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#ff6600';
                  e.currentTarget.style.color = '#ff6600';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Auto Rotate & Speed Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div>
            <div
              style={{
                fontSize: '0.68rem',
                color: '#88889a',
                fontFamily: 'Space Grotesk, monospace',
                letterSpacing: '0.1em',
                marginBottom: '0.4rem',
              }}
            >
              TURNTABLE SPIN
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  soundSystem.playHapticClick(550, 0.04);
                  onToggleAutoRotate();
                }}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  fontFamily: 'Space Grotesk, monospace',
                  background: isAutoRotate ? '#ff6600' : 'rgba(255, 255, 255, 0.08)',
                  color: isAutoRotate ? '#000000' : '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                {isAutoRotate ? <Pause size={12} /> : <Play size={12} />}
                {isAutoRotate ? 'PAUSE' : 'AUTO-SPIN'}
              </button>

              {[0.5, 1.0, 2.0].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    soundSystem.playHapticClick(600, 0.03);
                    onSetRotateSpeed(s);
                  }}
                  style={{
                    padding: '0.35rem 0.55rem',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    fontFamily: 'Space Grotesk, monospace',
                    background: rotateSpeed === s ? 'rgba(255, 102, 0, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    color: rotateSpeed === s ? '#ff6600' : '#888899',
                    border: rotateSpeed === s ? '1px solid #ff6600' : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    borderRadius: '2px',
                  }}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lighting Rig Environment Switcher */}
        <div>
          <div
            style={{
              fontSize: '0.68rem',
              color: '#88889a',
              fontFamily: 'Space Grotesk, monospace',
              letterSpacing: '0.1em',
              marginBottom: '0.4rem',
            }}
          >
            LIGHTING RIG
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[
              { id: 'studio', label: 'STUDIO DARK' },
              { id: 'orange-rim', label: 'ORANGE RIM' },
              { id: 'blackout-laser', label: 'BLACKOUT' },
            ].map((rig) => (
              <button
                key={rig.id}
                type="button"
                onClick={() => {
                  soundSystem.playHapticClick(650, 0.04);
                  onSelectLightingPreset(rig.id as 'studio' | 'orange-rim' | 'blackout-laser');
                }}
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  fontFamily: 'Space Grotesk, monospace',
                  background: lightingPreset === rig.id ? '#ff6600' : 'rgba(255, 255, 255, 0.05)',
                  color: lightingPreset === rig.id ? '#000000' : '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '2px',
                }}
              >
                {rig.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Laser Headlight & Chassis X-Ray Toggles */}
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            type="button"
            onClick={() => {
              soundSystem.playHapticClick(700, 0.04);
              onToggleHeadlightBeam();
            }}
            title="Toggle Volumetric Predator Headlight Laser"
            style={{
              padding: '0.45rem 0.75rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              fontFamily: 'Space Grotesk, monospace',
              background: headlightBeamActive ? 'rgba(255, 102, 0, 0.3)' : 'rgba(255, 255, 255, 0.06)',
              color: headlightBeamActive ? '#ff6600' : '#888899',
              border: headlightBeamActive ? '1px solid #ff6600' : '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Zap size={14} />
            LASER BEAM
          </button>

          <button
            type="button"
            onClick={() => {
              soundSystem.playHapticClick(720, 0.04);
              onToggleChassisXray();
            }}
            title="Illuminate Internal Orange Trellis Chassis"
            style={{
              padding: '0.45rem 0.75rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              fontFamily: 'Space Grotesk, monospace',
              background: chassisXrayActive ? 'rgba(255, 102, 0, 0.3)' : 'rgba(255, 255, 255, 0.06)',
              color: chassisXrayActive ? '#ff6600' : '#888899',
              border: chassisXrayActive ? '1px solid #ff6600' : '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Eye size={14} />
            TRELLIS X-RAY
          </button>
        </div>
      </div>
    </div>
  );
};

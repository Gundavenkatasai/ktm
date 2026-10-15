import React, { useState, useEffect, useRef } from 'react';
import { Gauge, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import { soundSystem } from '../../utils/audioSystem';

export interface TachometerHUDProps {
  visible?: boolean;
  telemetry?: {
    rpm?: number;
    gear?: string;
    speed?: number;
    downforce?: string;
    airflow?: string;
    temp?: string;
    leanAngle?: number;
  };
  chapterTitle?: string;
}

export const TachometerHUD: React.FC<TachometerHUDProps> = ({
  visible = true,
  telemetry,
  chapterTitle,
}) => {
  const targetIdleRpm = telemetry?.rpm ?? 1350;
  const [rpm, setRpm] = useState(targetIdleRpm);
  const [isRevving, setIsRevving] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const rpmRef = useRef(rpm);
  rpmRef.current = rpm;

  // Smoothly track chapter idle RPM when not revving, or rev up to 10k on hold
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const current = rpmRef.current;

      if (isRevving) {
        // Accelerate RPM up to redline 10,000
        const next = Math.min(10200, current + 340);
        setRpm(next);
      } else {
        // Smoothly settle down towards chapter's cruise/idle RPM
        const diff = targetIdleRpm - current;
        if (Math.abs(diff) > 15) {
          const next = current + diff * 0.18;
          setRpm(next);
        } else {
          setRpm(targetIdleRpm);
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRevving, targetIdleRpm]);

  if (!visible) return null;

  const rpmPercent = Math.min(1, Math.max(0, (rpm - 1000) / 9200));
  const isRedline = rpm >= 9200;

  const handleStartRev = () => {
    setIsRevving(true);
    soundSystem.toggleMute();
    soundSystem.revEngine();
  };

  const handleStopRev = () => {
    setIsRevving(false);
  };

  return (
    <div
      className="ktm-cockpit-hud"
      style={{
        position: 'fixed',
        bottom: '1.8rem',
        right: '1.8rem',
        zIndex: 35,
        pointerEvents: 'auto',
      }}
    >
      <div
        className="glass-panel crosshair-corner"
        style={{
          background: 'rgba(9, 9, 14, 0.94)',
          border: isRedline ? '1px solid #ef4444' : '1px solid rgba(255, 102, 0, 0.45)',
          borderRadius: '4px',
          boxShadow: isRedline
            ? '0 0 35px rgba(239, 68, 68, 0.65)'
            : '0 12px 35px rgba(0, 0, 0, 0.85), 0 0 25px rgba(255, 102, 0, 0.22)',
          minWidth: '260px',
          maxWidth: '300px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
          overflow: 'hidden',
        }}
      >
        {/* Cockpit Title Header & Collapse Toggle */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.65rem 1rem',
            background: 'rgba(255, 102, 0, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#00ff66',
                boxShadow: '0 0 6px #00ff66',
                display: 'inline-block',
                animation: 'pulse 1.8s infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#ff6600',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              COCKPIT // {chapterTitle || 'TELEMETRY'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'none',
              border: 'none',
              color: '#888899',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
            }}
            title={collapsed ? 'Expand Cockpit HUD' : 'Collapse Cockpit HUD'}
          >
            {collapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Real-time Telemetry Data Grid */}
        {telemetry && (
          <div
            style={{
              padding: '0.65rem 1rem 0.4rem 1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.4rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(15, 15, 22, 0.4)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#7a7a88' }}>GEAR</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: telemetry.gear === 'N' ? '#22c55e' : '#ff6600',
                }}
              >
                {telemetry.gear === 'N' ? 'NEUTRAL' : `GEAR ${telemetry.gear}`}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#7a7a88' }}>SPEED</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                {telemetry.speed !== undefined ? `${telemetry.speed} KM/H` : '0 KM/H'}
              </span>
            </div>

            {telemetry.downforce && (
              <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#7a7a88' }}>AERODYNAMICS</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: '#00ccff' }}>
                  {telemetry.downforce}
                </span>
              </div>
            )}

            {telemetry.leanAngle !== undefined && (
              <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#7a7a88' }}>MAX LEAN ANGLE</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: '#ff3300' }}>
                  {telemetry.leanAngle}° (CORNER APEX)
                </span>
              </div>
            )}

            {telemetry.temp && !telemetry.downforce && !telemetry.leanAngle && (
              <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#7a7a88' }}>COOLANT TEMP</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: '#ffffff' }}>
                  {telemetry.temp} // NOMINAL
                </span>
              </div>
            )}
          </div>
        )}

        {/* Collapsible Tachometer Section */}
        {!collapsed && (
          <div style={{ padding: '0.75rem 1rem 0.9rem 1rem' }}>
            {/* Header & Shift Lights */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.65rem',
                  color: '#888899',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <Gauge size={12} color="#ff6600" /> LC8 TACHOMETER
              </div>

              {/* 5-Stage Progressive LED Shift Lights */}
              <div style={{ display: 'flex', gap: '3px' }}>
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: rpm >= 6000 ? '#22c55e' : '#1f2937',
                    boxShadow: rpm >= 6000 ? '0 0 6px #22c55e' : 'none',
                  }}
                />
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: rpm >= 7200 ? '#22c55e' : '#1f2937',
                    boxShadow: rpm >= 7200 ? '0 0 6px #22c55e' : 'none',
                  }}
                />
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: rpm >= 8200 ? '#eab308' : '#1f2937',
                    boxShadow: rpm >= 8200 ? '0 0 6px #eab308' : 'none',
                  }}
                />
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: rpm >= 9000 ? '#ff6600' : '#1f2937',
                    boxShadow: rpm >= 9000 ? '0 0 8px #ff6600' : 'none',
                  }}
                />
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: rpm >= 9400 ? '#ef4444' : '#1f2937',
                    boxShadow: rpm >= 9400 ? '0 0 10px #ef4444' : 'none',
                    animation: rpm >= 9400 ? 'pulse 0.2s infinite' : 'none',
                  }}
                />
              </div>
            </div>

            {/* Big RPM Number Readout */}
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div
                className="font-racing"
                style={{
                  fontSize: '2.2rem',
                  lineHeight: 1,
                  color: isRedline ? '#ef4444' : '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                {Math.round(rpm).toLocaleString()}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#ff6600',
                }}
              >
                RPM
              </div>
            </div>

            {/* Curved Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '5px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '3px',
                overflow: 'hidden',
                margin: '0.5rem 0 0.75rem 0',
              }}
            >
              <div
                style={{
                  width: `${rpmPercent * 100}%`,
                  height: '100%',
                  background: isRedline
                    ? 'linear-gradient(90deg, #ff6600 0%, #ef4444 100%)'
                    : 'linear-gradient(90deg, #22c55e 0%, #ff6600 80%)',
                  transition: 'width 0.05s linear',
                }}
              />
            </div>

            {/* Hold Throttle Button */}
            <button
              type="button"
              onMouseDown={handleStartRev}
              onMouseUp={handleStopRev}
              onMouseLeave={handleStopRev}
              onTouchStart={handleStartRev}
              onTouchEnd={handleStopRev}
              style={{
                width: '100%',
                padding: '0.55rem',
                background: isRevving
                  ? 'linear-gradient(135deg, #ef4444 0%, #ff6600 100%)'
                  : 'rgba(255, 102, 0, 0.15)',
                color: isRevving ? '#000000' : '#ff6600',
                border: '1px solid #ff6600',
                borderRadius: '2px',
                fontSize: '0.7rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                userSelect: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <Flame size={13} />
              {isRevving ? 'THROTTLE WIDE OPEN!' : 'HOLD TO REV (10K RPM)'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

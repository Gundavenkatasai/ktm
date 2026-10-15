import { useState } from 'react';
import { ATHLETES_ROSTER } from '../../data/ktmData';
import type { AthleteItem } from '../../types';
import { soundSystem } from '../../utils/audioSystem';
import { Trophy, Flag } from 'lucide-react';
import { CinematicReveal } from './CinematicReveal';

export const OurAthletesSection = () => {
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteItem | null>(null);

  return (
    <section
      id="athletes"
      style={{
        padding: '6rem 2rem',
        maxWidth: '1440px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Header */}
      <CinematicReveal threshold={0.08}>
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '1.5rem', maxWidth: '320px' }}>
          <div style={{ height: '3px', background: '#e62020', boxShadow: '0 0 10px #e62020', borderRadius: '1px' }} />
          <div style={{ height: '3px', background: '#ff5500', boxShadow: '0 0 10px #ff5500', borderRadius: '1px' }} />
          <div style={{ height: '3px', background: '#ff8800', boxShadow: '0 0 10px #ff8800', borderRadius: '1px' }} />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '1.5rem',
          }}
        >
          <div>
            <div
              style={{
                color: '#ff6600',
                fontFamily: 'Space Grotesk, monospace',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                marginBottom: '0.5rem',
              }}
            >
              // OUR ATHLETES
            </div>
            <h2
              className="font-racing"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 0.95,
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              FACTORY RACING <span style={{ color: '#ff6600' }}>ROSTER</span>
            </h2>
          </div>

          <p
            style={{
              maxWidth: '460px',
              fontSize: '0.85rem',
              color: '#8e8e9e',
              lineHeight: 1.5,
            }}
          >
            Redefining ultimate street-and-track boundaries. Our factory pilots push the limits of modern motorcycle physics in MotoGP, Dakar, and Extreme Enduro.
          </p>
        </div>
      </div>
      </CinematicReveal>

      {/* Athlete Cards */}
      <CinematicReveal delay={2} threshold={0.05}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {ATHLETES_ROSTER.map((athlete) => {
          const isSelected = selectedAthlete?.id === athlete.id;

          return (
            <div
              key={athlete.id}
              onClick={() => {
                soundSystem.playHapticClick(650, 0.04);
                setSelectedAthlete(isSelected ? null : athlete);
              }}
              className="glass-panel crosshair-corner"
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(230, 32, 32, 0.25) 0%, rgba(12, 12, 16, 0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(230, 32, 32, 0.08) 0%, rgba(10, 10, 14, 0.85) 100%)',
                border: isSelected ? '1px solid #ff6600' : '1px solid rgba(230, 32, 32, 0.2)',
                padding: '1.5rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Card Header Badge */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  fontSize: '0.75rem',
                  fontFamily: 'Space Grotesk, monospace',
                  fontWeight: 700,
                  color: '#ff6600',
                  letterSpacing: '0.12em',
                }}
              >
                <span>{athlete.badge}</span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    color: '#9999aa',
                    fontSize: '0.7rem',
                  }}
                >
                  <Flag size={12} /> {athlete.country}
                </span>
              </div>

              {/* Portrait & Big Racing Typography */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  marginBottom: '1.2rem',
                }}
              >
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    background: '#000000',
                    border: '1px solid rgba(255, 102, 0, 0.3)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={athlete.image}
                    alt={athlete.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.2)',
                    }}
                  />
                </div>

                <div>
                  <h3
                    className="font-racing"
                    style={{
                      fontSize: '1.8rem',
                      lineHeight: 1,
                      color: '#ffffff',
                      marginBottom: '0.3rem',
                    }}
                  >
                    {athlete.name}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#ff8833',
                      fontWeight: 700,
                      fontFamily: 'Space Grotesk, monospace',
                    }}
                  >
                    {athlete.series}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#888899', marginTop: '0.2rem' }}>
                    {athlete.team}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Metric */}
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.72rem',
                  color: '#a0a0b2',
                  fontFamily: 'Space Grotesk, monospace',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Trophy size={13} color="#ff6600" /> FACTORY RACER
                </span>
                <span style={{ color: '#ff6600', fontWeight: 700 }}>
                  {isSelected ? 'CLICK TO CLOSE' : 'VIEW PROFILE'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      </CinematicReveal>
    </section>
  );
};

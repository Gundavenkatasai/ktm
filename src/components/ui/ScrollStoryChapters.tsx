import { ExternalLink, CheckCircle2, ChevronRight, Shield, ArrowRight, Globe, Users } from 'lucide-react';
import type { Colorway, HotspotItem, ModelVariant } from '../../types';
import { COLORWAYS, HOTSPOTS, SPECIFICATIONS, OFFICIAL_LINKS } from '../../data/ktmData';
import { soundSystem } from '../../utils/audioSystem';

interface ScrollStoryChaptersProps {
  variant: ModelVariant;
  onSelectVariant: (v: ModelVariant) => void;
  currentColorway: Colorway;
  onSelectColorway: (c: Colorway) => void;
  activeHotspot: HotspotItem | null;
  onSelectHotspot: (h: HotspotItem | null) => void;
  onJumpToCamera: (position: [number, number, number], target: [number, number, number], fov?: number) => void;
}

export const ScrollStoryChapters: React.FC<ScrollStoryChaptersProps> = ({
  variant,
  onSelectVariant,
  currentColorway,
  onSelectColorway,
  activeHotspot,
  onSelectHotspot,
  onJumpToCamera,
}) => {
  return (
    <div style={{ position: 'relative', width: '100%', zIndex: 10 }}>
      {/* 
        CHAPTER: "TEAM GEAR" (Directly from Reference Video at 00:54 - 00:57)
        Features massive bold white athletic typography "TEAM GEAR" cutting behind the bike 
      */}
      <section
        id="chapter-silhouette"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '6rem 2rem',
          maxWidth: '1440px',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        {/* Massive Background Text "TEAM GEAR" cutting across */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.9,
          }}
        >
          <span
            className="font-racing"
            style={{
              fontSize: 'clamp(5rem, 15vw, 17rem)',
              lineHeight: 0.8,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              textShadow: '0 15px 50px rgba(0, 0, 0, 0.95)',
              display: 'inline-block',
              userSelect: 'none',
            }}
          >
            TEAM GEAR
          </span>
        </div>

        {/* Left Column Technical Specs Card (Matching Reference Video at 00:55) */}
        <div
          className="glass-panel crosshair-corner"
          style={{
            maxWidth: '520px',
            padding: '2.5rem',
            background: 'rgba(8, 8, 12, 0.88)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              color: '#ff6600',
              fontFamily: 'Space Grotesk, monospace',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              marginBottom: '0.75rem',
            }}
          >
            // TECH SPECS
          </div>

          <h2
            className="font-racing"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 0.95,
              color: '#ffffff',
              marginBottom: '1rem',
            }}
          >
            PRECISION <span style={{ color: '#ff6600' }}>CHROMIUM</span>
          </h2>

          <p
            style={{
              fontSize: '0.95rem',
              color: '#b0b0c2',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
            }}
          >
            Custom graphics execution. Crafted with precision curves and chromium hyper-pipe engineering. Built for riders who command the street with absolute mechanical superiority.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '1.25rem',
              marginBottom: '1.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.85rem', color: '#dddded' }}>
              <CheckCircle2 size={16} color="#ff6600" />
              <span>Chromium-Molybdenum space frame, powder-coated</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.85rem', color: '#dddded' }}>
              <CheckCircle2 size={16} color="#ff6600" />
              <span>Cast aluminum subframe with integrated airbox</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.85rem', color: '#dddded' }}>
              <CheckCircle2 size={16} color="#ff6600" />
              <span>190 PS @ 10,000 RPM // 145 Nm Torque</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="#shop"
              className="btn-ktm-primary"
              style={{ padding: '0.75rem 1.6rem', fontSize: '0.85rem' }}
            >
              Explore Gear <ArrowRight size={16} />
            </a>
            <button
              type="button"
              onClick={() => {
                soundSystem.playHapticClick(600, 0.04);
                onJumpToCamera([2.0, 0.85, 2.4], [0, 0.5, 0], 40);
              }}
              className="btn-ktm-secondary"
              style={{ padding: '0.75rem 1.2rem', fontSize: '0.85rem' }}
            >
              Align Front Camera
            </button>
          </div>
        </div>
      </section>

      {/* 
        CHAPTER: "BUILT FOR RIDERS" (Directly from Reference Video at 00:57 - 01:00)
        Features right-aligned editorial typography with global rider counter metrics
      */}
      <section
        id="chapter-form"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '6rem 2rem',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <div
          className="glass-panel crosshair-corner"
          style={{
            maxWidth: '560px',
            padding: '2.5rem',
            background: 'rgba(8, 8, 12, 0.88)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              color: '#ff6600',
              fontFamily: 'Space Grotesk, monospace',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              marginBottom: '0.5rem',
            }}
          >
            OPERATING GLOBALLY
          </div>

          <h2
            className="font-racing"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)',
              lineHeight: 0.9,
              color: '#ffffff',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            BUILT FOR <span style={{ color: '#ff6600' }}>RIDERS</span>
          </h2>

          <p
            style={{
              fontSize: '1rem',
              color: '#b0b0c2',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            Tested on international circuits, mastered on open mountain passes. Every single component of the 2026 KTM 1390 Super Duke is engineered for high-commitment riders who demand uncompromising throttle response and laser-precise corner entry.
          </p>

          {/* Telemetry Metrics from Video (12K+ Riders / 200+ Dealers) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.75rem',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '1.2rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.7rem',
                  color: '#88889a',
                  fontFamily: 'Space Grotesk, monospace',
                }}
              >
                <Users size={13} color="#ff6600" /> COMMUNITY
              </div>
              <div
                className="font-racing"
                style={{ fontSize: '2.2rem', color: '#ffffff', lineHeight: 1, marginTop: '4px' }}
              >
                12K+
              </div>
              <div style={{ fontSize: '0.72rem', color: '#ff6600', marginTop: '2px' }}>
                RIDERS GLOBALLY
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '1.2rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.7rem',
                  color: '#88889a',
                  fontFamily: 'Space Grotesk, monospace',
                }}
              >
                <Globe size={13} color="#ff6600" /> NETWORK
              </div>
              <div
                className="font-racing"
                style={{ fontSize: '2.2rem', color: '#ffffff', lineHeight: 1, marginTop: '4px' }}
              >
                200+
              </div>
              <div style={{ fontSize: '0.72rem', color: '#ff6600', marginTop: '2px' }}>
                OFFICIAL DEALERS
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundSystem.playHapticClick(600, 0.05);
              onJumpToCamera([0.1, 0.7, 3.4], [0, 0.55, 0], 35);
            }}
            className="btn-ktm-secondary"
            style={{ width: '100%' }}
          >
            Lock Side Profile Camera
          </button>
        </div>
      </section>



      {/* CHAPTER 03: THE MACHINE & HOTSPOTS */}
      <section
        id="chapter-machine"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '6rem 2rem',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <div style={{ maxWidth: '680px', marginBottom: '2.5rem' }}>
          <div className="tech-badge" style={{ marginBottom: '1rem' }}>
            CHAPTER 03 // 3D MECHANICAL HOTSPOTS
          </div>
          <h2
            className="font-racing"
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)',
              lineHeight: 0.95,
              color: '#ffffff',
              marginBottom: '0.75rem',
            }}
          >
            DISSECTING <span style={{ color: '#ff6600' }}>THE MACHINE</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#b0b0c2', lineHeight: 1.6 }}>
            Select any mechanical system below to command the 3D camera into an extreme close-up engineering inspection view.
          </p>
        </div>

        {/* Hotspot Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            maxWidth: '1440px',
            width: '100%',
          }}
        >
          {HOTSPOTS.map((hotspot) => {
            const isSelected = activeHotspot?.id === hotspot.id;

            return (
              <div
                key={hotspot.id}
                onClick={() => {
                  soundSystem.playHapticClick(650, 0.05);
                  if (isSelected) {
                    onSelectHotspot(null);
                  } else {
                    onSelectHotspot(hotspot);
                    onJumpToCamera(
                      hotspot.cameraView.position,
                      hotspot.cameraView.target,
                      hotspot.cameraView.fov
                    );
                  }
                }}
                className="glass-panel crosshair-corner"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  borderColor: isSelected ? '#ff6600' : 'rgba(255, 255, 255, 0.08)',
                  background: isSelected ? 'rgba(255, 102, 0, 0.08)' : 'rgba(12, 12, 16, 0.75)',
                  transform: isSelected ? 'translateY(-4px)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: isSelected ? '#ff6600' : '#88889a',
                    fontFamily: 'Space Grotesk, monospace',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}
                >
                  {hotspot.category}
                </div>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '0.65rem',
                    lineHeight: 1.25,
                  }}
                >
                  {hotspot.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: '#9999aa',
                    lineHeight: 1.5,
                    marginBottom: '1rem',
                  }}
                >
                  {hotspot.description}
                </p>
                <div
                  style={{
                    fontSize: '0.72rem',
                    color: '#ff7711',
                    background: 'rgba(255, 102, 0, 0.06)',
                    padding: '0.4rem 0.6rem',
                    borderLeft: '2px solid #ff6600',
                    fontFamily: 'Space Grotesk, monospace',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{hotspot.techSpec}</span>
                  <ChevronRight size={14} color="#ff6600" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CHAPTER 04: ENGINEERING & SUSPENSION COMPARISON (R vs EVO) */}
      <section
        id="chapter-engineering"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '6rem 2rem',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
          <div className="tech-badge" style={{ marginBottom: '1rem' }}>
            CHAPTER 04 // ENGINEERING DEEP-DIVE
          </div>
          <h2
            className="font-racing"
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)',
              lineHeight: 0.95,
              color: '#ffffff',
              marginBottom: '0.75rem',
            }}
          >
            CHASSIS ARCHITECTURE &amp; <span style={{ color: '#ff6600' }}>SUSPENSION</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#b0b0c2', lineHeight: 1.6 }}>
            Understand the mechanical vs. electronic distinction between the 2026 KTM 1390 Super Duke R and the Super Duke R EVO.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            width: '100%',
          }}
        >
          {/* STANDARD R ARCHITECTURE */}
          <div
            className="glass-panel crosshair-corner"
            style={{
              padding: '2rem',
              borderTop: variant === 'R' ? '3px solid #ff6600' : '1px solid rgba(255, 255, 255, 0.08)',
              background: variant === 'R' ? 'rgba(255, 102, 0, 0.04)' : 'rgba(10, 10, 14, 0.7)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>KTM 1390 SUPER DUKE R</span>
              <button
                type="button"
                onClick={() => {
                  soundSystem.playHapticClick(500, 0.04);
                  onSelectVariant('R');
                }}
                className={variant === 'R' ? 'btn-ktm-primary' : 'btn-ktm-secondary'}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
              >
                {variant === 'R' ? 'ACTIVE' : 'SELECT R'}
              </button>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#ff6600', fontFamily: 'Space Grotesk, monospace', marginBottom: '1rem' }}>
              WP APEX 48 MM SPLIT-CARTRIDGE (MANUAL)
            </div>
            <p style={{ fontSize: '0.9rem', color: '#a0a0b2', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Dedicated mechanical purist setup. Fully separate damping circuits where compression is tuned on the left fork leg and rebound damping on the right fork leg via easy-access clickers. The rear WP APEX monoshock provides separate high and low-speed compression adjustments.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#c0c0d2' }}>
              <li>✓ Split cartridge WP APEX 48 mm forks</li>
              <li>✓ Dual Compression Control (DCC) monoshock</li>
              <li>✓ 200.5 kg dry weight</li>
              <li>✓ Manual clicker adjustment on fork caps</li>
            </ul>
          </div>

          {/* EVO SEMI-ACTIVE ARCHITECTURE */}
          <div
            className="glass-panel crosshair-corner"
            style={{
              padding: '2rem',
              borderTop: variant === 'EVO' ? '3px solid #ff6600' : '1px solid rgba(255, 255, 255, 0.08)',
              background: variant === 'EVO' ? 'rgba(255, 102, 0, 0.04)' : 'rgba(10, 10, 14, 0.7)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>KTM 1390 SUPER DUKE R EVO</span>
              <button
                type="button"
                onClick={() => {
                  soundSystem.playHapticClick(650, 0.04);
                  onSelectVariant('EVO');
                }}
                className={variant === 'EVO' ? 'btn-ktm-primary' : 'btn-ktm-secondary'}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
              >
                {variant === 'EVO' ? 'ACTIVE' : 'SELECT EVO'}
              </button>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#ff6600', fontFamily: 'Space Grotesk, monospace', marginBottom: '1rem' }}>
              WP SEMI-ACTIVE TECHNOLOGY (SAT) GEN 2
            </div>
            <p style={{ fontSize: '0.9rem', color: '#a0a0b2', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Equipped with magnetic solenoid valving regulated by the Suspension Control Unit (SCU) and 6-axis IMU. Features 5 electronic modes (AUTO, COMFORT, RAIN, STREET, SPORT) with optional SUSPENSION PRO package adding anti-dive control and Factory Start launch rear drop.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#c0c0d2' }}>
              <li>✓ Gen 2 WP Semi-Active magnetic valving</li>
              <li>✓ Real-time adaptive electronic damping</li>
              <li>✓ 3 automatic preload levels (Low, Standard, High)</li>
              <li>✓ MotoGP-inspired Factory Start launch feature</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CHAPTER 05: PERFORMANCE SPECIFICATIONS */}
      <section
        id="chapter-performance"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '6rem 2rem',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
          <div className="tech-badge" style={{ marginBottom: '1rem' }}>
            CHAPTER 05 // VERIFIED SPECIFICATIONS
          </div>
          <h2
            className="font-racing"
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)',
              lineHeight: 0.95,
              color: '#ffffff',
              marginBottom: '0.75rem',
            }}
          >
            RAW NUMBERS. <span style={{ color: '#ff6600' }}>VERIFIED TRUTH.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#b0b0c2', lineHeight: 1.6 }}>
            Official international manufacturer data for the 2026 KTM 1390 Super Duke R and EVO.
          </p>
        </div>

        {/* Specifications Table */}
        <div
          className="glass-panel crosshair-corner"
          style={{
            overflowX: 'auto',
            padding: '1.5rem',
            background: 'rgba(10, 10, 14, 0.85)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '0.9rem',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <th style={{ padding: '1rem', color: '#888899', fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem' }}>SPECIFICATION</th>
                <th style={{ padding: '1rem', color: variant === 'R' ? '#ff6600' : '#ffffff', fontWeight: 800 }}>1390 SUPER DUKE R</th>
                <th style={{ padding: '1rem', color: variant === 'EVO' ? '#ff6600' : '#ffffff', fontWeight: 800 }}>1390 SUPER DUKE R EVO</th>
                <th style={{ padding: '1rem', color: '#888899', fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem' }}>SOURCE</th>
              </tr>
            </thead>
            <tbody>
              {SPECIFICATIONS.map((spec, idx) => (
                <tr
                  key={spec.label}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.015)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#ffffff' }}>
                    <div>{spec.label}</div>
                    <div style={{ fontSize: '0.75rem', color: '#777788', fontWeight: 400 }}>{spec.description}</div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 700, color: variant === 'R' ? '#ff6600' : '#dddded' }}>
                    {spec.valueR} <span style={{ fontSize: '0.75rem', color: '#888899' }}>{spec.unit}</span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 700, color: variant === 'EVO' ? '#ff6600' : '#dddded' }}>
                    {spec.valueEVO} <span style={{ fontSize: '0.75rem', color: '#888899' }}>{spec.unit}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <a
                      href={spec.verifiedSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        color: '#ff6600',
                        fontSize: '0.75rem',
                        textDecoration: 'none',
                        fontFamily: 'Space Grotesk, monospace',
                      }}
                    >
                      Official KTM <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CHAPTER 06: CHOOSE YOUR MACHINE / 3D COLORWAY CONFIGURATOR */}
      <section
        id="chapter-configurator"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '6rem 2rem',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
          <div className="tech-badge" style={{ marginBottom: '1rem' }}>
            CHAPTER 06 // REAL-TIME 3D CONFIGURATOR
          </div>
          <h2
            className="font-racing"
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)',
              lineHeight: 0.95,
              color: '#ffffff',
              marginBottom: '0.75rem',
            }}
          >
            CUSTOMIZE YOUR <span style={{ color: '#ff6600' }}>MACHINE</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#b0b0c2', lineHeight: 1.6 }}>
            Select official colorway profiles below to watch the 3D model update in real-time, or jump directly into the full KTM production configurator.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {COLORWAYS.map((c) => {
            const isSelected = currentColorway.id === c.id;

            return (
              <div
                key={c.id}
                onClick={() => {
                  soundSystem.playHapticClick(700, 0.05);
                  onSelectColorway(c);
                }}
                className="glass-panel crosshair-corner"
                style={{
                  padding: '1.75rem',
                  cursor: 'pointer',
                  borderColor: isSelected ? '#ff6600' : 'rgba(255, 255, 255, 0.08)',
                  background: isSelected ? 'rgba(255, 102, 0, 0.07)' : 'rgba(12, 12, 16, 0.75)',
                  transform: isSelected ? 'translateY(-4px)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: c.mainColor, border: '2px solid rgba(255,255,255,0.2)' }} />
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: c.secondaryColor, border: '2px solid rgba(255,255,255,0.2)' }} />
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: c.rimColor, border: '2px solid rgba(255,255,255,0.2)' }} />
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                  {c.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#9999aa', lineHeight: 1.5 }}>
                  {c.tagline}
                </p>

                <div
                  style={{
                    marginTop: '1.25rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: isSelected ? '#ff6600' : '#666677',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'Space Grotesk, monospace',
                  }}
                >
                  {isSelected ? '✓ APPLIED TO 3D MODEL' : 'CLICK TO APPLY'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to official KTM Configurator */}
        <div
          className="glass-panel"
          style={{
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            background: 'rgba(18, 18, 24, 0.85)',
            border: '1px solid rgba(255, 102, 0, 0.3)',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: '#ff6600', fontFamily: 'Space Grotesk, monospace', fontWeight: 700, letterSpacing: '0.12em' }}>
              OFFICIAL FACTORY BUILD
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
              Launch Full Official KTM Configurator
            </div>
            <div style={{ fontSize: '0.85rem', color: '#888899', marginTop: '0.3rem' }}>
              Customize official KTM PowerParts, Akrapovic titanium exhaust systems, CNC billet clamps, and luggage accessories.
            </div>
          </div>

          <a
            href={OFFICIAL_LINKS.officialConfigurator}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ktm-primary"
          >
            Open Factory Configurator <ExternalLink size={16} />
          </a>
        </div>
      </section>

      {/* CHAPTER 07: FINAL REVEAL & CALL TO ACTION */}
      <section
        id="chapter-reveal"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '6rem 2rem',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <div className="tech-badge" style={{ marginBottom: '1.5rem' }}>
          CHAPTER 07 // FINAL REVEAL
        </div>

        <h2
          className="font-racing"
          style={{
            fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
            lineHeight: 0.9,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}
        >
          THE NEXT MOVE<br />
          <span style={{ color: '#ff6600' }} className="racing-glow-orange">
            IS YOURS.
          </span>
        </h2>

        <p
          style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
            color: '#b0b0c2',
            maxWidth: '680px',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
          }}
        >
          190 horsepower. 145 Newton-meters. A savage hyper-naked machine waiting to dominate your road and track. Locate an authorized KTM dealer or configure your build today.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3.5rem' }}>
          <a
            href={OFFICIAL_LINKS.dealerLocator}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ktm-primary"
          >
            Locate Official Dealer <ExternalLink size={16} />
          </a>

          <a
            href={OFFICIAL_LINKS.modelOverview}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ktm-secondary"
          >
            Official KTM Model Page
          </a>
        </div>

        {/* Concept Art & 3D Model Disclosure */}
        <div
          style={{
            maxWidth: '720px',
            padding: '1.25rem',
            background: 'rgba(10, 10, 15, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.75rem',
            color: '#777788',
            lineHeight: 1.6,
            borderRadius: '4px',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff6600', fontWeight: 700, marginBottom: '0.3rem' }}>
            <Shield size={14} /> DIGITAL PRESENTATION &amp; ASSET ATTRIBUTION
          </div>
          <div>
            This interactive 3D digital launch experience is engineered as a creative technology production presentation. All motorcycle technical figures (1,350 cc, 190 PS, 145 Nm, 200.5 kg, WP SAT) are verified against official KTM international specifications. The interactive 3D prototype mesh utilizes the web-optimized motorcycle model by Poly by Google (CC-BY 3.0 via Poly Pizza). Concept studio imagery rendered with high-dynamic lighting. Full commercial production configurations remain exclusively through the official KTM portal.
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import type { ModelVariant } from '../../types';
import { soundSystem } from '../../utils/audioSystem';

interface FallbackViewProps {
  variant: ModelVariant;
  onSwitchTo3D: () => void;
}

export const FallbackView: React.FC<FallbackViewProps> = ({
  variant: _variant,
  onSwitchTo3D,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = [
    {
      src: '/images/hero-dark-studio.jpg',
      title: 'Dark Industrial Studio Hero',
      caption: 'Front 3/4 aggressive silhouette with illuminated predator LED headlight beam and dark wet floor reflections.',
    },
    {
      src: '/images/side-profile-dark.jpg',
      title: 'Predatory Side Profile & Trellis Geometry',
      caption: 'WP semi-active suspension stance, lightweight chromium-molybdenum frame, and single-sided swingarm.',
    },
    {
      src: '/images/engine-detail.jpg',
      title: '1,350 cc LC8 V-Twin Mechanical Macro',
      caption: 'Hydroformed titanium header pipes, laser-engraved billet clutch housing, and Cam Shift valve timing.',
    },
    {
      src: '/images/headlight-cockpit.jpg',
      title: 'Predator Split LED Headlight & Cockpit',
      caption: 'Hollow-core aggressive projector lenses with ambient daytime running light signature cutting through dark mist.',
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        overflow: 'hidden',
        background: '#050507',
      }}
    >
      {/* Background Cinematic Image with Subtle Zoom Parallax */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${images[activeImageIndex].src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: 'brightness(0.9) contrast(1.1)',
        }}
      />

      {/* Dark Vignette & Studio Lighting Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.2) 0%, rgba(5,5,7,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Gallery Controls & Info Card */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '2rem',
          right: '2rem',
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1.5rem',
          zIndex: 10,
        }}
      >
        <div
          className="glass-panel crosshair-corner"
          style={{
            maxWidth: '520px',
            padding: '1.75rem',
            background: 'rgba(8, 8, 12, 0.9)',
          }}
        >
          <div className="tech-badge" style={{ marginBottom: '0.6rem' }}>
            STUDIO PHOTOGRAPHY MODE // SHOT 0{activeImageIndex + 1}
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
            {images[activeImageIndex].title}
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#b0b0c2', lineHeight: 1.5, marginBottom: '1.2rem' }}>
            {images[activeImageIndex].caption}
          </p>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => {
                soundSystem.playHapticClick(600, 0.04);
                onSwitchTo3D();
              }}
              className="btn-ktm-primary"
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
            >
              Switch to Interactive 3D WebGL <ArrowRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => {
                soundSystem.toggleMute();
                soundSystem.revEngine();
              }}
              className="btn-ktm-secondary"
              style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}
            >
              <Flame size={14} color="#ff6600" /> Rev Engine
            </button>
          </div>
        </div>

        {/* Thumbnail Selector */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            background: 'rgba(10, 10, 15, 0.85)',
            padding: '0.6rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => {
                soundSystem.playHapticClick(500 + idx * 50, 0.03);
                setActiveImageIndex(idx);
              }}
              style={{
                width: '76px',
                height: '48px',
                border: activeImageIndex === idx ? '2px solid #ff6600' : '1px solid rgba(255, 255, 255, 0.15)',
                backgroundImage: `url(${img.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
                opacity: activeImageIndex === idx ? 1 : 0.6,
                transform: activeImageIndex === idx ? 'scale(1.05)' : 'none',
                transition: 'all 0.2s ease',
              }}
              title={img.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import type { Colorway, HotspotItem, ModelVariant } from '../../types';

interface CinematicRealBikeBackdropProps {
  inShowroomAisle: boolean;
  showroomScrollProgress: number; // 0 to 1
  activeChapter: string; // 'showroom' | 'shop' | 'athletes' | 'silhouette' | 'form' | 'machine' | 'engineering' | 'performance' | 'configurator' | 'reveal'
  activeHotspot: HotspotItem | null;
  currentColorway: Colorway;
  variant: ModelVariant;
}

export const CinematicRealBikeBackdrop: React.FC<CinematicRealBikeBackdropProps> = ({
  inShowroomAisle,
  showroomScrollProgress,
  activeChapter,
  activeHotspot,
  currentColorway: _currentColorway,
  variant: _variant,
}) => {
  // During the cinematic showroom walk & VIP lounge, the backdrop must be fully hidden
  // Those sections manage their own sticky full-viewport imagery
  if (inShowroomAisle) return null;

  // Real Motorcycle High-Resolution Photography Assets
  const photos = {
    showroom: '/images/showroom-10bikes-studio.jpg', // 10 Real Bikes parked on wet reflective floor
    hero: '/images/hero-single-dark.jpg',           // Real Front 3/4 KTM 1390 Super Duke R
    sideProfile: '/images/side-profile-dark.jpg',   // Real Side Profile Silhouette
    engine: '/images/engine-detail.jpg',            // Real 1,350 cc LC8 V-Twin Mechanical Macro
    headlight: '/images/headlight-cockpit.jpg',      // Real Split Predator LED Headlight
  };

  // Calculate dynamic scale and translation for showroom aisle glide
  const showroomScale = 1.0 + showroomScrollProgress * 0.15;
  const showroomTranslateY = -showroomScrollProgress * 25; // Subtle forward pan

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        overflow: 'hidden',
        background: '#040406',
        pointerEvents: 'none',
      }}
    >
      {/* 
        1. REAL 10-BIKE SHOWROOM WAREHOUSE PHOTO (Used during showroom aisle)
      */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${photos.showroom})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 48%',
          opacity: inShowroomAisle ? 1 : 0,
          transform: `scale(${showroomScale}) translateY(${showroomTranslateY}px)`,
          transition: inShowroomAisle ? 'transform 0.1s ease-out, opacity 0.6s ease' : 'opacity 0.6s ease',
          filter: 'contrast(1.12) brightness(0.95)',
        }}
      />

      {/* 
        2. REAL SINGLE-BIKE HERO / CHAPTER PHOTOS (Used across story chapters)
      */}
      {!inShowroomAisle && (
        <>
          {/* Side Profile Real Photo */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${photos.sideProfile})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: activeChapter === 'form' ? 1 : 0,
              transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: 'contrast(1.15) brightness(0.92)',
            }}
          />

          {/* Engine LC8 Macro Real Photo */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${photos.engine})`,
              backgroundSize: 'cover',
              backgroundPosition: activeHotspot ? '45% 55%' : 'center',
              opacity: activeChapter === 'machine' ? 1 : 0,
              transform: activeHotspot ? 'scale(1.12)' : 'scale(1.0)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: 'contrast(1.18) brightness(0.94)',
            }}
          />

          {/* Headlight Predator Real Photo */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${photos.headlight})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: activeChapter === 'engineering' ? 1 : 0,
              transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: 'contrast(1.15) brightness(0.92)',
            }}
          />

          {/* Hero Front 3/4 Real Photo (Default Chapter & Configurator) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${photos.hero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity:
                activeChapter !== 'form' &&
                activeChapter !== 'machine' &&
                activeChapter !== 'engineering'
                  ? 1
                  : 0,
              transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: 'contrast(1.14) brightness(0.93)',
            }}
          />
        </>
      )}

      {/* Cinematic Studio Vignette & Contrast Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.12) 0%, rgba(4,4,6,0.65) 75%, rgba(2,2,4,0.92) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Atmospheric Ambient Studio Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40vh',
          background: 'linear-gradient(to top, rgba(4,4,6,0.85) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

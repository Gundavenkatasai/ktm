import React, { useRef, useEffect, memo } from 'react';
import { MotorcycleCanvas } from '../canvas/MotorcycleCanvas';
import type { CameraState, Colorway, HotspotItem, ModelVariant } from '../../types';

interface CinematicScrollCanvasProps {
  activeChapterIndex: number;
  chapterProgress: number; // 0.0 to 1.0 within current chapter
  globalScrollProgress: number; // 0.0 to 1.0 across entire experience
  is3DMode: boolean;
  colorway: Colorway;
  variant: ModelVariant;
  cameraState: CameraState;
  activeHotspot: HotspotItem | null;
  onSelectHotspot: (hotspot: HotspotItem | null) => void;
  chassisXrayActive: boolean;
  isFreeOrbit: boolean;
  onAngleChange?: (deg: number) => void;
}

export const CinematicScrollCanvas: React.FC<CinematicScrollCanvasProps> = memo(({
  activeChapterIndex,
  chapterProgress,
  globalScrollProgress: _globalScrollProgress,
  is3DMode,
  colorway,
  variant,
  cameraState,
  activeHotspot,
  onSelectHotspot,
  chassisXrayActive,
  isFreeOrbit,
  onAngleChange,
}) => {
  // References to the 4 Google Flow video elements
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);
  const video4Ref = useRef<HTMLVideoElement>(null);

  // Smooth video seeking animation frame
  const targetTimeRef = useRef<{ [key: number]: number }>({ 0: 0, 1: 0, 2: 0, 3: 0 });
  const rafRef = useRef<number | null>(null);

  // Initialize and preload videos
  useEffect(() => {
    const videos = [video1Ref.current, video2Ref.current, video3Ref.current, video4Ref.current];
    videos.forEach((vid) => {
      if (!vid) return;
      vid.muted = true;
      vid.playsInline = true;
      vid.preload = 'auto';
      // Load first frame
      vid.currentTime = 0.01;
    });
  }, []);

  // Track last seek timestamps to avoid choking hardware decoders
  const lastSeekTimeRef = useRef<{ [key: number]: number }>({ 0: 0, 1: 0, 2: 0, 3: 0 });

  // Compute opacities for each video and 3D layer based on active chapter
  let opacityV1 = 0;
  let opacityV2 = 0;
  let opacityV3 = 0;
  let opacityV4 = 0;
  const opacity3D = is3DMode ? 1 : 0;

  if (!is3DMode) {
    if (activeChapterIndex === 0) {
      opacityV1 = 1;
    } else if (activeChapterIndex === 1) {
      if (chapterProgress < 0.45) {
        opacityV1 = 1;
        opacityV2 = 0;
      } else {
        const cross = Math.min(1, (chapterProgress - 0.45) / 0.15);
        opacityV1 = 1 - cross;
        opacityV2 = cross;
      }
    } else if (activeChapterIndex === 2) {
      opacityV2 = 1;
    } else if (activeChapterIndex === 3) {
      if (chapterProgress < 0.35) {
        opacityV2 = 1;
        opacityV3 = 0;
      } else {
        const cross = Math.min(1, (chapterProgress - 0.35) / 0.15);
        opacityV2 = 1 - cross;
        opacityV3 = cross;
      }
    } else if (activeChapterIndex === 4) {
      if (chapterProgress < 0.85) {
        opacityV3 = 1;
        opacityV4 = 0;
      } else {
        const cross = Math.min(1, (chapterProgress - 0.85) / 0.15);
        opacityV3 = 1 - cross;
        opacityV4 = cross;
      }
    } else if (activeChapterIndex === 5) {
      opacityV4 = 1;
    }
  }

  // Calculate target playback times based on active chapter and progress
  useEffect(() => {
    const p = Math.max(0, Math.min(1, chapterProgress));

    if (activeChapterIndex === 0) {
      // Scene 01: Hero poster spotlight -> slow push forward (0.0s to 4.8s)
      targetTimeRef.current[0] = p * 4.8;
    } else if (activeChapterIndex === 1) {
      // Scene 02: Push past bike into vast showroom
      if (p < 0.45) {
        const subP = p / 0.45;
        targetTimeRef.current[0] = 4.8 + subP * 4.4;
        targetTimeRef.current[1] = 0.01;
      } else {
        const subP = (p - 0.45) / 0.55;
        targetTimeRef.current[0] = 9.2;
        targetTimeRef.current[1] = subP * 4.2;
      }
    } else if (activeChapterIndex === 2) {
      // Scene 03: Architectural glass transition (Video 2: 4.2s to 7.0s)
      targetTimeRef.current[1] = 4.2 + p * 2.8;
    } else if (activeChapterIndex === 3) {
      // Scene 04: Engineering office discussion & workshop prototype
      if (p < 0.35) {
        const subP = p / 0.35;
        targetTimeRef.current[1] = 7.0 + subP * 2.3;
        targetTimeRef.current[2] = 0.01;
      } else {
        const subP = (p - 0.35) / 0.65;
        targetTimeRef.current[1] = 9.3;
        targetTimeRef.current[2] = subP * 6.5;
      }
    } else if (activeChapterIndex === 4) {
      // Scene 05: The Machine Revealed — Macro front brake disc, suspension, engine (Video 3: 6.5s -> 9.4s)
      targetTimeRef.current[2] = 6.5 + p * 2.8;
      targetTimeRef.current[3] = 0.01;
    } else if (activeChapterIndex === 5) {
      // Scene 06: Final Brand Moment — Complete motorcycle in dark studio spotlight (Video 4: 0s -> 9.3s)
      targetTimeRef.current[3] = p * 9.3;
    }
  }, [activeChapterIndex, chapterProgress]);

  // RequestAnimationFrame loop: Throttled, non-blocking, active-video-only scrub loop
  useEffect(() => {
    let active = true;

    const smoothScrubLoop = () => {
      if (!active) return;

      const now = performance.now();
      const videoItems = [
        { vid: video1Ref.current, idx: 0, opacity: opacityV1 },
        { vid: video2Ref.current, idx: 1, opacity: opacityV2 },
        { vid: video3Ref.current, idx: 2, opacity: opacityV3 },
        { vid: video4Ref.current, idx: 3, opacity: opacityV4 },
      ];

      for (const { vid, idx, opacity } of videoItems) {
        // Skip any video that is invisible (saves massive GPU decoding & bus overhead)
        if (!vid || vid.readyState < 2 || opacity <= 0.01) continue;

        const target = targetTimeRef.current[idx] ?? 0;
        const current = vid.currentTime;
        const diff = target - current;

        // Don't seek if frame is already aligned or decoder is busy seeking
        if (Math.abs(diff) < 0.02 || vid.seeking) continue;

        // Throttle seeking to ~35Hz (28ms) per video to prevent decoder stalls while staying responsive
        const lastSeek = lastSeekTimeRef.current[idx] || 0;
        if (now - lastSeek < 28) continue;

        lastSeekTimeRef.current[idx] = now;

        // Dynamic responsive step: faster catchup when scrolling with Lenis
        const step = current + diff * 0.65;

        // Use fastSeek if supported for large distance leaps
        if ('fastSeek' in vid && Math.abs(diff) > 0.45) {
          try {
            (vid as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(step);
          } catch {
            vid.currentTime = step;
          }
        } else {
          vid.currentTime = step;
        }
      }

      rafRef.current = requestAnimationFrame(smoothScrubLoop);
    };

    rafRef.current = requestAnimationFrame(smoothScrubLoop);

    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [opacityV1, opacityV2, opacityV3, opacityV4]);

  return (
    <div className={`cinematic-stage-fixed ${is3DMode ? 'interactive-3d' : ''}`}>
      {/* ── LAYER 0: VIDEO 1 (HERO POSTER & SHOWROOM ENTRY) ── */}
      <video
        ref={video1Ref}
        src="/videos/flow-01-hero-poster.mp4"
        poster="/images/flow-poster.jpg"
        muted
        playsInline
        preload="auto"
        className="cinematic-video-layer"
        style={{
          opacity: opacityV1,
          zIndex: opacityV1 > 0 ? 2 : 1,
        }}
      />

      {/* ── LAYER 1: VIDEO 2 (SHOWROOM RUNWAY & GLASS TRANSITION) ── */}
      <video
        ref={video2Ref}
        src="/videos/flow-02-showroom-office.mp4"
        poster="/images/flow-showroom-1.jpg"
        muted
        playsInline
        preload="auto"
        className="cinematic-video-layer"
        style={{
          opacity: opacityV2,
          zIndex: opacityV2 > 0 ? 3 : 1,
        }}
      />

      {/* ── LAYER 2: VIDEO 3 (ENGINEERING OFFICE & MACRO BRAKE DISC) ── */}
      <video
        ref={video3Ref}
        src="/videos/flow-03-office-workshop.mp4"
        poster="/images/flow-lounge.jpg"
        muted
        playsInline
        preload="auto"
        className="cinematic-video-layer"
        style={{
          opacity: opacityV3,
          zIndex: opacityV3 > 0 ? 4 : 1,
        }}
      />

      {/* ── LAYER 3: VIDEO 4 (FINAL DRAMATIC HERO REVEAL) ── */}
      <video
        ref={video4Ref}
        src="/videos/flow-04-final-reveal.mp4"
        poster="/images/hero-single-dark.jpg"
        muted
        playsInline
        preload="auto"
        className="cinematic-video-layer"
        style={{
          opacity: opacityV4,
          zIndex: opacityV4 > 0 ? 5 : 1,
        }}
      />

      {/* ── LAYER 4: REAL-TIME 3D THREE.JS WEBGL CANVAS ── */}
      <div
        className="cinematic-canvas-layer"
        style={{
          opacity: opacity3D,
          pointerEvents: is3DMode ? 'auto' : 'none',
          zIndex: is3DMode ? 10 : 1,
        }}
      >
        <MotorcycleCanvas
          colorway={colorway}
          variant={variant}
          cameraState={cameraState}
          isFreeOrbit={isFreeOrbit || is3DMode}
          activeHotspot={activeHotspot}
          onSelectHotspot={onSelectHotspot}
          showHotspots={true}
          chassisXrayActive={chassisXrayActive}
          onAngleChange={onAngleChange}
          showShowroomFleet={false}
          showCenterpiece={true}
        />
      </div>

      {/* ── ATMOSPHERIC VIGNETTE & SCANLINE OVERLAYS ── */}
      <div className="cinematic-vignette" />
      <div className="cinematic-grid-overlay" />
    </div>
  );
});

import { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/ui/Navigation';
import { CinematicScrollCanvas } from './components/cinematic/CinematicScrollCanvas';
import { CinematicScrollOverlays } from './components/cinematic/CinematicScrollOverlays';
import { ChapterProgressBar } from './components/ui/ChapterProgressBar';
import { TachometerHUD } from './components/ui/TachometerHUD';
import { SpecSheetModal } from './components/ui/SpecSheetModal';
import { TestRideModal } from './components/ui/TestRideModal';
import { CINEMATIC_CHAPTERS } from './data/chaptersData';
import { COLORWAYS } from './data/ktmData';
import type { CameraState, Colorway, HotspotItem, ModelVariant } from './types';
import { soundSystem } from './utils/audioSystem';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  // Cinematic scroll state
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [chapterProgress, setChapterProgress] = useState<number>(0);
  const [globalScrollProgress, setGlobalScrollProgress] = useState<number>(0);

  // 3D Model and Customization state
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [chassisXrayActive, setChassisXrayActive] = useState<boolean>(false);
  const [variant, setVariant] = useState<ModelVariant>('R');
  const [currentColorway, setCurrentColorway] = useState<Colorway>(COLORWAYS[0]);
  const [activeHotspot, setActiveHotspot] = useState<HotspotItem | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>({
    position: [2.4, 1.0, 2.8],
    target: [0, 0.5, 0],
    fov: 42,
  });

  // Modal dialog states
  const [specModalOpen, setSpecModalOpen] = useState<boolean>(false);
  const [testRideModalOpen, setTestRideModalOpen] = useState<boolean>(false);

  // Turntable angle tracker
  const [_turntableAngle, setTurntableAngle] = useState<number>(0);

  // Lenis instance ref
  const lenisRef = useRef<Lenis | null>(null);

  // Cached section bounds for layout-thrashing-free scroll calculations
  const sectionBoundsRef = useRef<{ id: string; top: number; height: number; bottom: number }[]>([]);

  const measureSections = useCallback(() => {
    const bounds = CINEMATIC_CHAPTERS.map((ch) => {
      const el = document.getElementById(`chapter-${ch.id}`);
      if (!el) {
        return { id: ch.id, top: 0, height: window.innerHeight * 1.8, bottom: window.innerHeight * 1.8 };
      }
      const top = el.offsetTop;
      const height = el.offsetHeight;
      return { id: ch.id, top, height, bottom: top + height };
    });
    sectionBoundsRef.current = bounds;
  }, []);

  // High-performance scroll calculation powered by Lenis + GSAP ScrollTrigger
  useEffect(() => {
    measureSections();

    // 1. Initialize Lenis with tailored inertia & luxury easing
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Drive Lenis on GSAP Ticker for zero-latency frame-perfect synchronization
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0); // Zero lag-smoothing delay during fast scrolls

    // 4. Update scroll progress and active chapters cleanly on Lenis scroll
    const handleScrollUpdate = () => {
      const scrollY = lenis.scroll;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const globalP = totalHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalHeight)) : 0;
      setGlobalScrollProgress(globalP);

      const bounds = sectionBoundsRef.current;
      if (!bounds || bounds.length === 0) return;

      const viewportPivot = scrollY + window.innerHeight * 0.45;

      for (let i = 0; i < bounds.length; i++) {
        const b = bounds[i];
        const isLast = i === bounds.length - 1;

        if (isLast || (viewportPivot >= b.top && viewportPivot < b.bottom)) {
          setActiveChapterIndex(i);
          const progressSpan = b.height;
          const scrolledIn = viewportPivot - b.top;
          setChapterProgress(Math.max(0, Math.min(1, scrolledIn / progressSpan)));
          break;
        }
      }

      if (globalP >= 0.99) {
        setActiveChapterIndex(CINEMATIC_CHAPTERS.length - 1);
        setChapterProgress(1);
      } else if (scrollY <= 15) {
        setActiveChapterIndex(0);
        setChapterProgress(0);
      }
    };

    lenis.on('scroll', handleScrollUpdate);

    const handleResize = () => {
      measureSections();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    setTimeout(() => {
      measureSections();
      handleScrollUpdate();
      ScrollTrigger.refresh();
    }, 60);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      window.removeEventListener('resize', handleResize);
    };
  }, [measureSections]);

  // Ultra-smooth jump to chapter using Lenis scrollTo
  const handleSelectChapter = useCallback((index: number) => {
    const targetChap = CINEMATIC_CHAPTERS[index];
    if (!targetChap) return;

    soundSystem.playHapticClick(520, 0.04);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#chapter-${targetChap.id}`, {
        duration: 1.25,
      });
    } else {
      const el = document.getElementById(`chapter-${targetChap.id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Hotspot selection updates 3D camera
  const handleSelectHotspot = useCallback((hotspot: HotspotItem | null) => {
    setActiveHotspot(hotspot);
    if (hotspot) {
      setCameraState(hotspot.cameraView);
      soundSystem.playHapticClick(680, 0.05);
    } else {
      setCameraState({
        position: [2.4, 1.0, 2.8],
        target: [0, 0.5, 0],
        fov: 42,
      });
    }
  }, []);

  // Is user at the opening hero poster (start of website)?
  const isAtOpeningPoster = activeChapterIndex === 0 && chapterProgress < 0.25;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#050507', color: '#ffffff' }}>
      {/* ── 1. GLOBAL NAVIGATION BAR (SLIDES IN ONCE USER STARTS SCROLLING) ── */}
      <div
        style={{
          opacity: isAtOpeningPoster ? 0 : 1,
          transform: isAtOpeningPoster ? 'translateY(-100%)' : 'translateY(0)',
          pointerEvents: isAtOpeningPoster ? 'none' : 'auto',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
        }}
      >
        <Navigation
          variant={variant}
          onSelectVariant={setVariant}
          is3DMode={is3DMode}
          onToggle3DMode={() => setIs3DMode((prev) => !prev)}
          activeChapterIndex={activeChapterIndex}
          onSelectChapter={handleSelectChapter}
          onOpenSpecs={() => setSpecModalOpen(true)}
          onOpenTestRide={() => setTestRideModalOpen(true)}
          onRevEngine={() => soundSystem.revEngine()}
        />
      </div>

      {/* ── 3D TURNTABLE FLOATING CONTROL BAR ── */}
      {is3DMode && (
        <div
          style={{
            position: 'fixed',
            top: '4.8rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 60,
            background: 'rgba(12, 12, 18, 0.92)',
            border: '1px solid rgba(255, 102, 0, 0.5)',
            padding: '0.6rem 1.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 102, 0, 0.25)',
            backdropFilter: 'blur(16px)',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: '#ff6600' }}>
              360° 3D ORBIT MODE
            </span>
            <span style={{ color: '#888899', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              // DRAG TO ROTATE
            </span>
          </div>

          <button
            type="button"
            onClick={() => setChassisXrayActive((prev) => !prev)}
            className="btn-ktm-secondary"
            style={{
              padding: '0.35rem 0.8rem',
              fontSize: '0.7rem',
              borderColor: chassisXrayActive ? '#ff6600' : 'rgba(255,255,255,0.2)',
              color: chassisXrayActive ? '#ff6600' : '#ffffff',
            }}
          >
            {chassisXrayActive ? 'X-RAY: ON' : 'X-RAY: OFF'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {COLORWAYS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCurrentColorway(c)}
                style={{
                  background: c.mainColor,
                  width: '20px',
                  height: '20px',
                  border: currentColorway.id === c.id ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                }}
                title={c.name}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIs3DMode(false)}
            className="btn-ktm-primary"
            style={{ padding: '0.35rem 0.9rem', fontSize: '0.7rem' }}
          >
            EXIT 3D VIEW
          </button>
        </div>
      )}

      {/* ── 2. PINNED BACKGROUND CINEMATIC STAGE (VIDEOS & 3D WEBGL) ── */}
      <CinematicScrollCanvas
        activeChapterIndex={activeChapterIndex}
        chapterProgress={chapterProgress}
        globalScrollProgress={globalScrollProgress}
        is3DMode={is3DMode}
        colorway={currentColorway}
        variant={variant}
        cameraState={cameraState}
        activeHotspot={activeHotspot}
        onSelectHotspot={handleSelectHotspot}
        chassisXrayActive={chassisXrayActive}
        isFreeOrbit={is3DMode}
        onAngleChange={setTurntableAngle}
      />

      {/* ── 3. SCROLL STORY OVERLAYS (6 CINEMATIC CHAPTERS) ── */}
      <main id="main-content">
        <CinematicScrollOverlays
          activeChapterIndex={activeChapterIndex}
          chapterProgress={chapterProgress}
          is3DMode={is3DMode}
          onToggle3DMode={() => setIs3DMode((prev) => !prev)}
          chassisXrayActive={chassisXrayActive}
          onToggleChassisXray={() => setChassisXrayActive((prev) => !prev)}
          currentColorway={currentColorway}
          onSelectColorway={setCurrentColorway}
          variant={variant}
          onSelectVariant={setVariant}
          onOpenSpecs={() => setSpecModalOpen(true)}
          onOpenTestRide={() => setTestRideModalOpen(true)}
          onRevEngine={() => soundSystem.revEngine()}
        />
      </main>

      {/* ── 4. VERTICAL CHAPTER TRACKER (DOTS 01-06) ── */}
      <div
        style={{
          opacity: isAtOpeningPoster ? 0 : 1,
          pointerEvents: isAtOpeningPoster ? 'none' : 'auto',
          transition: 'opacity 0.6s ease',
        }}
      >
        <ChapterProgressBar
          activeChapterIndex={activeChapterIndex}
          onSelectChapter={handleSelectChapter}
        />
      </div>

      {/* ── 5. REAL-TIME DIGITAL TACHOMETER & TELEMETRY COCKPIT ── */}
      <div
        style={{
          opacity: isAtOpeningPoster ? 0 : 1,
          transform: isAtOpeningPoster ? 'translateY(30px)' : 'translateY(0)',
          pointerEvents: isAtOpeningPoster ? 'none' : 'auto',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <TachometerHUD
          visible={true}
          telemetry={CINEMATIC_CHAPTERS[activeChapterIndex]?.telemetry}
          chapterTitle={CINEMATIC_CHAPTERS[activeChapterIndex]?.title}
        />
      </div>

      {/* ── 6. FULL SPECIFICATIONS MODAL ── */}
      <SpecSheetModal
        isOpen={specModalOpen}
        onClose={() => setSpecModalOpen(false)}
        variant={variant}
      />

      {/* ── 7. VIP TEST RIDE RESERVATION MODAL ── */}
      <TestRideModal
        isOpen={testRideModalOpen}
        onClose={() => setTestRideModalOpen(false)}
        variant={variant}
      />
    </div>
  );
}

export default App;

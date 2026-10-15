import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import { StudioLighting } from './StudioLighting';
import { MotorcycleModel } from './MotorcycleModel';
import { ProductHotspots } from './ProductHotspots';
import { CameraDirector } from './CameraDirector';
import { ShowroomHallway } from './ShowroomHallway';
import type { ShowroomBike } from '../../data/showroomData';
import type { CameraState, Colorway, HotspotItem, ModelVariant } from '../../types';

// Helper component inside Canvas to track and report orbital angle
const AzimuthTracker = ({
  onAngleChange,
}: {
  onAngleChange?: (angleDeg: number) => void;
}) => {
  useFrame(({ camera }) => {
    if (onAngleChange) {
      // Calculate angle on XZ plane relative to target (0,0,0)
      const rad = Math.atan2(camera.position.x, camera.position.z);
      const deg = Math.round((rad * 180) / Math.PI);
      const normalized = ((deg % 360) + 360) % 360;
      onAngleChange(normalized);
    }
  });
  return null;
};

interface MotorcycleCanvasProps {
  colorway: Colorway;
  variant: ModelVariant;
  cameraState: CameraState;
  isFreeOrbit: boolean;
  activeHotspot: HotspotItem | null;
  onSelectHotspot: (hotspot: HotspotItem | null) => void;
  showHotspots?: boolean;
  reducedMotion?: boolean;
  lightingPreset?: 'studio' | 'orange-rim' | 'blackout-laser';
  headlightBeamActive?: boolean;
  chassisXrayActive?: boolean;
  autoRotate?: boolean;
  rotateSpeed?: number;
  onAngleChange?: (angleDeg: number) => void;
  showShowroomFleet?: boolean;
  selectedShowroomBike?: ShowroomBike | null;
  onSelectShowroomBike?: (bike: ShowroomBike) => void;
  showCenterpiece?: boolean;
}

export const MotorcycleCanvas = ({
  colorway,
  variant,
  cameraState,
  isFreeOrbit,
  activeHotspot,
  onSelectHotspot,
  showHotspots = true,
  reducedMotion = false,
  lightingPreset = 'studio',
  headlightBeamActive = false,
  chassisXrayActive = false,
  autoRotate = false,
  rotateSpeed = 1.0,
  onAngleChange,
  showShowroomFleet = true,
  selectedShowroomBike = null,
  onSelectShowroomBike,
  showCenterpiece = true,
}: MotorcycleCanvasProps) => {
  const controlsRef = useRef<any>(null);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background:
          lightingPreset === 'blackout-laser'
            ? '#030305'
            : 'radial-gradient(ellipse at 50% 40%, #111118 0%, #050507 80%)',
        transition: 'background 0.5s ease',
      }}
    >
      <Canvas
        shadows
        frameloop={isFreeOrbit ? 'always' : 'never'}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 1.75)]}
        camera={{
          position: [2.2, 0.9, 2.6],
          fov: 42,
          near: 0.1,
          far: 60,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          {/* Atmospheric Studio Fog matching the misty warehouse photo */}
          <fog attach="fog" args={['#050508', 5, 28]} />

          {/* Studio Lighting System with Presets */}
          <StudioLighting
            rimColor={colorway.rimColor}
            preset={lightingPreset}
            headlightBeamActive={headlightBeamActive}
          />

          {/* Atmospheric Orange Kinetic Embers */}
          {!reducedMotion && lightingPreset !== 'blackout-laser' && (
            <Sparkles
              count={45}
              scale={[6, 4, 6]}
              size={1.8}
              speed={0.4}
              color="#ff6600"
              opacity={0.35}
            />
          )}

          {/* 3D Motorcycle Geometry with Real-time PBR Material Configuration */}
          {showCenterpiece && (
            <MotorcycleModel
              colorway={colorway}
              variant={variant}
              interactive={isFreeOrbit}
              chassisXrayActive={chassisXrayActive}
              headlightBeamActive={headlightBeamActive}
            />
          )}

          {/* 10-Bike Showroom Hallway & Pedestal Stands */}
          {showShowroomFleet && (
            <ShowroomHallway
              selectedBike={selectedShowroomBike}
              onSelectBike={onSelectShowroomBike || (() => {})}
              visible={showShowroomFleet}
            />
          )}

          {/* 3D Hotspot Spatial Annotations */}
          <ProductHotspots
            activeHotspot={activeHotspot}
            onSelectHotspot={onSelectHotspot}
            visible={showHotspots && !isFreeOrbit}
          />

          {/* Camera Trajectory & Focal Director */}
          <CameraDirector
            targetState={cameraState}
            isFreeOrbit={isFreeOrbit}
            reducedMotion={reducedMotion}
          />

          {/* Azimuth Angle Tracker */}
          <AzimuthTracker onAngleChange={onAngleChange} />

          {/* Free Orbit Controls for Interactive Product Exploration */}
          {isFreeOrbit && (
            <OrbitControls
              ref={controlsRef}
              enableDamping
              dampingFactor={0.06}
              minDistance={1.2}
              maxDistance={5.5}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2 + 0.05}
              target={[0, 0.5, 0]}
              autoRotate={autoRotate}
              autoRotateSpeed={0.8 * rotateSpeed}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

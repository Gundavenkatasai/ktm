import React from 'react';
import { ContactShadows } from '@react-three/drei';

interface StudioLightingProps {
  intensityMultiplier?: number;
  rimColor?: string;
  preset?: 'studio' | 'orange-rim' | 'blackout-laser';
  headlightBeamActive?: boolean;
}

export const StudioLighting: React.FC<StudioLightingProps> = ({
  intensityMultiplier = 1.0,
  rimColor = '#ff6600',
  preset = 'studio',
  headlightBeamActive = false,
}) => {
  // Preset lighting values
  const isBlackout = preset === 'blackout-laser';
  const isOrangeRim = preset === 'orange-rim';

  const ambientIntensity = isBlackout ? 0.08 : isOrangeRim ? 0.2 : 0.4 * intensityMultiplier;
  const keyIntensity = isBlackout ? 0.2 : isOrangeRim ? 1.0 : 2.8 * intensityMultiplier;
  const fillIntensity = isBlackout ? 0.1 : isOrangeRim ? 0.4 : 1.1 * intensityMultiplier;
  const rimIntensity = isBlackout ? 1.2 : isOrangeRim ? 7.5 : 4.2 * intensityMultiplier;
  const stripIntensity = isBlackout ? 0.4 : isOrangeRim ? 1.2 : 3.5 * intensityMultiplier;

  return (
    <>
      {/* Ambient Fill: Deep slate shadow definition */}
      <ambientLight intensity={ambientIntensity} color="#454555" />

      {/* Key Light: High directional cool white key cutting from front 3/4 */}
      <directionalLight
        position={[5, 7, 4]}
        intensity={keyIntensity}
        color="#f0f3fa"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Fill Light: Subtle cool fill from opposite side */}
      <directionalLight
        position={[-6, 4, -3]}
        intensity={fillIntensity}
        color="#65728a"
      />

      {/* Signature KTM Orange Rim Light: Rakes the spine, trellis frame, and rear tire */}
      <spotLight
        position={[-4, 3.5, 4.5]}
        intensity={rimIntensity}
        color={rimColor}
        angle={0.65}
        penumbra={0.8}
        distance={20}
      />

      {/* Overhead Studio Light Strip: Highlights fuel tank lines */}
      <rectAreaLight
        position={[0, 4, 0]}
        width={3}
        height={8}
        intensity={stripIntensity}
        color="#ffffff"
      />

      {/* Volumetric Predator Laser Projector Headlight Beam */}
      {headlightBeamActive && (
        <group position={[1.3, 0.9, 0]}>
          <spotLight
            position={[0, 0, 0]}
            target-position={[8, 0, 0]}
            intensity={9.5}
            color="#ffffff"
            angle={0.4}
            penumbra={0.5}
            distance={25}
          />
          <spotLight
            position={[0, 0, 0]}
            target-position={[8, 0, 0]}
            intensity={6.0}
            color="#ff6600"
            angle={0.6}
            penumbra={0.9}
            distance={20}
          />
        </group>
      )}

      {/* Ground Contact Shadows: Grounding the wheels realistically */}
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={isBlackout ? 0.95 : 0.85}
        scale={10}
        blur={1.8}
        far={4.5}
        resolution={1024}
        color="#030305"
      />
    </>
  );
};

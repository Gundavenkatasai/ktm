import React, { useState } from 'react';
import * as THREE from 'three';
import { MotorcycleModel } from './MotorcycleModel';
import { soundSystem } from '../../utils/audioSystem';
import type { ShowroomBike } from '../../data/showroomData';

interface ShowroomPedestalProps {
  bike: ShowroomBike;
  isSelected: boolean;
  onSelect: (bike: ShowroomBike) => void;
}

export const ShowroomPedestal: React.FC<ShowroomPedestalProps> = ({
  bike,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundSystem.playHapticClick(650, 0.05);
    onSelect(bike);
  };

  // Subtle lean angle matching real motorcycle parked on side stand in studio photo
  const leanRoll = -0.07;

  // Only the flagship centerpiece bike or the selected/hovered bike has the volumetric projector beam
  const showVolumetricBeam = isSelected || hovered || bike.id === '1390-r';

  return (
    <group position={bike.podiumPosition}>
      {/* Direct Overhead Studio Key Light */}
      <pointLight
        position={[0, 3.2, 0]}
        intensity={isSelected ? 8.0 : hovered ? 6.0 : 4.2}
        color="#ffffff"
        distance={10}
      />

      {/* Signature KTM Orange Trellis & Rim Underbody Glow: Reflects onto wet floor */}
      <pointLight
        position={[0, 0.35, 0]}
        intensity={isSelected ? 5.5 : hovered ? 4.5 : 3.5}
        color="#ff6600"
        distance={4.5}
      />

      {/* Front Wheel & Headlight Illuminator */}
      <pointLight
        position={[0.7 * Math.sin(bike.rotationY), 0.65, 0.7 * Math.cos(bike.rotationY)]}
        intensity={3.8}
        color="#f0f6ff"
        distance={5}
      />

      {/* 
        3D Motorcycle Parked Directly on Wet Reflective Concrete Floor
        Leaning on Kickstand with zero text overlays
      */}
      <group
        position={[0, 0, 0]}
        rotation={[0, bike.rotationY, leanRoll]}
        onClick={handleClick}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <MotorcycleModel
          colorway={{
            id: 'signature-orange',
            name: bike.name,
            tagline: bike.tagline,
            mainColor: bike.colorway.mainColor,
            secondaryColor: bike.colorway.secondaryColor,
            rimColor: bike.colorway.rimColor,
            frameColor: '#ff6600',
          }}
          variant="R"
          interactive={false}
          headlightBeamActive={showVolumetricBeam}
        />

        {/* Kickstand Leg touching the ground */}
        <mesh position={[-0.18, 0.18, -0.05]} rotation={[0.2, 0, 0.45]}>
          <cylinderGeometry args={[0.014, 0.018, 0.42, 16]} />
          <meshStandardMaterial color="#1a1a20" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Kickstand Base Footpad on wet floor */}
        <mesh position={[-0.26, 0.005, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.035, 16]} />
          <meshStandardMaterial color="#111116" roughness={0.4} metalness={0.8} />
        </mesh>
      </group>

      {/* Sleek, Realistic Volumetric Headlight Light Cone matching studio photo */}
      {showVolumetricBeam && (
        <group
          position={[0.55 * Math.sin(bike.rotationY), 0.68, 0.55 * Math.cos(bike.rotationY)]}
          rotation={[0, bike.rotationY, 0]}
        >
          {/* Subtle haze cone */}
          <mesh position={[0, -0.05, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.28, 2.8, 24, 1, true]} />
            <meshBasicMaterial
              color="#eef6ff"
              transparent
              opacity={0.06}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          {/* Inner bright projector beam core */}
          <mesh position={[0, -0.05, 1.0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.12, 2.0, 16, 1, true]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

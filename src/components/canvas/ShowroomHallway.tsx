import React from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';
import { SHOWROOM_BIKES } from '../../data/showroomData';
import type { ShowroomBike } from '../../data/showroomData';
import { ShowroomPedestal } from './ShowroomPedestal';

interface ShowroomHallwayProps {
  selectedBike: ShowroomBike | null;
  onSelectBike: (bike: ShowroomBike) => void;
  visible?: boolean;
}

export const ShowroomHallway: React.FC<ShowroomHallwayProps> = ({
  selectedBike,
  onSelectBike,
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* 
        WET REFLECTIVE INDUSTRIAL CONCRETE FLOOR
        Exact match to studio photo: Mirror puddle reflections of orange rims, frame & headlight
      */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[32, 44]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mirror={0.82}
          mixBlur={0.8}
          mixStrength={4.2}
          roughness={0.13}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#060609"
          metalness={0.92}
        />
      </mesh>

      {/* Showroom Center Aisle Subtle Guide Lines */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-1.8, 0.005, 0]}
      >
        <planeGeometry args={[0.03, 36]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.35} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[1.8, 0.005, 0]}
      >
        <planeGeometry args={[0.03, 36]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.35} />
      </mesh>

      {/* 
        INDUSTRIAL WAREHOUSE ARCHITECTURE (Exact match to hero-dark-studio.jpg)
      */}

      {/* 1. Yellow Industrial Crane Girder running horizontally across the ceiling */}
      <group position={[0, 5.1, 0]}>
        {/* Main yellow heavy I-beam girder */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[14, 0.55, 0.4]} />
          <meshStandardMaterial color="#c68a1a" roughness={0.55} metalness={0.65} />
        </mesh>
        {/* Lower flange steel rail */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[14.2, 0.06, 0.5]} />
          <meshStandardMaterial color="#1a1a20" roughness={0.4} metalness={0.85} />
        </mesh>
        {/* Upper flange */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[14.2, 0.06, 0.5]} />
          <meshStandardMaterial color="#b57b12" roughness={0.5} metalness={0.7} />
        </mesh>
        {/* Crane hoist carriage unit */}
        <mesh position={[-2.2, -0.45, 0]}>
          <boxGeometry args={[1.2, 0.35, 0.6]} />
          <meshStandardMaterial color="#222228" roughness={0.4} metalness={0.8} />
        </mesh>
      </group>

      {/* 2. Left Wall with Industrial Openings & Misty Window Bays */}
      <group position={[-7.2, 3, 0]}>
        {/* Solid warehouse outer wall segments */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.4, 6.5, 42]} />
          <meshStandardMaterial color="#0a0a0f" roughness={0.85} metalness={0.2} />
        </mesh>
      </group>

      {/* 3. Right Wall: Dark Industrial Concrete & Utility Conduits (Matching Photo's Right Side) */}
      <group position={[7.2, 3, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.4, 6.5, 42]} />
          <meshStandardMaterial color="#0c0c12" roughness={0.82} metalness={0.3} />
        </mesh>
        {/* Vertical industrial conduit pipes */}
        {[-8, -2, 4, 10].map((zPipe) => (
          <group key={`pipe-${zPipe}`} position={[-0.22, 0, zPipe]}>
            <mesh>
              <cylinderGeometry args={[0.04, 0.04, 6.2, 12]} />
              <meshStandardMaterial color="#2a2a34" roughness={0.4} metalness={0.85} />
            </mesh>
            {/* Junction box */}
            <mesh position={[0, 0.8, 0]}>
              <boxGeometry args={[0.12, 0.28, 0.22]} />
              <meshStandardMaterial color="#33333d" roughness={0.5} metalness={0.7} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 4. Left Volumetric Light Shafts Streaming Through Fog (Matching hero-dark-studio.jpg) */}
      {[-6, 0, 6].map((zShaft) => (
        <group key={`shaft-${zShaft}`} position={[-5.8, 4.2, zShaft]} rotation={[0.2, 0, -0.52]}>
          <mesh position={[2.5, -2.5, 0]}>
            <coneGeometry args={[1.6, 6.8, 16, 1, true]} />
            <meshBasicMaterial
              color="#d8e8f8"
              transparent
              opacity={0.045}
              blending={2} // THREE.AdditiveBlending
              side={2} // THREE.DoubleSide
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}

      {/* 5. Back Warehouse Wall */}
      <mesh position={[0, 3, -19]}>
        <boxGeometry args={[14.8, 6.5, 0.5]} />
        <meshStandardMaterial color="#07070b" roughness={0.9} metalness={0.15} />
      </mesh>

      {/* Vertical Steel I-Beam Stanchions along sides */}
      {[-10, -5, 0, 5, 10].map((zPos) => (
        <group key={`col-${zPos}`}>
          {/* Left Industrial Column */}
          <group position={[-6.2, 3, zPos]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.3, 6.2, 0.45]} />
              <meshStandardMaterial color="#111116" roughness={0.65} metalness={0.85} />
            </mesh>
            <mesh position={[0.18, 0, 0]}>
              <boxGeometry args={[0.05, 6.2, 0.65]} />
              <meshStandardMaterial color="#0c0c10" roughness={0.7} metalness={0.9} />
            </mesh>
            <mesh position={[-0.18, 0, 0]}>
              <boxGeometry args={[0.05, 6.2, 0.65]} />
              <meshStandardMaterial color="#0c0c10" roughness={0.7} metalness={0.9} />
            </mesh>
          </group>

          {/* Right Industrial Column */}
          <group position={[6.2, 3, zPos]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.3, 6.2, 0.45]} />
              <meshStandardMaterial color="#111116" roughness={0.65} metalness={0.85} />
            </mesh>
            <mesh position={[-0.18, 0, 0]}>
              <boxGeometry args={[0.05, 6.2, 0.65]} />
              <meshStandardMaterial color="#0c0c10" roughness={0.7} metalness={0.9} />
            </mesh>
            <mesh position={[0.18, 0, 0]}>
              <boxGeometry args={[0.05, 6.2, 0.65]} />
              <meshStandardMaterial color="#0c0c10" roughness={0.7} metalness={0.9} />
            </mesh>
          </group>

          {/* Overhead Structural Ceiling Crossbeam Truss */}
          <mesh position={[0, 5.6, zPos]}>
            <boxGeometry args={[12.8, 0.22, 0.25]} />
            <meshStandardMaterial color="#0f0f14" roughness={0.7} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Overhead Architectural Studio Light Fixtures */}
      {[-8, -4, 0, 4, 8].map((zPos) => (
        <group key={`light-${zPos}`} position={[0, 5.2, zPos]}>
          <mesh>
            <boxGeometry args={[11, 0.08, 0.15]} />
            <meshStandardMaterial color="#111116" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.04, 0]}>
            <boxGeometry args={[10.6, 0.02, 0.08]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Subtle Orange Accent Tips */}
          <mesh position={[-5.3, -0.04, 0]}>
            <boxGeometry args={[0.3, 0.03, 0.1]} />
            <meshBasicMaterial color="#ff6600" />
          </mesh>
          <mesh position={[5.3, -0.04, 0]}>
            <boxGeometry args={[0.3, 0.03, 0.1]} />
            <meshBasicMaterial color="#ff6600" />
          </mesh>
        </group>
      ))}

      {/* Distant Warm Incandescent Studio Lantern Glows in Fog (Matching Photo) */}
      <pointLight position={[-5, 2.5, -14]} intensity={1.5} color="#ff9933" distance={12} />
      <pointLight position={[5, 2.5, -14]} intensity={1.5} color="#ff9933" distance={12} />
      <pointLight position={[0, 3.5, 14]} intensity={1.2} color="#ffaa44" distance={10} />

      {/* 
        The 10 KTM Motorcycles Parked on the Wet Concrete Floor with Zero Text
      */}
      {SHOWROOM_BIKES.map((bike) => (
        <ShowroomPedestal
          key={bike.id}
          bike={bike}
          isSelected={selectedBike?.id === bike.id}
          onSelect={onSelectBike}
        />
      ))}
    </group>
  );
};

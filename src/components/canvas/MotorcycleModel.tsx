import { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Colorway, ModelVariant } from '../../types';

interface MotorcycleModelProps {
  colorway: Colorway;
  variant: ModelVariant;
  interactive?: boolean;
  chassisXrayActive?: boolean;
  headlightBeamActive?: boolean;
}

export const MotorcycleModel = ({
  colorway,
  variant: _variant,
  interactive: _interactive = false,
  chassisXrayActive = false,
  headlightBeamActive = false,
}: MotorcycleModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the web-optimized CC-BY separated motorcycle model
  const { nodes, materials } = useGLTF('/models/Motorcycle-Seperated.glb') as unknown as {
    nodes: {
      LightScreen: THREE.Mesh;
      Tires: THREE.Mesh;
      Aluminium: THREE.Mesh;
      Rims: THREE.Mesh;
      MainBody: THREE.Mesh;
      SecondaryBody: THREE.Mesh;
    };
    materials: {
      Mat: THREE.Material;
    };
  };

  // High-performance PBR materials memoized by colorway and X-Ray state
  const mainPaintMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorway.mainColor),
      roughness: chassisXrayActive ? 0.8 : 0.24,
      metalness: 0.45,
      transparent: chassisXrayActive,
      opacity: chassisXrayActive ? 0.25 : 1.0,
      envMapIntensity: 1.8,
    });
  }, [colorway.mainColor, chassisXrayActive]);

  const secondaryMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(chassisXrayActive ? '#ff5500' : colorway.secondaryColor),
      emissive: new THREE.Color(chassisXrayActive ? '#ff5500' : '#000000'),
      emissiveIntensity: chassisXrayActive ? 2.5 : 0,
      roughness: 0.35,
      metalness: 0.65,
      envMapIntensity: 1.4,
    });
  }, [colorway.secondaryColor, chassisXrayActive]);

  const rimsMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorway.rimColor),
      roughness: 0.18,
      metalness: 0.85,
      envMapIntensity: 2.0,
    });
  }, [colorway.rimColor]);

  const alloyMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#dcdde2'),
      roughness: 0.28,
      metalness: 0.92,
      envMapIntensity: 2.2,
    });
  }, []);

  const tireRubberMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#16161a'),
      roughness: 0.88,
      metalness: 0.08,
      envMapIntensity: 0.4,
    });
  }, []);

  const headlightGlassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      emissive: new THREE.Color('#ff6600'),
      emissiveIntensity: headlightBeamActive ? 4.5 : 0.8,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
    });
  }, [headlightBeamActive]);

  // Subtle natural idle suspension vibration
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime ?? state.clock.getElapsedTime();
      // Extremely subtle suspension breathe
      groupRef.current.position.y = Math.sin(t * 2.5) * 0.003;
    }
  });

  if (!nodes || !nodes.MainBody) {
    return null;
  }

  return (
    <group
      ref={groupRef}
      scale={0.024}
      position={[0, 0, 0]}
      rotation={[0, -Math.PI / 6, 0]}
      dispose={null}
    >
      {/* Predator Headlight & Windscreen */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LightScreen.geometry}
        material={headlightGlassMaterial || materials.Mat}
      />

      {/* High-Performance Tires (Michelin Power GP) */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tires.geometry}
        material={tireRubberMaterial}
      />

      {/* Machined Billet Aluminium Components (Engine casing, footpegs, triple tree) */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Aluminium.geometry}
        material={alloyMaterial}
      />

      {/* Lightweight Cast Alloy Rims */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rims.geometry}
        material={rimsMaterial}
      />

      {/* Main Bodywork (Fuel Tank, Front Cowling, Air Scoops) */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainBody.geometry}
        material={mainPaintMaterial}
      />

      {/* Trellis Space Frame & Secondary Subframe Components */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SecondaryBody.geometry}
        material={secondaryMaterial}
      />
    </group>
  );
};

useGLTF.preload('/models/Motorcycle-Seperated.glb');

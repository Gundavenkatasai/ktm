import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { CameraState } from '../../types';

interface CameraDirectorProps {
  targetState: CameraState;
  isFreeOrbit: boolean;
  reducedMotion?: boolean;
}

export const CameraDirector = ({
  targetState,
  isFreeOrbit,
  reducedMotion = false,
}: CameraDirectorProps) => {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(targetState.target[0], targetState.target[1], targetState.target[2]));
  const desiredPos = useRef(new THREE.Vector3(targetState.position[0], targetState.position[1], targetState.position[2]));
  const desiredTarget = useRef(new THREE.Vector3(targetState.target[0], targetState.target[1], targetState.target[2]));

  useFrame((_state, delta) => {
    if (isFreeOrbit) return;

    desiredPos.current.set(targetState.position[0], targetState.position[1], targetState.position[2]);
    desiredTarget.current.set(targetState.target[0], targetState.target[1], targetState.target[2]);

    const lerpSpeed = reducedMotion ? 1 : Math.min(delta * 2.8, 0.15);

    // Smooth spherical dampening to desired position
    camera.position.lerp(desiredPos.current, lerpSpeed);

    // Smooth tracking of focal target
    currentTarget.current.lerp(desiredTarget.current, lerpSpeed);
    camera.lookAt(currentTarget.current);

    if (targetState.fov && Math.abs((camera as THREE.PerspectiveCamera).fov - targetState.fov) > 0.1) {
      (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(
        (camera as THREE.PerspectiveCamera).fov,
        targetState.fov,
        lerpSpeed
      );
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

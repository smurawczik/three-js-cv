import * as THREE from "three";

export const createPerspectiveCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  return camera;
};

export const setCameraZPosition = (
  camera: THREE.PerspectiveCamera,
  position: THREE.Vector3
) => {
  camera.position.set(position.x, position.y, position.z);
};

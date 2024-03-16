import * as THREE from "three";

export const createPlane = (
  width: number,
  height: number,
  color: THREE.ColorRepresentation = 0x00ff00,
  isDebug = false
) => {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshPhongMaterial({
    color,
    wireframe: isDebug,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  return plane;
};

export const setPlanePosition = (
  plane: THREE.Mesh,
  position: THREE.Vector3
) => {
  plane.position.set(position.x, position.y, position.z);
};

export const setPlaneRotation = (plane: THREE.Mesh, rotation: THREE.Euler) => {
  plane.rotation.set(rotation.x, rotation.y, rotation.z);
};
export const setPlaneReceiveShadow = (
  plane: THREE.Mesh,
  receiveShadow: boolean
) => {
  plane.receiveShadow = receiveShadow;
};

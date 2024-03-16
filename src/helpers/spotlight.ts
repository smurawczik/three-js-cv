import * as THREE from "three";

export const createSpotlight = () => {
  const light = new THREE.SpotLight(0xffffff, 1000);
  light.position.set(0, 15, 0); // Position the light above the plane
  light.castShadow = true;
  light.angle = 0.5;
  light.penumbra = 0.7;
  light.decay = 2;
  light.distance = 200;
  return light;
};

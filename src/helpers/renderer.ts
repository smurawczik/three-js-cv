import * as THREE from "three";

export const createRenderer = () => {
  return new THREE.WebGLRenderer();
};

export const initializeRenderer = async (renderer: THREE.WebGLRenderer) => {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
};

export const render = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  renderer.render(scene, camera);
};

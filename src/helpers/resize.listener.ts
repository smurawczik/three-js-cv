import * as THREE from "three";

export const addResizeListener = async (
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera
) => {
  window.onresize = resizeListener(renderer, camera);
};

function resizeListener(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera
):
  | (((this: GlobalEventHandlers, ev: UIEvent) => any) &
      ((this: Window, ev: UIEvent) => any))
  | null {
  return () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
}

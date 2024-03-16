import { FBXLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export const loadDrummer = async (scene: THREE.Scene) => {
  let mixer: THREE.AnimationMixer | undefined = undefined;
  let drummer: THREE.Object3D | undefined = undefined;

  const loader = new FBXLoader();
  const gltf = await loader.loadAsync("./src/assets/playing_drums.fbx");

  drummer = gltf;
  gltf.scale.set(0.025, 0.025, 0.025);
  gltf.position.set(0, -1, 2);
  gltf.rotation.x = 0.05;
  gltf.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  mixer = new THREE.AnimationMixer(gltf);
  mixer.clipAction(gltf.animations[0]).play();
  scene.add(gltf);

  return { drummer, mixer };
};

export const circleDrummer = (drummer: THREE.Object3D, time: number) => {
  drummer.position.set(Math.sin(time / 2) * 3, -1, Math.cos(time / 2) * 3);
};

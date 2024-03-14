import "./global.css";

import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { FBXLoader } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();
let mixer: THREE.AnimationMixer | undefined = undefined;
let drummer: THREE.Object3D | undefined = undefined;
let t = 0;

init();

const planeGeometry = new THREE.PlaneGeometry(40, 20);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: "purple",
  side: THREE.DoubleSide,
});

// Create plane mesh
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2; // Rotate the plane to make it horizontal
plane.position.y = -1; // Move the plane slightly below the origin
plane.receiveShadow = true; // Enable shadows on the plane
scene.add(plane);

const spotLight = new THREE.SpotLight(0xffffff, 1000);
spotLight.position.set(0, 10, 0); // Position the spotlight above the plane
spotLight.castShadow = true;
spotLight.angle = 0.6;
spotLight.penumbra = 0.6;
spotLight.decay = 2;
spotLight.distance = 200;
scene.add(spotLight);

camera.position.z = 8;
camera.position.y = 2;

const loader = new FBXLoader();
loader.load("./src/assets/playing_drums.fbx", (gltf) => {
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
  drummer = gltf;
});

function animate() {
  requestAnimationFrame(animate);
  t += 0.01;
  const delta = clock.getDelta();

  if (drummer) {
    const timepassed = clock.getElapsedTime();
    drummer.position.set(
      Math.sin(timepassed / 2) * 3,
      -1,
      Math.cos(timepassed / 2) * 3
    );
  }

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}

function init() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  addStats();
  animate();

  window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 0, 20);
}

function addStats() {
  const stats = new Stats();
  document.body.appendChild(stats.dom);
  return stats;
}

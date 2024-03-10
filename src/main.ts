import "./global.css";

import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 2;
scene.add(cube);

const light = new THREE.PointLight(0xffffff, 100, 0);
light.position.set(0, 0, 10);
scene.add(light);

camera.position.z = 15;

const geometry2 = new THREE.PlaneGeometry(1, 1);
const m2 = new THREE.MeshBasicMaterial({
  color: 0xf3f4ff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry2, m2);
plane.rotation.x = 10;
scene.add(plane);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

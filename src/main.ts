import "./global.css";

import * as THREE from "three";
import { circleDrummer, loadDrummer } from "./custom-scene/drummer";
import { createPerspectiveCamera, setCameraZPosition } from "./helpers/camera";
import { createClock } from "./helpers/clock";
import {
  createPlane,
  setPlanePosition,
  setPlaneReceiveShadow,
  setPlaneRotation,
} from "./helpers/plane";
import { createRenderer, initializeRenderer, render } from "./helpers/renderer";
import { addResizeListener } from "./helpers/resize.listener";
import { createScene } from "./helpers/scene";
import { createStats, updateStats } from "./helpers/stats";
import { createSpotlight } from "./helpers/spotlight";

(async function () {
  const SCENE = createScene();
  const CAMERA = createPerspectiveCamera();
  const RENDERER = createRenderer();
  const CLOCK = createClock();
  const STATS = createStats();

  let drummerMixer: THREE.AnimationMixer | undefined = undefined;
  let drummer: THREE.Object3D | undefined = undefined;

  const PLANE = createPlane(40, 20, "purple", false);
  setPlanePosition(PLANE, new THREE.Vector3(0, -1, 0));
  setPlaneRotation(PLANE, new THREE.Euler(Math.PI / 2, 0, 0));
  setPlaneReceiveShadow(PLANE, true);
  SCENE.add(PLANE);

  const spotLight = createSpotlight();
  SCENE.add(spotLight);

  function animate() {
    requestAnimationFrame(animate);

    updateStats(STATS);

    const delta = CLOCK.getDelta();
    if (drummerMixer) drummerMixer.update(delta);

    if (drummer) circleDrummer(drummer, CLOCK.getElapsedTime());

    render(RENDERER, SCENE, CAMERA);
  }

  async function init() {
    // Set camera position
    setCameraZPosition(CAMERA, new THREE.Vector3(0, 2, 12));

    loadDrummer(SCENE).then((data) => {
      drummerMixer = data.mixer;
      drummer = data.drummer;
    });

    await initializeRenderer(RENDERER);
    await addResizeListener(RENDERER, CAMERA);

    animate();
  }

  await init();
})();

import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";

export class Stage {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  private renderer = new THREE.WebGLRenderer();

  constructor() {
    this.init();
  }

  public addPlane(
    width?: number,
    height?: number,
    color?: THREE.ColorRepresentation
  ) {
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: color ?? 0xffff00,
      side: THREE.DoubleSide,
    });

    // Create plane mesh
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2; // Rotate the plane to make it horizontal
    plane.position.y = -1; // Move the plane slightly below the origin
    plane.receiveShadow = true; // Enable shadows on the plane
    this.scene.add(plane);
  }

  public addSpotLight() {
    const spotLight = new THREE.SpotLight(0xffffff, 500);
    spotLight.position.set(0, 10, 0); // Position the spotlight above the plane
    spotLight.castShadow = true;
    spotLight.angle = 0.5;
    spotLight.penumbra = 0.6;
    spotLight.decay = 2;
    spotLight.distance = 100;
    this.scene.add(spotLight);
  }

  public animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  private init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    // this.scene.background = new THREE.Color(0xffff00);
    // this.scene.fog = new THREE.Fog(0xffff00, 0, 20);
  }

  public addStats() {
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    return stats;
  }

  public addHemiLight() {
    // const hemiLight = new THREE.HemisphereLight(0xffff00, 0x8d8d8d, 5);
    // hemiLight.position.set(0, 20, 0);
    // this.scene.add(hemiLight);
  }

  get Scene() {
    return this.scene;
  }

  get Camera() {
    return this.camera;
  }
}

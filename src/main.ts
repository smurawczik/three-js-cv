import { Stage } from "./Stage/Stage";
import "./global.css";

const stage = new Stage();
stage.addPlane(20, 20, "purple");
stage.addSpotLight();
stage.addHemiLight();
stage.Camera.position.z = 8;
stage.Camera.position.y = 2;

stage.animate();
stage.addStats();

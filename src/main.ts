import { Stage } from "./Stage/Stage";
import "./global.css";

const stage = new Stage();
stage.addPlane(20, 20, "purple");
stage.addSpotLight();
stage.addHemiLight();
stage.setUpCamera();
stage.addDrummer();

stage.animate();
stage.addStats();

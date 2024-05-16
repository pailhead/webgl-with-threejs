import "./style.css";

import {
  BoxGeometry,
  MeshBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer,
} from "three";
import { Scene } from "three";
import { Mesh } from "three";

//@ts-ignore
// import * as SPECTOR from "spectorjs";

// const spector = new SPECTOR.Spector();
// spector.displayUI();
// create a renderer and associate it with the web page
const renderer = new WebGLRenderer({ antialias: true });
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

//create a 3d world and a spectator
const scene = new Scene();

const aspect = window.innerWidth / window.innerHeight;
const camera = new PerspectiveCamera(60, aspect, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

//create a prop inside the 3d world
const boxGeometry = new BoxGeometry(1, 1, 1); //describe what it is
const boxMaterial = new MeshBasicMaterial({ color: 0xff0000 }); //describe how it looks

const box = new Mesh(boxGeometry, boxMaterial); //describe where it is in the world
scene.add(box);

//display on screen
// renderer.render(scene, camera);

let captured = false;
const animate = () => {
  requestAnimationFrame(animate);
  if (!captured) {
    captured = true;
    spector.startCapture(renderer.domElement);
    requestAnimationFrame(() => {
      renderer.render(scene, camera);
      spector.stopCapture();
    });
  } else {
    renderer.render(scene, camera);
  }
};
animate();

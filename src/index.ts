import * as THREE from 'three';
import { TextureLoader } from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let model1;
let model2;
let rectLight1;
let rectLight2;
let rectLight3;
let rectLight4;

const lightAngle1 = 0.25;
const lightAngle2 = 0.625;
const lightAngle3 = 0.5;
const lightAngle4 = 0.5;

const break1 = 992;
const break2 = 768;
const break3 = 480;

function getzoomshift() {
  if (window.innerWidth < break3) {
    return 0.05;
  }
  if (window.innerWidth < break2) {
    return 0.0475;
  }
  if (window.innerWidth < break1) {
    return 0.05;
  }
  return 0.0375;
}

let currentTime = 0;

const bumpTexture = new THREE.TextureLoader().load(
  'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/647e3b2d20158b64a0528928_bumpmap.jpg'
);

window.Webflow ||= [];
window.Webflow.push(() => {
  // console.log('hello');
  init3D();
});

function init3D() {
  // select container
  const viewport1 = document.querySelector('[data-3d="c"]');
  const parentElement1 = viewport1.parentElement; // Get the parent element for viewport1

  // console.log(viewport1);
  // console.log(parentElement1);

  // setting up scene

  const scene1 = new THREE.Scene();

  // setting up camera
  const aspectRatio1 = parentElement1.clientWidth / parentElement1.clientHeight;
  const camera1 = new THREE.OrthographicCamera(-aspectRatio1, aspectRatio1, 1, -1, 0.1, 1000);
  // const helper = new THREE.CameraHelper(camera1);
  // scene1.add(helper);

  // Zoom in or out with the camera

  camera1.zoom = 1; // Zoom in to half the original size
  camera1.position.set(-30, 0, 5);
  camera1.updateProjectionMatrix(); // Must call after changing properties of the camera1

  // setting up lights
  const dirLight = new THREE.DirectionalLight(0xfffffff, 0.00325);
  dirLight.position.set(10, 10, 10);
  scene1.add(dirLight);

  // rotating lights

  // RectAreaLightUniformsLib.init();

  // rectLight1 = new THREE.RectAreaLight(0xffffff, 0.225, 1, 1);
  // rectLight1.position.set(0, 0.25, 3);
  // rectLight1.lookAt(2, 0, 0);
  // scene1.add(rectLight1);

  // rectLight2 = new THREE.RectAreaLight(0xffffff, 0.125, 0.75, 0.75);
  // rectLight2.position.set(0, -0.25, 3);
  // rectLight2.lookAt(2, 1, 0);
  // scene1.add(rectLight2);

  // rectLight3 = new THREE.RectAreaLight(0xffffff, 0.05, 0.5, 0.5);
  // rectLight3.position.set(0, 0.25, 3);
  // rectLight3.lookAt(2, -1, 1);
  // scene1.add(rectLight3);

  // rectLight4 = new THREE.RectAreaLight(0xffffff, 0.05, 0.5, 0.5);
  // rectLight4.position.set(0, -0.25, 3);
  // rectLight4.lookAt(2, -1, 1);
  // scene1.add(rectLight4);

  // const rectLightHelper1 = new RectAreaLightHelper(rectLight1);
  // const rectLightHelper2 = new RectAreaLightHelper(rectLight2);
  // const rectLightHelper3 = new RectAreaLightHelper(rectLight3);
  // const rectLightHelper4 = new RectAreaLightHelper(rectLight4);
  // rectLight1.add(rectLightHelper1);
  // rectLight2.add(rectLightHelper2);
  // rectLight3.add(rectLightHelper3);
  // rectLight4.add(rectLightHelper4);

  // setting up renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  console.log(renderer);

  renderer.setSize(parentElement1.clientWidth, parentElement1.clientHeight);
  viewport1.appendChild(renderer.domElement);

  // Update renderer size on window resize
  window.addEventListener('resize', () => {
    renderer.setSize(parentElement1.clientWidth, parentElement1.clientHeight);
    camera1.aspect = parentElement1.clientWidth / parentElement1.clientHeight;
    camera1.updateProjectionMatrix();
    model1.scale.set(getzoomshift(), getzoomshift(), getzoomshift());
  });

  // Add controls
  const controls1 = new OrbitControls(camera1, renderer.domElement);
  controls1.enableDamping = true;

  // Add axes to the scene
  const axesHelper1 = new THREE.AxesHelper(6);
  scene1.add(axesHelper1);

  // animation setup
  const clock = new THREE.Clock();
  let mixer = null;

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    currentTime += delta;
    if (mixer !== null) {
      mixer.update(delta);
    }
    // controls1.update();
    // controls2.update();
    // const totalRunTime = 5.3;
    // const totalTime = 5;
    // const circumference = 2 * Math.PI;
    // const speed = circumference / totalTime;
    // const distance = speed * delta;

    // const radius = 4;

    // if (currentTime < totalTime) {
    //   lightAngle1 += distance;
    //   lightAngle2 += distance;
    //   lightAngle3 += distance;
    //   lightAngle4 += distance;

    //   rectLight1.position.x = radius * Math.sin(lightAngle1);
    //   rectLight1.position.z = 0.6725 + radius * Math.cos(lightAngle1);
    //   rectLight1.lookAt(2, 4, 0);
    //   rectLight2.position.x = radius * Math.sin(lightAngle2);
    //   rectLight2.position.z = 0.6725 + radius * Math.cos(lightAngle2);
    //   rectLight2.lookAt(2, 4, 0);
    //   rectLight3.position.x = radius * Math.sin(lightAngle3);
    //   rectLight3.position.z = 0.6725 + radius * Math.cos(lightAngle3);
    //   rectLight3.lookAt(2, -1, 1);
    //   rectLight4.position.x = radius * Math.sin(lightAngle4);
    //   rectLight4.position.z = 0.6725 + radius * Math.cos(lightAngle4);
    //   rectLight4.lookAt(2, -1, 1);
    // }
    // if (currentTime > totalRunTime) {
    //   currentTime = 0;
    // }
    renderer.render(scene1, camera1);
  }

  animate();

  // --- load 3d async
  const assets = load();
  assets.then((data) => {
    model1 = data.model1.scene;
    const { animations } = data.model1;
    // console.log(animations);

    const { texture } = data;

    const newMaterial = new THREE.MeshStandardMaterial({
      metalness: 0,
      roughness: 0.5,
      // map: texturefile,
    });

    // newMaterial.normalMap = normalTexture;
    newMaterial.bumpMap = bumpTexture;
    newMaterial.bumpScale = 0.0035;

    model1.traverse((node) => {
      if (node.isMesh) {
        node.material = newMaterial;
        node.material.needsUpdate = true;
        // console.log(node.material);
        // console.log('textureChange');
      }
    });

    // Position the model1

    model1.scale.set(getzoomshift(), getzoomshift(), getzoomshift());

    model1.translateY(-0.5125);
    model1.translateZ(0.6525);

    controls1.update();

    // initialize mixer after model1 is loaded
    mixer = new THREE.AnimationMixer(model1);
    animations.forEach((animation) => {
      const action = mixer.clipAction(animation);
      action.play();
    });

    scene1.add(model1);
    console.log('Model 1: ', model1); // log model2
  });
}

/* Loader Functions */
async function load() {
  model1 = await loadModel(
    'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/647df5310fe77bc6a9a42bd5_VASPnet-HomePage-HeroSection-3D%20Symbol%20Flowing%20Animation.-Transperancy%20Fix%20V2.glb.txt'
  );

  const texture = await loadTexture(
    'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/6463925c61d09e9e0d0a1415_VASPnet-MainTextureV4.png'
  );
  return { model1, texture };
}
const textureLoader = new THREE.TextureLoader();
const modelLoader = new GLTFLoader();

function loadTexture(url) {
  return new Promise((resolve) => {
    textureLoader.load(url, (data) => {
      data.needsUpdate = true;
      data.flipY = false;

      resolve(data);
    });
  });
}

function loadModel(url, id) {
  return new Promise((resolve, reject) => {
    modelLoader.load(url, (gltf) => {
      console.log(gltf);
      const { scene } = gltf;
      const { animations } = gltf;
      resolve({ scene, animations });
    });
  });
}

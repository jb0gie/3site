import "style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//spwn scene
const scene = new THREE.Scene();
//spwn camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//spwn renderer
const renderer = new THREE.WebGLRenderer({
  //link js to html via css id
  canvas: document.querySelector("#bg"),
});
//init render window dimens
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//place cam
camera.position.setZ(25);

//render
renderer.render(scene, camera);

//spwn geometry ++ material
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });

//spwn mesh && apply geometry ++ material
const torus = new THREE.Mesh(geometry, material);

//add mesh to scene
scene.add(torus);

//spwn pointlight
const pointLight = new THREE.PointLight(0xffffff);

//place pointlight
pointLight.position.set(5, 15, 5);

//spwn ambientlight
const ambientLight = new THREE.AmbientLight(0xffffff);

//add lights to scene
scene.add(pointLight, ambientLight);

//spwn pointlight helper
// const lightHelper = new THREE.PointLightHelper(pointLight);

//spwn grid helper
// const gridHelper = new THREE.GridHelper(200, 50);

//add helpers to scene
// scene.add(lightHelper, gridHelper);

//spwn camera controls
const controls = new OrbitControls(camera, renderer.domElement);

//spwn stars
function addStar() {
  //spwn geometry ++ material
  const geometry = new THREE.SphereGeometry(0.25, 14, 14);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  //spwn mesh && apply geometry ++ material0
  const star = new THREE.Mesh(geometry, material);

  //gen rand pos for each star
  const [x, y, z] = Array(5)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  //set star pos
  star.position.set(x, y, z);

  //add star to scene
  scene.add(star);
}
//spwn stars
Array(800).fill().forEach(addStar);
//spwn space texture
const spaceTexture = new THREE.TextureLoader().load("../images/space.jpeg");
//set space texture as scene background
scene.background = spaceTexture;
// spwn avatar texture
const b0gieTexture = new THREE.TextureLoader().load("../images/thumbnail.png");
// spwn avatar mesh
const b0gie = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: b0gieTexture })
);
//til rn i spwnd geometry ++ material before spwning mesh.
//it can b dun dis wei 2...inside mesh parenthez
//add b0gie to scene
scene.add(b0gie);
//spwn planet textures
const planetTexture = new THREE.TextureLoader().load(
  "../images/mercurymap.jpeg"
);
const planetNormTxture = new THREE.TextureLoader().load(
  "../images/mercurybump.jpeg"
);
//spwn planet
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: planetTexture,
    normalMap: planetNormTxture,
  })
);
//add planet to scene
scene.add(planet);
planet.position.z = 30;
planet.position.setX(-10);
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  planet.rotation.x += 0.05;
  planet.rotation.y += 0.075;
  planet.rotation.z += 0.05;

  b0gie.rotation.y += 0.01;
  b0gie.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
//update func
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}
//call animate func
animate();

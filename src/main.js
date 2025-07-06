import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import * as dat from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/build/dat.gui.module.js';

// Escena y cámara
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(5, 5, 10);

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Cubo base y clones
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const baseCube = new THREE.Mesh(geometry, material);

const cubos = [];
for (let i = 0; i < 5; i++) {
  const cubo = baseCube.clone();
  cubo.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  );
  cubo.castShadow = true;
  scene.add(cubo);
  cubos.push(cubo);
}

// Plano para sombras
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.ShadowMaterial({ opacity: 0.3 })
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -5;
plane.receiveShadow = true;
scene.add(plane);

// Luz ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// SpotLight
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(10, 15, 10);
spotLight.castShadow = true;
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.3;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);

// GUI para controlar SpotLight
const gui = new dat.GUI();
const lightFolder = gui.addFolder('SpotLight');

lightFolder.add(spotLight, 'intensity', 0, 5).name('Intensidad');
lightFolder.add(spotLight.position, 'x', -20, 20).name('Posición X');
lightFolder.add(spotLight.position, 'y', -20, 20).name('Posición Y');
lightFolder.add(spotLight.position, 'z', -20, 20).name('Posición Z');
lightFolder.add(spotLight, 'angle', 0, Math.PI / 2).name('Ángulo');
lightFolder.add(spotLight, 'penumbra', 0, 1).name('Penumbra');
lightFolder.open();

// Animación
function animate() {
  requestAnimationFrame(animate);
  cubos.forEach(cubo => {
    cubo.rotation.x += 0.01;
    cubo.rotation.y += 0.01;
  });
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

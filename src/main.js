import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// Cámara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 10);

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Cubo base
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const baseCube = new THREE.Mesh(geometry, material);

// Clonar cubos y distribuirlos
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

// Plano para recibir sombras
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.ShadowMaterial({ opacity: 0.3 })
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -5;
plane.receiveShadow = true;
scene.add(plane);

// Luz ambiental (suave, general)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// SpotLight (con sombras)
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(10, 15, 10);
spotLight.castShadow = true;
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.3;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);

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

// Ajuste al redimensionar ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Crear la escena y la cámara
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 10;

// Crear el renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear un cubo base
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const baseCube = new THREE.Mesh(geometry, material);

// Crear clones del cubo y colocarlos en posiciones aleatorias
const cubos = [];
for (let i = 0; i < 5; i++) {
  const cuboClonado = baseCube.clone();
  cuboClonado.position.set(
    (Math.random() - 0.5) * 10,  // x entre -5 y 5
    (Math.random() - 0.5) * 10,  // y entre -5 y 5
    (Math.random() - 0.5) * 10   // z entre -5 y 5
  );
  scene.add(cuboClonado);
  cubos.push(cuboClonado);
}

// Luz
const luz = new THREE.PointLight(0xffffff, 1);
luz.position.set(10, 10, 10);
scene.add(luz);

// Animación: rotar todos los cubos
function animate() {
  requestAnimationFrame(animate);
  cubos.forEach(cubo => {
    cubo.rotation.x += 0.01;
    cubo.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
}

animate();

// Resize automático
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

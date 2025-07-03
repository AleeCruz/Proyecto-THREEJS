import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

camera.position.set(5,5,5);

camera.lookAt(0,0,0);




//-------------------------------------------------------------

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const axesHelper = new THREE.axesHelper(5);
scene.add(axesHelper);






function animate() {

  cube.rotation.y += 0.01;

  renderer.render( scene, camera );

}
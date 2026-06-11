import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { AsciiEffect } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/effects/AsciiEffect.js';

// Cena
const scene = new THREE.Scene();

// Câmera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 15;

// Renderer normal
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// ASCII effect
const effect = new AsciiEffect(renderer, ' -ªlYSON', {
    resolution: 0.15,
    invert: true,
});
effect.setSize(window.innerWidth/1.5, window.innerHeight/1.5);

// estilização do ASCII
effect.domElement.style.fontFamily = '"Source Code Pro", monospace';
effect.domElement.style.fontSize = '8px';
effect.domElement.style.lineHeight = '8px';
effect.domElement.style.color = 'red';
effect.domElement.style.backgroundColor = 'black';

// adiciona no DOM
const container = document.getElementById('heart');
container.appendChild(effect.domElement);

// Criando shape de coração
const heartShape = new THREE.Shape();

heartShape.moveTo(0, 0);
heartShape.bezierCurveTo(0, 0, -1, -1.5, -2.5, -1.5);
heartShape.bezierCurveTo(-5, -1.5, -5, 1.5, -5, 1.5);
heartShape.bezierCurveTo(-5, 3.5, -3, 5.5, 0, 7);
heartShape.bezierCurveTo(3, 5.5, 5, 3.5, 5, 1.5);
heartShape.bezierCurveTo(5, 1.5, 5, -1.5, 2.5, -1.5);
heartShape.bezierCurveTo(1, -1.5, 0, 0, 0, 0);

// Extrusão (transforma 2D em 3D)
const geometry = new THREE.ExtrudeGeometry(heartShape, {
  depth: 1,
  bevelEnabled: true,
  bevelSegments: 4,
  steps: 4,
  bevelSize: 0.5,
  bevelThickness: 1
});

// Centraliza
geometry.center();

// Material
const material = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  roughness: 0.4,
  metalness: 0.3
});

// Mesh
const heart = new THREE.Mesh(geometry, material);
heart.rotation.x = Math.PI;
scene.add(heart);

// Luz
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Ajusta o tamanho quando a janela for redimensionada
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  effect.setSize(width / 1.5, height / 1.5);
});

// animação
function animate() {
  requestAnimationFrame(animate);

  heart.rotation.y += 0.005;

  effect.render(scene, camera);
}

animate();
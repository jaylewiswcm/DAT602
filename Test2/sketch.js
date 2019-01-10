// //Global variables
// var renderer, scene, camera, composer, octoMain, skeleton, particle;
// var bar01, bar02;

// var socket;
// var incomingData = 0;
// var interpIncomingData = 1;
// var col = 0;
// var oldData = 0;
// var lerping = true;
// var timer = 0;
// var c =
//   //Execute the two main functions when the page loads
//   (window.onload = function() {
//     init();
//     geometry();
//     animate();
//   });

// function init() {
//   //Configure renderer settings-------------------------------------------------
//   renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//   renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.autoClear = false;
//   renderer.setClearColor(0x000000, 0.0);
//   document.getElementById("canvas").appendChild(renderer.domElement);
//   //----------------------------------------------------------------------------

//   // Create an empty scene
//   scene = new THREE.Scene();

//   // Create a basic perspective camera
//   camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     1,
//     1000
//   );
//   camera.position.z = 400;
//   scene.add(camera);

//   // Create the lights
//   var ambientLight = new THREE.AmbientLight(0x999999, 0.7);
//   scene.add(ambientLight);

//   var lights = [];
//   lights[0] = new THREE.DirectionalLight(0x000000, 0.5);
//   lights[0].position.set(1, 0, 0);
//   lights[1] = new THREE.DirectionalLight(0xffffff, 1);
//   lights[1].position.set(0.75, 1, 0.5);
//   lights[2] = new THREE.DirectionalLight(0x000000, 0.7);
//   lights[2].position.set(-0.75, -1, 0.5);
//   scene.add(lights[0]);
//   scene.add(lights[1]);
//   scene.add(lights[2]);

//   window.addEventListener("resize", onWindowResize, false);

//   socket = io();
//   socket.on("ServerToClient", socketEvents);
//   //socket = io.connect('https://iot-network.herokuapp.com:3000');
//   socket = io.connect("http://localhost:3000");
//   socket.on("ServerToClient", socketEvents);
// }

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function geometry() {
//   //Create the geometric objects
//   octoMain = new THREE.Object3D();
//   skeleton = new THREE.Object3D();
//   scene.add(octoMain);
//   // scene.add(skeleton);

//   var geometryOcto = new THREE.IcosahedronGeometry(7, 1);
//   var geometrySkeleton = new THREE.IcosahedronGeometry(15, 1);

//   //Create the materials
//   var octoMaterial = new THREE.MeshPhongMaterial({
//     color: 0xffffff,
//     shading: THREE.FlatShading
//   });

//   // var skeletonMaterial = new THREE.MeshPhongMaterial({
//   //   color: 0xffffff,
//   //   wireframe: true,
//   //   side: THREE.DoubleSide
//   // });

//   //Add materials to the mesh - octoMesh, skeletonMesh
//   var octoMesh = new THREE.Mesh(geometryOcto, octoMaterial);
//   octoMesh.scale.x = octoMesh.scale.y = octoMesh.scale.z = 16;
//   octoMain.add(octoMesh);

//   var skeletonMesh = new THREE.Mesh(geometrySkeleton, skeletonMaterial);
//   skeletonMesh.scale.x = skeletonMesh.scale.y = skeletonMesh.scale.z = 10;
//   skeleton.add(skeletonMesh);
// }

// // Render Loop
// function animate() {
//   requestAnimationFrame(animate);

//   // if (incomingData != oldData) {
//   //   //if (lerping){
//   //   timer += 0.01;
//   //   interpIncomingData = lerp(oldData, incomingData, timer);
//   //   if (timer >= 1) {
//   //     lerping = false;
//   //     oldData = incomingData;
//   //     timer = 0;
//   //   }
//   //   //}
//   // }

//   //lerp(incomingData, interpIncomingData, 0.9)
//   for (var i = 0; i < 100; i++) {
//     if (incomingData > 25) {
//       octoMain.material.color.setHex(0x0000ff); // blue
//     } else {
//       octoMain.material.color.setHex(0xff0000); // red
//     }
//   }
//   octoMain.scale.x = octoMain.scale.y = octoMain.scale.z = interpIncomingData;

//   octoMain.rotation.x -= 0.002;
//   octoMain.rotation.y -= 0.003;
//   skeleton.rotation.x -= 0.001;
//   skeleton.rotation.y += 0.002;

//   // Render the scene
//   renderer.clear();
//   renderer.render(scene, camera);
// }
// animate();

// function socketEvents(message, c) {
//   incomingData = message;

//   // incomingData = incomingData.map(-3, 3, 0.2, 1.2);
//   console.log(incomingData);
// }

// // function colorChange(c) {
// //   if (incomingData => 25) {
// //     var c = 0xff0000;
// //   } else {
// //     c = 0x0000ff;
// //   }
// // }

// function lerp(a, b, x) {
//   return x * (b - a) + a;
// }

// Number.prototype.map = function(in_min, in_max, out_min, out_max) {
//   return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
// };

var socket;
var c;
var incomingData;

socket = io();
socket.on("ServerToClient", socketEvents);
//socket = io.connect('https://iot-network.herokuapp.com:3000');
socket = io.connect("http://localhost:3000");
socket.on("ServerToClient", socketEvents);

function socketEvents(message) {
  incomingData = message;
}

function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
}

function draw() {
  if (incomingData => 25) {
    c = color(255, 0, 0);
  }

  if (incomingData < 25) {
    c = color(0, 0, 255);
  }

  background(0);
  console.log(incomingData);
  console.log(c);
  translate(-150, -100, 0);
  normalMaterial();
  fill(c);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(70, 20);
  pop();
}

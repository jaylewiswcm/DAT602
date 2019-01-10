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
  translate(24, 0, 0);
  fill(c);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  sphere(70);
  pop();
}

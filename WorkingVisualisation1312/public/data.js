var socket;
var incomingData;
var data;

socket = io();
socket.on("ServerToClient", socketEvents);
//socket = io.connect('https://iot-network.herokuapp.com:3000');
socket = io.connect("http://localhost:3000");
socket.on("ServerToClient", socketEvents);

// mqttData();

function socketEvents(message) {
  incomingData = message;
}

// function mqttData() {
//   data = document.getElementById("data");

//   for (var i = 0; i < 10000; i++) {
//     console.log(incomingData);
//     document.getElementById("data").innerHTML = incomingData + "°C";
//   }
// }

// var x = 0;

// function go() {

//     if (x++ < 20) {
//         setTimeout(go, 2000);
//     }
// }

var x = 0;

function go() {
  
  document.getElementById("data").innerHTML = incomingData + "°C";
  if (x++ < 200) {
    setTimeout(go, 2000);
  }
}

go();

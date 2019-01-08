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

var x = 0;

function go() {
  var updatedData;

  if (incomingData == undefined) {
    updatedData = "N/A";
  } else {
    updatedData = incomingData;
  }

  document.getElementById("data").innerHTML = updatedData + "°C";
  if (x++ < 200) {
    setTimeout(go, 2000);
  }
}

go();

var mqtt = require("mqtt");
var MQTT_TOPIC = "temp";
var MQTT_HUMID = "humid";
var MQTT_ADDR = "mqtt://broker.i-dat.org:80";
var MQTT_PORT = 80;

var client = mqtt.connect(MQTT_ADDR);

var express = require("express");
var socket = require("socket.io");

//store the express functions to var app
var app = express();
//Create a server on localhost:3000
var server = app.listen(process.env.PORT || 3000);
app.use(express.static("public"));
console.log("Node is running on port 3000...");

//assign the server to the socket
var io = socket(server);

//MQTT
client.on("connect", function() {
  client.subscribe(MQTT_TOPIC, { qos: 1 });
  client.subscribe(MQTT_HUMID, { qos: 1 });
  //client1.publish(MQTT_TOPIC, '000');
});

client.on("message", function(topic, message) {
  let getNum = parseInt(message.toString());
  console.log(topic + ": " + getNum);
  io.sockets.emit("ServerToClient", getNum);
  //io.sockets.on('connection', function (socket) {
  //  socket.broadcast.emit(getNum);
  //});
  //client.end();
});

// //MQTT
// client.on("connect", function() {
//   client.subscribe(MQTT_HUMID, { qos: 1 });
//   //client1.publish(MQTT_TOPIC, '000');
// });

// client.on("message2", function(topi, message2) {
//   let getNum2 = parseInt(message2.toString());
//   //   console.log("Humidity: " + getNum2);
//   io.sockets.emit("ServerToClient", getNum2);
//   //io.sockets.on('connection', function (socket) {
//   //  socket.broadcast.emit(getNum);
//   //});
//   //client.end();
// });

/*
client.on('error', function(){
    console.log("ERROR")
    client.end()
})
client.on('offline', function() {
    console.log("offline");
});

client.on('reconnect', function() {
    console.log("reconnect");
});
*/

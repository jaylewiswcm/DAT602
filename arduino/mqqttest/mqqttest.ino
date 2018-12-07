#include <WiFi.h>
#include "PubSubClient.h"

#include "dht.h"
#define dht_dpin 2 // Analog Pin sensor is connected to

//Sensor
dht DHT;
// Update these with values suitable for your network.
byte mac[] = { 0xDE, 0xED, 0xBA, 0xFE, 0xFE, 0xED };
//byte server[] = { 10, 0, 1, 3 };

//char server[] = "broker.i-dat.org";
char server[] = "46.101.82.167";

char ssid[] = "iPhone"; // your network SSID (name)
char pass[] = "arduino23"; // your network password
char topic[] = "data/temphumid";
int status = WL_IDLE_STATUS; // the Wifi radio's status

char pubChars[50];
char pubChars2[50];

void callback(char* topic, byte* payload, unsigned int length) {
  // handle message arrived
}

WiFiClient wfClient;
PubSubClient client(server, 80, callback, wfClient);

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ArduinoClient1")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
     // client.publish("humid", "000");
      // ... and resubscribe
     // client.subscribe("humid");
 
            client.publish("temp", "000");
            
      // ... and resubscribe
     client.subscribe("temp");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(9600);
// checks to see if wifi shield is connected
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    while (true);
  }

  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);
    delay(5000);
  }

  Serial.println("You're connected to the network");
  printWifiData();
  printCurrentNet();
}

void loop() {
// reading the temperature and humidity sensor
   DHT.read11(dht_dpin);
  if (client.connect("ArduinoClient1")) {

    
int temp = DHT.temperature;
//int humid = DHT.humidity;

    
    
   
    
    delay(1000);//Wait 5 seconds before accessing sensor again.
 

    String pubString = "" + String(temp);
    pubString.toCharArray(pubChars, pubString.length() + 1);

    
   // String pubString2 = "" + String(humid);
   // pubString2.toCharArray(pubChars2, pubString2.length() + 1);
    

    
    client.publish("temp", pubChars);
    
    Serial.println(temp);


    // client.publish("humid", pubChars2);
 
   // Serial.println(humid);

    
  } else {
    //Serial.println("Client can't connect!");
    reconnect();
  }
  client.loop();
  delay(1000);
}

void printWifiData() {
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
  byte mac[6];
  WiFi.macAddress(mac);
  Serial.print("MAC address: ");
  Serial.print(mac[5], HEX);
  Serial.print(":");
  Serial.print(mac[4], HEX);
  Serial.print(":");
  Serial.print(mac[3], HEX);
  Serial.print(":");
  Serial.print(mac[2], HEX);
  Serial.print(":");
  Serial.print(mac[1], HEX);
  Serial.print(":");
  Serial.println(mac[0], HEX);
}

void printCurrentNet() {
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
  byte bssid[6];
  WiFi.BSSID(bssid);
  Serial.print("BSSID: ");
  Serial.print(bssid[5], HEX);
  Serial.print(":");
  Serial.print(bssid[4], HEX);
  Serial.print(":");
  Serial.print(bssid[3], HEX);
  Serial.print(":");
  Serial.print(bssid[2], HEX);
  Serial.print(":");
  Serial.print(bssid[1], HEX);
  Serial.print(":");
  Serial.println(bssid[0], HEX);
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.println(rssi);
  byte encryption = WiFi.encryptionType();
  Serial.print("Encryption Type:");
  Serial.println(encryption, HEX);
}

#include <Wire.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

const char *ssid = "4G-DATA";
const char *password = "Data1994";
#define L1R 4
#define L1O 2
#define L1G 5
#define L2R 19
#define L2O 21
#define L2G 18

WebServer server(80);

int lo_b = 0, lo_auto = 1, lo_red = 0, lo_people = 0;

void L1blink() {
  digitalWrite(L1R, HIGH);
  digitalWrite(L1O, HIGH);
  digitalWrite(L1G, HIGH);
  delay(1000);
  digitalWrite(L1R, LOW);
  digitalWrite(L1O, LOW);
  digitalWrite(L1G, LOW);
  delay(1000);
}

void L2blink() {
  digitalWrite(L2R, HIGH);
  digitalWrite(L2O, HIGH);
  digitalWrite(L2G, HIGH);
  delay(1000);
  digitalWrite(L2R, LOW);
  digitalWrite(L2O, LOW);
  digitalWrite(L2G, LOW);
  delay(1000);
}

void all_off() {
  digitalWrite(L1R, LOW);
  digitalWrite(L1O, LOW);
  digitalWrite(L1G, LOW);
  digitalWrite(L2R, LOW);
  digitalWrite(L2O, LOW);
  digitalWrite(L2G, LOW);
}

void LOblink() {
  if (lo_b == 1) {
    all_off();
    digitalWrite(L1O, HIGH);
    digitalWrite(L2O, HIGH);
    delay(1000);
    digitalWrite(L1O, LOW);
    digitalWrite(L2O, LOW);
    delay(1000);
  }
}

void light_red() {
  if (lo_red == 1) {
    digitalWrite(L1R, HIGH);
    digitalWrite(L2R, HIGH);
    digitalWrite(L1O, LOW);
    digitalWrite(L1G, LOW);
    digitalWrite(L2O, LOW);
    digitalWrite(L2G, LOW);
  }
}

void light_people() {
  if (lo_people == 1) {
    digitalWrite(L1R, LOW);
    digitalWrite(L2G, LOW);
    digitalWrite(L1O, HIGH);
    digitalWrite(L2O, HIGH);
    digitalWrite(L2R, LOW);
    digitalWrite(L1G, LOW);
    delay(1000);
    digitalWrite(L1R, HIGH);
    digitalWrite(L2G, HIGH);
    digitalWrite(L1O, LOW);
    digitalWrite(L2O, LOW);
    digitalWrite(L2R, LOW);
    digitalWrite(L1G, LOW);
    delay(10000);
    lo_auto = 1;
  }
}

void light_auto() {
  if (lo_auto == 1) {
    digitalWrite(L1R, HIGH);
    digitalWrite(L2G, HIGH);
    digitalWrite(L1O, LOW);
    digitalWrite(L2O, LOW);
    digitalWrite(L2R, LOW);
    digitalWrite(L1G, LOW);
    delay(5000);
    digitalWrite(L1R, LOW);
    digitalWrite(L2G, LOW);
    digitalWrite(L1O, HIGH);
    digitalWrite(L2O, HIGH);
    digitalWrite(L2R, LOW);
    digitalWrite(L1G, LOW);
    delay(1000);
    digitalWrite(L1O, LOW);
    digitalWrite(L2O, LOW);
    digitalWrite(L2R, HIGH);
    digitalWrite(L1G, HIGH);
    digitalWrite(L1O, LOW);
    digitalWrite(L2O, LOW);
    delay(5000);
    digitalWrite(L1R, LOW);
    digitalWrite(L2G, LOW);
    digitalWrite(L1O, HIGH);
    digitalWrite(L2O, HIGH);
    digitalWrite(L2R, LOW);
    digitalWrite(L1G, LOW);
    delay(1000);
  }
}

void control_accident() {

  StaticJsonDocument<200> jsonDoc;
  jsonDoc["result"] = "done";
  lo_b = 0;
  lo_auto = 0;
  lo_red = 1;
  lo_people = 0;
  String jsonString;
  serializeJson(jsonDoc, jsonString);

  server.send(200, "application/json", jsonString);
}

void control_auto() {

  StaticJsonDocument<200> jsonDoc;
  jsonDoc["result"] = "done";
  lo_b = 0;
  lo_auto = 1;
  lo_red = 0;
  lo_people = 0;
  String jsonString;
  serializeJson(jsonDoc, jsonString);

  server.send(200, "application/json", jsonString);
}

void control_blink() {

  StaticJsonDocument<200> jsonDoc;
  jsonDoc["result"] = "done";
  lo_b = 1;
  lo_auto = 0;
  lo_red = 0;
  lo_people = 0;
  String jsonString;
  serializeJson(jsonDoc, jsonString);

  server.send(200, "application/json", jsonString);
}

void control_people() {

  StaticJsonDocument<200> jsonDoc;
  jsonDoc["result"] = "done";
  lo_b = 0;
  lo_auto = 0;
  lo_red = 0;
  lo_people = 1;
  String jsonString;
  serializeJson(jsonDoc, jsonString);

  server.send(200, "application/json", jsonString);
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  pinMode(L1R, OUTPUT);
  pinMode(L1O, OUTPUT);
  pinMode(L1G, OUTPUT);
  pinMode(L2R, OUTPUT);
  pinMode(L2O, OUTPUT);
  pinMode(L2G, OUTPUT);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  L1blink();
  L2blink();
  all_off();
  Serial.println("Connected!");
  server.on("/light_red", control_accident);
  server.on("/light_people", control_people);
  server.on("/auto", control_auto);
  server.on("/night", control_blink);
  server.begin();

  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // put your main code here, to run repeatedly:
  light_red();
  LOblink();
  light_auto();
  light_people();
  server.handleClient();
}

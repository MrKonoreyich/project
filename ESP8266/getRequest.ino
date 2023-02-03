#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
WiFiClient wifiClient;
const char* ssid = "ssid";
const char* password = "pass";
 
void setup () {
 
  Serial.begin(9600);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
 
    delay(1000);
    Serial.print("Connecting..");
 
  }
 
}
 
void loop() {
 
  if (WiFi.status() == WL_CONNECTED) { //чекает подключение
 
    HTTPClient http;  
 
    http.begin(wifiClient, "http://jsonplaceholder.typicode.com/users/1");  //куда реквест
    int httpCode = http.GET();                                 =
 
    if (httpCode > 0) { //если чето вернулось 
 
      String payload = http.getString();   //получаем пейлод
      Serial.println(payload);             //выводим
 
    }
 
    http.end();   //закрываем коннекшн
 
  }
 
  delay(30000);    //каждые 30 секунд повторяем 
}

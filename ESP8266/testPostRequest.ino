#include <Arduino_JSON.h>

#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char *WIFI_SSID = "Izobretay_Luxury";
const char *WIFI_PASSWORD = "SkazhiteI";
const char *URL = "http://10.71.0.84:5000/api/data";

WiFiClient client;
HTTPClient httpClient;

void setup()
{
    Serial.begin(9600);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("Connected");
}

void loop()
{
    String data = "name=John&age=20";
    JSONVar jsonvar = JSON.parse(data);

    httpClient.begin(client, URL);
    httpClient.addHeader("Content-Type", "application/x-www-form-urlencoded");
    httpClient.POST(jsonvar);
    String content = httpClient.getString();
    httpClient.end();

    Serial.println(content);
    delay(5000);
}

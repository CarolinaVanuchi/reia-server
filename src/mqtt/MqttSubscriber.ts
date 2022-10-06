import mqtt, { MqttClient } from "mqtt";
const tls = require('node:tls');
const fs = require('node:fs');

export default class MqttSubscriber {
    client: MqttClient;
    topic1: string;

    constructor() {
        
        this.topic1 = "esp1/volt2";

        this.client = mqtt.connect({
            connectTimeout: 40000,
            clientId:  "service_nodejs" ,
            host: process.env.MQTT_HOST,
            port: Number(process.env.MQTT_PORT),
            protocol: "mqtts",
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD,
            rejectUnauthorized: false,
            key: fs.readFileSync("src/utils/cert/ca.key"),
            cert: fs.readFileSync("src/utils/cert/ca.crt")
        });

        this.onConnect();
        this.onError();
        this.onSubscriber();
        this.onReceive();
    }

    onConnect(): void {
        this.client.on("connect", function(connack) {
            console.log("MQTT: ", connack);
        })
    }

    onError(): void {
        this.client.on("error", function(err) { 
            console.log(err) 
        }) 
    }

    onSubscriber():void {
        this.client.subscribe("esp1/volt2", function (message) {
            console.log(message);
        })
    }

    onReceive(): void {
        this.client.on("message", function(topic, message) {
            console.log(topic);
            console.log(message.toString());
        })
    }

}
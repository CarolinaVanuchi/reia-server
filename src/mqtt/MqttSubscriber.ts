import mqtt, { MqttClient } from "mqtt";
import Decrypt from "../crypt/Decrypt";
import {encode, decode} from"js-base64"

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
            console.log("onError", err); 
        }) 
    }

    onSubscriber():void {
        this.client.subscribe("esp1/volt", function (message) {
            console.log("onSubscriber", message);
        })
    }

    onReceive(): void {
        this.client.on("message", function(topic, message) {
            console.log(topic);
            if (topic == "esp1/volt") {
                let decrypt = new Decrypt();
                let res = decrypt.decrypt(message.toString());
                // let res = decode(message.toString());
                console.log(res);
            }
        })
    }

}
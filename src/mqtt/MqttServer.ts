import mqtt, { MqttClient, QoS } from "mqtt";
import Decrypt from "../crypt/Decrypt";
import * as fs from "fs";
import Encrypt from "../crypt/Encrypt";
import { TopicName } from "../enum/TopicNameEnum";

export default class MqttServer {

    private client: MqttClient;
    private qos: QoS = 2;

    constructor() {
        this.client = mqtt.connect({
            connectTimeout: 40000,
            clientId: "0001",
            host: process.env.MQTT_HOST,
            port: Number(process.env.MQTT_PORT),
            protocol: "mqtts",
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD,
            rejectUnauthorized: false,
            key: fs.readFileSync("src/utils/cert/ca.key"),
            cert: fs.readFileSync("src/utils/cert/ca.crt"),
            reconnectPeriod: 10000
        });

        this.onConnect();
        this.onError();
        this.onPublish();
        this.onSubscriber();
        this.onReceive();
        this.onClose();
    }

    onConnect(): void {
        this.client.on("connect", function (connack) {
            console.log("MQTT: ", connack);
        });
    }

    onClose(): void {
        this.client.on("close", function () {
            console.log("Connection closed by client")
        })
    }

    onError(): void {
        this.client.on("error", function (err) {
            console.log("onError", err);
        })
    }


    onPublish(): void {
        const encrypt = new Encrypt();
        const enc = encrypt.encrypt("10000000");
        console.log(enc);
        this.client.publish("webserver/sampling", enc, { qos: this.qos }, function (error, call) {
            if (error) console.log(error);
            if (call) console.log(call);
        });
    }

    onSubscriber(): void {
        this.client.subscribe([TopicName.gpio32, TopicName.gpio33, TopicName.gpio34, TopicName.gpio35, TopicName.gpio36, TopicName.gpio37, TopicName.gpio38, TopicName.gpio39], { qos: this.qos }, function (message) {
            console.log("onSubscriber", message);
        });
    }

    onReceive(): void {
        this.client.on("message", function (topic, message) {

            if (topic == TopicName.gpio36) {
                const decrypt = new Decrypt();
                const res = decrypt.decrypt(message.toString());
                console.log("36");
                console.log(res);
            }
        });
    }

}
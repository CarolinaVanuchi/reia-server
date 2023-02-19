import mqtt, { MqttClient, QoS } from "mqtt";
import Decrypt from "../crypt/Decrypt";
import * as fs from "fs";
import Encrypt from "../crypt/Encrypt";
import { TopicModel } from "../database/models/TopicModel";
import DataSensorController from "../controllers/DataSensorController";

export default class MqttServer {

    private client: MqttClient;
    private qos: QoS = 2;
    private topicsValues = [];

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


    onPublish(topic: string, value: string): void {
        const encrypt = new Encrypt();
        const enc = encrypt.encrypt(value);
        this.client.publish(topic, enc, { qos: this.qos }, function (error, call) {
            if (error) console.log(error);
            if (call) console.log(call);
        });
    }

    async onSubscriber(): Promise<void> {
        await this.getTopics();
        const arrayAux = this.topicsValues;
        this.client.subscribe(arrayAux, { qos: this.qos }, function (message) {
            console.log("onSubscriber", message);
        });
    }

    async onReceive(): Promise<void> {
        this.client.on("message", async function (topic, message) {
                const decrypt = new Decrypt();
                const res = decrypt.decrypt(message.toString());
                DataSensorController.create(topic, Number(res));
        });
    }

    async getTopics() {
        const arrayTopics = await TopicModel.findAll();
        for (let i = 0; i < arrayTopics.length; i++) {
            this.topicsValues.push(arrayTopics[i]['topic'])
        }
    }

}
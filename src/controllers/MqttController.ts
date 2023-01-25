import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MqttServer from "../mqtt/MqttServer";
import MessagesUtils from "../utils/MessagesUtils";

class MqttController {

    async sendSample(req: Request, res: Response) {
        const topic  = req.body.topic;
        const sample = req.body.sample;

        if (!topic) return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_TOPIC);
        if (!sample) return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_SAMPLE);
        
        let mqtt = new MqttServer();
        mqtt.onPublish(topic, sample);
        return res.status(StatusCodes.OK).send();

    }
}

export default new MqttController()
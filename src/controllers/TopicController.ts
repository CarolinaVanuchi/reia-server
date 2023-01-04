import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MessagesUtils from "../utils/MessagesUtils";
import { TopicModel } from "../database/models/TopicModel";

class TopicController {
   
    async create(req: Request, res: Response) {

        try {
            const name              = req.body.name;
            const gpio              = req.body.gpio;
            const gpioInput         = req.body.gpioInput;
            const topic             = req.body.topic;
            const device            = req.body.device;
            const typeData          = req.body.typeData;
            const minValueData      = req.body.minValueData;
            const maxValueData      = req.body.maxValueData;
            const typeOutput        = req.body.typeOutput;
            const minOutput         = req.body.minOutput;
            const maxOutput         = req.body.maxOutput;

            if(!name)               return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_NAME);
            if(!gpio)               return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_GPIO);
            if(!gpioInput)          return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_GPIO_INPUT);
            if(!topic)              return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_TOPIC);
            if(!typeData)           return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_TYPE_DATA);
            if(!minValueData)       return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_MIN_DATA);
            if(!maxValueData)       return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_MAX_DATA);
            if(!typeOutput)         return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_TYPE_OUTPUT);
            if(!minOutput)          return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_MIN_OUTPUT);
            if(!maxOutput)          return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_MAX_OUTPUT);
            
            const port = await TopicModel.create({ 
                name: name, 
                gpio: gpio,
                gpioInput: gpioInput,
                topic: topic,
                idDevice: device,
            });

            return res.status(StatusCodes.CREATED).json(port);

        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async findByDevice(req: Request, res: Response) {
        const idDevice = req.params.idDevice;
        const ports = await TopicModel.findAll( { where: {idDevice: idDevice}})
        return ports.length > 0? res.status(StatusCodes.OK).json(ports) : res.status(StatusCodes.NO_CONTENT).send();
    }

    async update(req: Request, res: Response) {

        try {

            const id        = req.params.id;
            const name      = req.body.name;
            const gpio      = req.body.gpio;
            const gpioInput = req.body.gpioInput;
            const topic     = req.body.topic;
            const device    = req.body.device;

            if(!name)         return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_NAME);
            if(!gpio)         return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_GPIO);
            if(!gpioInput)    return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_GPIO_INPUT);
            if(!topic)        return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_TOPIC);
            
            const port = await TopicModel.update({ 
                name: name, 
                gpio: gpio,
                gpioInput: gpioInput,
                topic: topic,
                idDevice: device
             }, { where: { idTopic: id } });

            return res.status(StatusCodes.OK).json(port);

        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        await TopicModel.destroy( { where: {idTopic: id}});
        try {
            res.status(StatusCodes.OK).send();
        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}

export default new TopicController();
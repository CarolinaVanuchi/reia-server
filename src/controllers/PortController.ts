import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MessagesUtils from "../utls/MessagesUtils";
import { PortModel } from "../database/models/PortModel";

class PortController {
   
    async create(req: Request, res: Response) {

        try {
            const name      = req.body.name;
            const gpio      = req.body.gpio;
            const gpioInput = req.body.gpioInput;
            const topic     = req.body.topic;
            const device    = req.body.device;

            if(!name)         return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_NAME);
            if(!gpio)         return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_GPIO);
            if(!gpioInput)    return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_GPIO_INPUT);
            if(!topic)        return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_TOPIC);
            
            const port = await PortModel.create({ 
                name: name, 
                gpio: gpio,
                gpio_input: gpioInput,
                topic: topic,
                id_device: device
            });

            return res.status(StatusCodes.CREATED).json(port);

        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async findByDevice(req: Request, res: Response) {
        const idDevice = req.params.idDevice;
        const ports = await PortModel.findAll( { where: {id_device: idDevice}})
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
            
            const port = await PortModel.update({ 
                name: name, 
                gpio: gpio,
                gpio_input: gpioInput,
                topic: topic,
                id_device: device
             }, { where: { id_port: id } });

            return res.status(StatusCodes.OK).json(port);

        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        await PortModel.destroy( { where: {id_port: id}});
        try {
            res.status(StatusCodes.OK).send();
        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}

export default new PortController();
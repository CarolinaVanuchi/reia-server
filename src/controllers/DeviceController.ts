import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MessagesUtils from "../utls/MessagesUtils";
import { DeviceModel } from "../database/models/DeviceModel";

class DeviceController {
   
    async create(req: Request, res: Response) {

        try {
            const name    = req.body.name;
            const ip      = req.body.ip;
            const port    = req.body.port;
            const user    = req.body.user;

            if(!name)        return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_NAME);
            if(!ip)          return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_IP);
            if(!port)        return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_PORT);
            
            const device = await DeviceModel.create({ name, ip, port, id_user: user });
            return res.status(StatusCodes.CREATED).json(device);

        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async findByUser(req: Request, res: Response) {
        const idUser = req.params.idUser;
        const devices = await DeviceModel.findAll( { where: {id_user: idUser}})
        return devices.length > 0? res.status(StatusCodes.OK).json(devices) : res.status(StatusCodes.NO_CONTENT).send();
    }

    async update(req: Request, res: Response) {

        try {
            const id      = req.params.id;
            const name    = req.body.name;
            const ip      = req.body.ip;
            const port    = req.body.port;

            if(!name)        return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_NAME);
            if(!ip)          return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_IP);
            if(!port)        return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_PORT);
            
            const device = await DeviceModel.update({ name, ip, port }, { where: { id_device: id } });

            return res.status(StatusCodes.OK).json(device);

        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        await DeviceModel.destroy( { where: {id_device: id}});
        try {
            res.status(StatusCodes.OK).send();
        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}

export default new DeviceController();
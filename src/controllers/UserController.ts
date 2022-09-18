import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { DataSensorModel } from "../database/models/DataSensorModel";
import { DeviceModel } from "../database/models/DeviceModel";
import { PortModel } from "../database/models/PortModel";
import { UserModel } from "../database/models/UserModel";
import MessagesUtils from "../utls/MessagesUtils";

class UserController {

    async findAll(req: Request, res: Request) {
        const teste = await DeviceModel.findAll(); 
        const teste2 = await PortModel.findAll(); 
        const teste3 = await DataSensorModel.findAll(); 
        const users = await UserModel.findAll();
        return users.length > 0? res.status(StatusCodes.OK).json(users) : res.status(StatusCodes.NO_CONTENT).send();
    }
    async findOne(req: Request, res: Request) {
        const { userId } = req.params;
        console.log('req.params');
        console.log(req.params);
        if(!userId)  return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_VALUES);
        
        const user = await UserModel.findOne({
            where: {
                id_user: userId,
            }
        });

        return user? res.status(StatusCodes.OK).json(user) : res.status(StatusCodes.NO_CONTENT).send();
    }
    
    async create(req: Request, res: Request) {
        try {
            const data = req.body;
            if(!data)  return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_VALUES);
            

            const name      = req.body.name;
            const username  = req.body.username;
            const password  = req.body.password;
            const user = await UserModel.create({ name, username, password });

            return res.status(StatusCodes.CREATED).json(user);
        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }

        
    }
    
    async update(req: Request, res: Request) {
        const {userId} = req.params;
        const name      = req.body.name;
        const username  = req.body.username;
        const password  = req.body.password;

        await UserModel.update({ name, username, password }, {
            where: {
                id_user: userId,
            }
        });

        return res.status(StatusCodes.NO_CONTENT).send();
    }

    async delete(req: Request, res: Request) {
        const {userId} = req.params;
        await UserModel.destroy({
            where: {
                id_user: userId,
            }
        });
        return res.status(StatusCodes.NO_CONTENT).send();
    }
}

export default new UserController();
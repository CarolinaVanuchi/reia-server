import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../database/models/UserModel";
import MessagesUtils from "../utls/MessagesUtils";
import bcrypt from "bcrypt";
class UserController {
    
    async create(req: Request, res: Response) {

        try {

            const name          = req.body.name;
            const username      = req.body.username;
            const pass          = req.body.password;
            const pass_repet    = req.body.password_repet;

            if(!name)              return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_NAME);
            if(!username)          return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_USERNAME);
            if(!pass)              return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_PASSWORD);
            if(!pass_repet)        return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_REPT_PASSWORD);
            if(pass != pass_repet) return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.EQUAL_PASSWORD);
            
            const userExist = await UserModel.findOne({ where: { username: username } });
            if (userExist) return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.EQUAL_USER);
         
            const salt = await bcrypt.genSalt(7);
            const password = await bcrypt.hash(pass, salt);

            const user = await UserModel.create({ name, username, password });
            return res.status(StatusCodes.CREATED).json(user);

        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }
    
    async update(req: Request, res: Request) {
        const  id       = req.params.id;
        const name      = req.body.name;
        const username  = req.body.username;
        const pass      = req.body.password;

        if(!name)              return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_NAME);
        if(!username)          return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_USERNAME);
        if(!pass)              return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_PASSWORD);
        
        const salt = await bcrypt.genSalt(7);
        const password = await bcrypt.hash(pass, salt);

        await UserModel.update({ name, username, password }, {
            where: {
                id_user: id,
            }
        });

        return res.status(StatusCodes.NO_CONTENT).send();
    }

    async delete(req: Request, res: Request) {
        const {id} = req.params;
        await UserModel.destroy({
            where: {
                id_user: id,
            }
        });
        return res.status(StatusCodes.NO_CONTENT).send();
    }
}

export default new UserController();
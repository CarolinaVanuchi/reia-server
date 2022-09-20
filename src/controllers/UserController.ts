import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../database/models/UserModel";
import MessagesUtils from "../utls/MessagesUtils";
import bcrypt from "bcrypt";

class UserController {
    
    async create(req: Request, res: Request) {

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
        const {userId}  = req.params;
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

    async findAll(req: Request, res: Request) {
        const users = await UserModel.findAll();
        return users.length > 0? res.status(StatusCodes.OK).json(users) : res.status(StatusCodes.NO_CONTENT).send();
    }
    async findOne(req: Request, res: Request) {
        const { userId } = req.params;
        console.log('req.params');
        console.log(req.params);
       
        
        const user = await UserModel.findOne({
            where: {
                id_user: userId,
            }
        });

        return user? res.status(StatusCodes.OK).json(user) : res.status(StatusCodes.NO_CONTENT).send();
    }
}

export default new UserController();
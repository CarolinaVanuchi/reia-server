import { Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../database/models/UserModel";
import MessagesUtils from "../utls/MessagesUtils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LoginController {

    async login(req: Request, res: Request) {
        const username      = req.body.username;
        const pass          = req.body.password;

        if(!username)       return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_USERNAME);
        if(!pass)           return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.NULL_PASSWORD);

        const userExist = await UserModel.findOne({ where: { username: username } });
        if (!userExist) return res.status(StatusCodes.NOT_ACCEPTABLE).json(MessagesUtils.EXISTS_USER_PASSWORD);                
     
        const checkPassword = await bcrypt.compare(pass, userExist['password'])
        if (!checkPassword) return res.status(StatusCodes.NOT_FOUND).json(MessagesUtils.EXISTS_USER_PASSWORD);
        
        const secret = process.env.SERET;
        const token = jwt.sign(
            {
                id: userExist['is_user'],
            },
            secret);
        
        return res.status(StatusCodes.CREATED).json({msg: MessagesUtils.LOGIN_OK, token});
    }


    async returnInfoUser(req: Request, res: Request) {
        const {userId} = req.params;

        const user = await UserModel.findByPk(userId, {
            attributes: { exclude: ['password', 'status', 'createdAt', 'updatedAt', 'id_user'] }
        });

        if (!user) return res.status(StatusCodes.NOT_FOUND).json(MessagesUtils.NOT_USER);

        return res.status(StatusCodes.OK).json(user);
    }

    authMiddleware(req: Request, res: Request, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(StatusCodes.UNAUTHORIZED).json(MessagesUtils.DENID);

        try {

            const secret = process.env.SERET;
            jwt.verify(token, secret);
            next();

        } catch(error) {
            return res.status(StatusCodes.UNAUTHORIZED).json(MessagesUtils.DENID);
        }
    }

}

export default new LoginController();
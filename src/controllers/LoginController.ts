import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../database/models/UserModel";
import MessagesUtils from "../utils/MessagesUtils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LoginController {

    async login(req: Request, res: Response) {

        const username = req.body.username;
        const pass = req.body.password;

        if (!username) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: MessagesUtils.NULL_USERNAME });
        if (!pass) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: MessagesUtils.NULL_PASSWORD });

        const userExist = await UserModel.findOne({ where: { username: username } });
        if (!userExist) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: MessagesUtils.EXISTS_USER_PASSWORD });

        const checkPassword = await bcrypt.compare(pass, userExist['password'])
        if (!checkPassword) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: MessagesUtils.EXISTS_USER_PASSWORD });

        const secret = process.env.SECRET;
        const token = jwt.sign(
            { id: userExist['idUser'] },
            secret, { expiresIn: '1d' },
            );

        await UserModel.update({ token: token }, {
            where: {
                username: username,
            }
        });
        return res.status(StatusCodes.OK).json({ token: token, username: username });
    }


    async returnInfoUser(req: Request, res: Response) {
        const { id } = req.params;

        const user = await UserModel.findByPk(id, {
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });

        if (!user) return res.status(StatusCodes.NOT_FOUND).json(MessagesUtils.NOT_USER);

        return res.status(StatusCodes.OK).json(user);
    }

    authMiddleware(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == 'null') return res.status(StatusCodes.UNAUTHORIZED).json(MessagesUtils.DENID);

        try {
            const secret = process.env.SECRET;
            jwt.verify(token, secret);
            next();
        } catch (error) {
            return res.status(StatusCodes.UNAUTHORIZED).json(MessagesUtils.DENID);
        }
    }

    async validateToken(req: Request, res: Response) {
        const authHeader = req.headers['authorization'];
        let token = authHeader.split(' ')[1];
        const userInfo = await UserModel.findOne({ where: { username: req.params.username } });
        if (token == userInfo['token']) return res.status(StatusCodes.OK).json(true);
        return res.status(StatusCodes.UNAUTHORIZED).json(false);
    }
}

export default new LoginController();
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../database/models/UserModel";

class UserController {

    async findAll(req: Request, res: Request) {}
    async findOne(req: Request, res: Request) {}
    
    async create(req: Request, res: Request) {
        try {
            const name = req.name;
            const username = req.username;
            const password = req.password;
        
            const user = await UserModel.create({ name, username, password });
    
            return res.status(StatusCodes.CREATED).json(user);

        }  catch(error){ 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        }
        
    }

    
    async update(req: Request, res: Request) {}
    async delete(req: Request, res: Request) {}
}

export default new UserController();
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DataSensorModel } from "../database/models/DataSensorModel";

class DataSensorController {
   
    async create(req: Request, res: Response) {

        try {
            const value      = req.body.value;
            const port       = req.body.port;

            
            const dataSensor = await DataSensorModel.create({ 
                value: value, 
                id_port: port
            });

            return res.status(StatusCodes.CREATED).json(dataSensor);

        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async findByPort(req: Request, res: Response) {
        const idPort = req.params.idPort;
        const values = await DataSensorModel.findAll( { where: {id_port: idPort}})
        return values.length > 0? res.status(StatusCodes.OK).json(values) : res.status(StatusCodes.NO_CONTENT).send();
    }

}

export default new DataSensorController();
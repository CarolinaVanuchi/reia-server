import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DataSensorModel } from "../database/models/DataSensorModel";
import { TopicModel } from "../database/models/TopicModel";
import { DeviceModel } from "../database/models/DeviceModel";

class DataSensorController {
   
    async create(req: Request, res: Response) {

        try {
            const value      = req.body.value;
            const topic      = req.body.topic;

            
            const dataSensor = await DataSensorModel.create({ 
                value: value, 
                idTopic: topic
            });

            return res.status(StatusCodes.CREATED).json(dataSensor);

        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async findByDevice(req: Request, res: Response) {
        const id = req.params.idDevice;
        const values = await DeviceModel.findAll( {include: [{model: TopicModel, include: [{model: DataSensorModel}]}], where: {idDevice: id} })
        return values.length > 0? res.status(StatusCodes.OK).json(values) : res.status(StatusCodes.NO_CONTENT).send();
    }

    async findByTopic(req: Request, res: Response) {
        const id = req.params.idTopic;
        const values = await DataSensorModel.findAll( {order:[["idDataSensor", "DESC"]], where: {idTopic: id},  limit: 15})
       
        return values.length > 0? res.status(StatusCodes.OK).json(values) : res.status(StatusCodes.NO_CONTENT).send();
    }

}

export default new DataSensorController();
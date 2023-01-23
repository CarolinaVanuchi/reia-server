import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DataSensorModel } from "../database/models/DataSensorModel";
import { TopicModel } from "../database/models/TopicModel";
import { Op } from "sequelize";

class DataSensorController {

    async create(idTopic: number, value: number) {
        try {
            const dataSensor = await DataSensorModel.create({
                value: value,
                idTopic: idTopic
            });

            return true;

        } catch (error) {
            console.log(error)
            return false;
        }
    }
    
    async findByDevice(req: Request, res: Response) {
        const id = req.params.idDevice;
        const dataBegin = new Date(req.params.dataBegin);
        const dataEnd = new Date(req.params.dataEnd);

        const values = await TopicModel.findAll({
            include: [{
                model: DataSensorModel,
                where: { "dataTime": { [Op.between]: [dataBegin, dataEnd] } },
                order: ["dataTime", "DESC"]
            }],

            where: { idDevice: id }
        })
        return values.length > 0 ? res.status(StatusCodes.OK).json(values) : res.status(StatusCodes.NO_CONTENT).send();
    }

    async findByTopic(req: Request, res: Response) {
        const id = req.params.idTopic;
        const values = await DataSensorModel.findAll({ order: [["idDataSensor", "DESC"]], where: { idTopic: id }, limit: 20 })

        return values.length > 0 ? res.status(StatusCodes.OK).json(values) : res.status(StatusCodes.NO_CONTENT).send();
    }

}

export default new DataSensorController();
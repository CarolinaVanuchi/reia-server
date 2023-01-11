import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DataSensorModel } from "../database/models/DataSensorModel";
import { TopicModel } from "../database/models/TopicModel";
import { DeviceModel } from "../database/models/DeviceModel";
import { Op } from "sequelize";

class DataSensorController {

    async create(req: Request, res: Response) {

        try {
            const value = req.body.value;
            const topic = req.body.topic;


            const dataSensor = await DataSensorModel.create({
                value: value,
                idTopic: topic
            });

            return res.status(StatusCodes.CREATED).json(dataSensor);

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    async findByDevice(req: Request, res: Response) {
        const id = req.params.idDevice;
        const dataBegin = new Date(req.params.dataBegin);
        const dataEnd = new Date(req.params.dataEnd);

        const values = await TopicModel.findAll({
            include: [{
                model: DataSensorModel,
                where: { "dataTime": { [Op.between]: [dataBegin, dataEnd] } }
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
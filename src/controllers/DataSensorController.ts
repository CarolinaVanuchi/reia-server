import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DataSensorModel } from "../database/models/DataSensorModel";
import { TopicModel } from "../database/models/TopicModel";
import { Op } from "sequelize";
import TopicController from "../controllers/TopicController";

class DataSensorController {

    async create(topic: string, value: number) {
        try {
            let data = 0;
            const values = await TopicController.findByTopic(topic);
            
            const idTopic       = values["idTopic"];
            const minInput      = values["minInput"];
            const maxInput      = values["maxInput"];
            const minOutput     = values["minOutput"];
            const maxOutput     = values["maxOutput"];
            const typeData      = values["typeData"];

            if (typeData == "Corrente") data = this.calculateByCurrent(maxOutput, value);
            else this.calculateByVoltage(maxOutput, value);
            
            await DataSensorModel.create({
                value: data,
                idTopic: idTopic
            });

            return true;

        } catch (error) {
            console.log(error)
            return false;
        }
    }
    
    calculateByVoltage(maxOutput: number, value: number): number {
        let realValue = (maxOutput*value/3.32);
        return parseFloat(realValue.toFixed(2));
    }

    calculateByCurrent(maxOutput: number, value: number): number {
        console.log('there')
        let realValue =  (maxOutput*value)/(3.28-0.656);
        return parseFloat(realValue.toFixed(2));
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
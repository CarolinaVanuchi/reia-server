import {DataTypes} from "sequelize";
import {db} from "../db";
import { PortModel } from "./PortModel";

export const DataSensorModel = db.define('data_sensor', {
    id_data_sensor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    data_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

PortModel.hasMany(DataSensorModel, {
    constraints: true,
    foreignKey: 'id_port'
});
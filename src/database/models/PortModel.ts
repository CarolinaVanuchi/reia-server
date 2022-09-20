import {DataTypes} from "sequelize";
import {db} from "../db";
import { DeviceModel } from "./DeviceModel";

export const PortModel = db.define('port', {
    id_port: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gpio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gpio_input: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    topic: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

DeviceModel.hasMany(PortModel, {
    constraints: true,
    foreignKey: 'id_device'
});
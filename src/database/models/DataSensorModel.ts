import {DataTypes} from "sequelize";
import {db} from "../db";
import { TopicModel } from "./TopicModel";

export const DataSensorModel = db.define('data_sensor', {
    idDataSensor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    dataTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    underscored: true    
});

TopicModel.hasMany(DataSensorModel, {
    constraints: true,
    foreignKey: 'idTopic',
    onDelete: 'CASCADE',
    hooks: true
});
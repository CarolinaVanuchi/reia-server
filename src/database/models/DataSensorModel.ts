import { DataTypes } from "sequelize";
import { db } from "../db";
import { TopicModel } from "./TopicModel";
import moment from 'moment';

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
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('dataTime')).format('DD/MM/YYYY h:mm:ss');
        }
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
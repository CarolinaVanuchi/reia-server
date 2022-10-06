import {DataTypes} from "sequelize";
import {db} from "../db";
import { DeviceModel } from "./DeviceModel";

export const TopicModel = db.define('topic', {
    idTopic: {
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
    gpioInput: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    topic: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    underscored: true    
});

DeviceModel.hasMany(TopicModel, {
    constraints: true,
    foreignKey: 'idDevice',
    onDelete: 'CASCADE',
    hooks: true
});
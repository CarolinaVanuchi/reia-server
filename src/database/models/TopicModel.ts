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
    gpio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    topic: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    typeData: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    minInput: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    maxInput: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    typeOutput: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    minOutput: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    maxOutput: {
        type: DataTypes.DOUBLE,
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
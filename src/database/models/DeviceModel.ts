import {DataTypes} from "sequelize";
import {db} from "../db";
import { UserModel } from "./UserModel";

export const DeviceModel = db.define('device', {
    idDevice: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    port: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    sampling: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    underscored: true    
});

UserModel.hasMany(DeviceModel, {
    constraints: true,
    foreignKey: 'idUser',
    onDelete: 'CASCADE',
    hooks: true
});
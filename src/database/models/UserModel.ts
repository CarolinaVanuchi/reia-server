import {DataTypes} from "sequelize";
import {db} from "../db";

export const UserModel = db.define('user', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false,
    }
});
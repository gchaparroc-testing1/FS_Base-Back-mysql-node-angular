import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Client = sequelize.define('client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    alias_name: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'client'
})
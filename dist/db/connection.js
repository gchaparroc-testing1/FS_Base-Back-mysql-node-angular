"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//const sequelize = new Sequelize('rrhh', 'root', 'admin123', {
const sequelize = new sequelize_1.Sequelize("b7zyi7jl3rpdvytlrv2f", "ujvikmwrhwmwrkju", "n04qcqzPfGjgoOnojXFG", {
    //host: '127.0.0.1',
    host: "b7zyi7jl3rpdvytlrv2f-mysql.services.clever-cloud.com",
    port: 3306,
    dialect: "mysql",
});
exports.default = sequelize;

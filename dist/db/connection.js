"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//const sequelize = new Sequelize('rrhh', 'root', 'admin123', {
const sequelize = new sequelize_1.Sequelize("customers", "gchaparro", "7n2L'}1m$10hLDCa", {
    //host: '127.0.0.1',
    host: "127.0.0.1",
    port: 3308,
    dialect: "mysql",
});
exports.default = sequelize;

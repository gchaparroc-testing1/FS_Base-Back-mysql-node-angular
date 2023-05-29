import { Sequelize } from "sequelize";


//const sequelize = new Sequelize('rrhh', 'root', 'admin123', {
const sequelize = new Sequelize("customers", "gchaparro", "7n2L'}1m$10hLDCa", {
    //host: '127.0.0.1',
    host: "127.0.0.1",
    port: 3308,
    dialect: "mysql",   
});

export default sequelize;
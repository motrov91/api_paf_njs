import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'})

const db = new Sequelize(
    //'api_rest',
    process.env.BD_NAME,
    //'root',
    process.env.DB_USER,
    // '',
    process.env.DB_PASS,
    {
        host: process.env.BD_HOST,
        port: process.env.DB_Port,
        dialect:'mysql',
        define: {
            timestamps: true
        },
        pool:{
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        operatorsAliases: false 
    }
);

export default db;


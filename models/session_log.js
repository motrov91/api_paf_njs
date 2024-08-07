import { DataTypes, Sequelize } from "sequelize";
import db from '../config/db.js'

const Session = db.define('Sessions', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sessionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
},{
    scopes:{
        deleteCreatedAndUpadated:{
            attributes:{
                exclude: ['password', 'createdAt', 'updatedAt', 'token']
            }
        }
    }
});

export default Session;
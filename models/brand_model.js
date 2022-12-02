import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Brand = db.define('Brands', {
    brand:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    scopes:{
        deleteAtributtes:{
            attributes:{
                exclude: ['createdAt', 'updatedAt']
            }
        }
    }
});

export default Brand;
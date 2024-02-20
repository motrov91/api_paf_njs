import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Brand = db.define('Brands', {
    brand:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imageBrand:{
        type: DataTypes.STRING,
        allowNull: true
    },
    publish:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
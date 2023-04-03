import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Pdf = db.define('Pdf',{
    nameProduct :{
        type: DataTypes.STRING,
        allowNull: false
    },
    secureUrl:{
        type: DataTypes.STRING,
        allowNull: false
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

export default Pdf;
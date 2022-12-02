import { DataTypes } from "sequelize";

import db from '../config/db.js'

const Rol = db.define('Roles', {
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Rol;
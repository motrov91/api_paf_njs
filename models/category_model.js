import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Category = db.define('Categories', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    publishCategory:{
        type: DataTypes.BOOLEAN,
    }
},{
    scopes:{
        deleteAtributtes:{
            attributes:{
                exclude:['createdAt', 'updatedAt']
            }
        }
    }
});

export default Category;
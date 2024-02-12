import { DataTypes } from "sequelize";
import db from '../config/db.js'

const ProductXCategory = db.define('ProductXCategories', {

},{
    scopes:{
        deleteCreated:{
            attributes:{
                exclude: ['createdAt', 'updatedAt']
            }
        }
    }
});

export default ProductXCategory;
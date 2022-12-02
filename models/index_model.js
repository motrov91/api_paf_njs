//* Relations
import User from './user_model.js';
import Rol from './roles_model.js';
import Brand from './brand_model.js';
import Category from './category_model.js';
import Product from './Product_model.js'

User.belongsTo(Rol, {foreignKey: 'rolId', onDelete:"cascade"})
Brand.belongsTo(User, {foreignKey: 'userId', onDelete:"cascade"})
Category.belongsTo(Brand, {foreignKey: 'brandId', onDelete:"cascade"})
Product.belongsToMany(Category, {through: 'ProductXCategory'})
Product.belongsTo(User, {foreignKey: 'userId', onDelete:"cascade"})


export { 
    User,
    Rol,
    Brand,
    Category,
    Product
}

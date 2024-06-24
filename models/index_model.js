//* Relations
import User from './user_model.js';
import Rol from './roles_model.js';
import Brand from './brand_model.js';
import Category from './category_model.js';
import Product from './Product_model.js';
import PdfProduct from './pdfProduct_model.js';
import ProductXCategory from './ProductXCategory_model.js';
import Session from './session_log.js';


User.belongsTo(Rol, {foreignKey: 'rolId', onDelete:"cascade"})
Brand.belongsTo(User, {foreignKey: 'userId', onDelete:"cascade"})
Category.belongsTo(Brand, {foreignKey: 'brandId', onDelete:"cascade"})
Category.belongsToMany(Product, {through: 'ProductXCategories', onDelete:"cascade"})
Product.belongsToMany(Category, {through: 'ProductXCategories', onDelete:"cascade"})
Product.belongsTo(User, {foreignKey: 'userId', onDelete:"cascade"})
PdfProduct.belongsTo(Product, { foreignKey: 'productId', onDelete: "cascade" })
Session.belongsToMany(User, { through: 'userId', onDelete: "cascade" })


export { 
    User,
    Rol,
    Brand,
    Category,
    Product,
    PdfProduct,
    ProductXCategory,
    Session
}

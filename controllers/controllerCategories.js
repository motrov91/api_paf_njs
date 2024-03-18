import { check, validationResult } from 'express-validator';
import { Category, Brand, User, ProductXCategory } from '../models/index_model.js';

const addCategory = async (req, res, next) => {

    await check('name').notEmpty().withMessage('El nombre de la categoria es obligatorio').run(req);
    await check('brandId').notEmpty().withMessage('El id de la marca es obligatorio').run(req);

    let result = validationResult(req);

    if(!result.isEmpty()){
        return res.status(400).json(result.array());
    }

    //verify by duplicate brand
    const existCategory = await Category.findOne({
        where : { name : req.body.name, brandId: req.body.brandId }
    })

    if(existCategory){
        return res.status(400).json({
            message : 'La categoria ya se encuentra creada.'
        });
    }

    try {
        const categoryData = await Category.create(req.body);

        const { id } = categoryData;

        const category = await Category.scope('deleteAtributtes').findOne({
            where : {id : id},
            include: [
                { model: Brand.scope('deleteAtributtes') }
            ]
        })

        return res.status(200).json(category);
    } catch (error) {
        console.log(`Error ${error}`);
        next;
    }
    
};
const allCategories = async (req, res, next) => {
    const categories = await Category.scope('deleteAtributtes').findAll({
        include: [
            { 
                model: Brand.scope('deleteAtributtes'), 
                include: [{
                    model: User.scope('deletePassword')
                }]

            },
        ]
    })

    return res.status(200).json({categories});

};
const updateCategory = async (req, res, next) => {
    const { name, brandId } = req.body;

    const existCategory = await Category.findByPk(req.params.id);

    if(!existCategory){
        return res.status(400).json({
            msg: " La categoria no existe "
        })

    }

    existCategory.set({ name, brandId });

    await existCategory.save({});

    return res.status(200).json(existCategory);
};
const deleteCategory = async(req, res, next) => {

    const { id } = req.params;

    const rolUser = await User.findByPk(req.user.id);

    //Check user is admin
    if( rolUser.rolId != 1) {
        return res.status(401).json({
            message : "No tienes los permisos para realizar la acción deseada"
        })
    }

    //Validar que la propiedad exista
    const category = await Category.findByPk(id);

    if(!category){
        return res.status(400).json({
            msg: "Clasificación no encontrada"
        })
    }

    await category.destroy();

    return res.status(200).json({
        msg: 'Clasificación eliminada exitosamente'
    })

    
};

const categoriesBrand = async (req, res) => {

    const categoriesByBrand = await Category.scope('deleteAtributtes').findAll({
        where: {
            brandId : req.params.id
        }
    })

    return res.status(200).json({categoriesByBrand})
}

export{
    addCategory,
    allCategories,
    updateCategory,
    deleteCategory,
    categoriesBrand,
}
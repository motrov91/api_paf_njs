import { check, validationResult } from 'express-validator';
import { Brand, User } from '../models/index_model.js'

const addBrand = async (req, res, next) => {
    
    await check('brand').notEmpty().withMessage('El nombre de la marca es obligatorio').run(req);

    let result = validationResult(req);
    
    if(!result.isEmpty()){
        return res.status(400).json(result.array());
    }

    //Verify by duplicate brand
    const existBrand = await Brand.findOne({ where: { brand : req.body.brand} });

    if(existBrand){
        return res.status(400).json({
            message : 'La marca ya se encuentra creada.'
        });
    }

    try {
        
        const brandData = await Brand.create(req.body);

        const {id} = brandData;

        const brand = await Brand.scope('deleteAtributtes').findOne({
        
            where:{id : id},
            include: [
                { model: User.scope('deletePassword') }
            ]

        }          

        );


        return res.status(200).json(brand);

    } catch (error) {
        console.log(`Error: ${error}`);
        next;
    }
}
const allBrand = async (req, res, next) => {

    const brands = await Brand.scope('deleteAtributtes').findAll({

        include: [
            { model: User.scope('deletePassword') }
        ]
    
    });
    return res.status(200).json({brands});

}
const updateBrand = async (req, res, next) => {

    // console.log(req.body)
    const { brand, userId } = req.body;

    const existBrand = await Brand.findByPk(req.params.id);

    if(!existBrand){
        return res.status(400).json({
            msg: "La marca no existe"
        })
    }

    existBrand.set({ brand, userId });

    await existBrand.save();

    return res.status(200).json({
        msg: "Modificación exitosa."
    })

}
const deleteBrand = async (req, res, next) => {

    console.log('ingresa');

    const { id } = req.params;

    const rolUser = await User.findByPk(req.user.id);

    //Check user is admin
    if( rolUser.rolId != 1) {
        return res.status(401).json({
            message : "No tienes los permisos para realizar la acción deseada"
        })
    }

    //Validar que la propiedad exista
    const brand = await Brand.findByPk(id);

    if(!brand){
        return res.status(400).json({
            msg: "Marca no encontrada"
        })
    }

    await brand.destroy();

    return res.status(200).json({
        msg: 'Marca eliminada exitosamente'
    })

}

export {
    addBrand,
    allBrand,
    updateBrand,
    deleteBrand
}
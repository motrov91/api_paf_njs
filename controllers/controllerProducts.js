import { Product, User } from '../models/index_model.js';
import pdf from 'pdfkit';

const AddProduct = async(req, res) => {
 
    const { reference } = req.body;

    //Verify product by reference
    const productDB = await Product.findOne({ where: {reference : reference} });

    if(productDB){
        return res.status(400).json({
            message: "El producto ya existe en la base de datos"
        })
    }

    try {

        req.body['userId'] = req.user.id
        
        const productData = await Product.create(req.body);

        const data = await Product.findOne({ 
            where : { id : productData.id },
            include:[
                {model : User.scope('deletePassword')}
            ]
        })

        return res.status(200).json(data);
        
    } catch (error) {
         return console.log(`Error: ${error}`)
    }

}

const AllProducts = async(req, res) => {

    //check that user exist
    const userExist = await User.findByPk(req.user.id);

    if( userExist.rolId == 1 ){
        const products = await Product.findAll({
            include: [
                { model: User.scope('deletePassword') }
            ]
        });

        return res.status(200).json({products});
    }
        
    const products = await Product.findAll({ 
        where: { userId : userExist.id },   
        include: [
            { model: User.scope('deletePassword') }
        ]
    });

    return res.status(200).json({products});
}

const updateProduct = async( req, res ) => {

    const rolUser = await User.findByPk(req.user.id);

    //Check user is admin
    if( rolUser.rolId != 1) {
        return res.status(401).json({
            message : "No tienes los permisos para realizar la acción deseada"
        })
    }

    //Check by exist product
    const existProduct = await Product.findByPk(req.params.id);
    
    if(!existProduct){
        return res.status(400).json({
            msg: "El producto no existe"
        })
    }

    existProduct.set(req.body);

    await existProduct.save()

    return res.status(200).json({
        msg: 'Actualización exitosa.'
    });

}

const deleteProduct = async (req, res) => {

    const rolUser = await User.findByPk(req.user.id);

    //Check user is admin
    if( rolUser.rolId != 1) {
        return res.status(401).json({
            message : "No tienes los permisos para realizar la acción deseada"
        })
    }

    //Check by exist product
    const existProduct = await Product.findByPk(req.params.id);

    if(!existProduct){
        return res.status(400).json({
            msg: "El producto no existe"
        })
    }

    await existProduct.destroy();

    return res.status(200).json({
        msg: 'Producto eliminado exitosamente'
    })
}

const productPdf = async (req, res) => {

    console.log(req.params.id)

    const doc = new pdf();

    doc
        .fontSize(25)
        .text('Texto de prueba', 100, 100)

    doc.pipe(res)
    doc.end();
}


export {
    AddProduct,
    AllProducts,
    updateProduct,
    deleteProduct,
    productPdf
}




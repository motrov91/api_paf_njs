import { organizedDataSQL, formaterProduct } from '../helpers/organizedDataSQLProduct.js';
import { Product, User, ProductXCategory } from '../models/index_model.js';
import { LocalPDF } from '../helpers/localPDF.js';

import axios from 'axios';
import { Buffer } from 'buffer';

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

        //Retorna el body en formato listo para cargar a la DB.
        //en el body llegan elementos dentro de listas, al final retorma un objeto, listo para cargar.
        let dataProduct = organizedDataSQL(req.body);

        //Revisar esta linea porque puede esta haciendo lo mismo que la de abajo(40).
        dataProduct['userId'] = req.user.id;
        
        //Se le asigna la respuesta de la creacion del usuario en la base de datos.
        const productData = await Product.create(dataProduct);

        //console.log(productData);

        //Recibe el objeto del producto recien creado y lo formatea para organizarlo en listas para mostrar en la respuesta.
        let dataFormater = await formaterProduct(productData);

        return res.status(200).json(dataFormater);
        
    } catch (error) {
         return console.log(`Error: ${error}`)
    }

}

const AllProducts = async(req, res) => {

    let dataProducts = {
        "products" : []
    };

    //check that user exist
    const userExist = await User.findByPk(req.user.id);

    

    //* Si el rol del usuario es 1 0 3 podrán ver todos los productos.
    //* si el rol es 2 no se ejecuta y pasa a la otra consulta. una vez ingresa a la condicion formatea el resultado 
    //* para entregarlo como un conjunto de arreglos para cada producto.
    if( userExist.rolId == 1 || userExist.rolId == 3 ){
        const products = await Product.findAll({
            include: [
                { model: User.scope('deletePassword') }
            ]
        });         

        for(let j=0; j<products.length; j++){

            let dataFormater = await formaterProduct(products[j]);
            dataProducts.products.push(dataFormater);
        }

        return res.status(200).json(dataProducts);
    }


    //* Si el rolId es 2 se ejecuta el bloque de código de abajo, se buscan los productos que tengan como userId 
    //* del usuario que esta haciendo la consulta y retorna esa información, pero antes formatea la información para en-
    //* viarla como un objeto de arreglos.
    const productsData = await Product.findAll({ 
        where: { userId : userExist.id },   
        include: [
            { model: User.scope('deletePassword') }
        ]
    });

    for(let j=0; j<productsData.length; j++){

        let dataFormater = await formaterProduct(productsData[j]);
        dataProducts.products.push(dataFormater);
    }

    return res.status(200).json(dataProducts);
}

const updateProduct = async( req, res ) => {

    const rolUser = await User.findByPk(req.user.id);

    //Check user is admin
    if( rolUser.rolId == 3 ) {
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

    //Retorna el body en formato listo para cargar a la DB.
    //en el body llegan elementos dentro de listas, al final retorma un objeto, listo para cargar.
    let dataProduct = organizedDataSQL(req.body);

    if(req.body.markets[0] == 'TODOS LOS MERCADOS'){
        for(let i = 1; i<= 12; i++){
            dataProduct['market'+[i+1]] = null;
            dataProduct['description_market'+[i+1]] = null;
        }
    }

    existProduct.set(dataProduct);

    await existProduct.save()

    return res.status(200).json({
        msg: 'Actualización exitosa.'
    });

}

const updateStatus = async (req, res ) => {
    let createPdf = {};
    const {state} = req.body; 

    const rolUser = await User.findByPk(req.user.id);

    //Check user is admin
    if( rolUser.rolId == 3 ) {
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

    /* Si el producto existe cambia el estado del producto.
    y lo modifica en el producto. */
    existProduct.set({state});

    /* Almacena en la base de datos el producto con los cambios generados */
    await existProduct.save()

    if(state == 1){

        await LocalPDF(existProduct).then(url => {
            console.log('URL del archivo generado: ', url);

            // createPdf.nameProduct = existProduct.name;
            // createPdf.secureUrl = url.urlSecure;
            // createPdf.publicId = url.public_id;
            // createPdf.productId = existProduct.id;

            // console.log('CREATEPDF', createPdf)

            //await PfdProduct.create(createPdf);

            return res.status(200).json({
                msg: 'Actualización exitosa.'
            });

        }).catch( error => {
            console.error('Error al generar el archivo', error);

            return res.status(200).json({
                msg: 'No se ha podido actualizar el producto, por el pdf'
            });
        })

    } else{
        console.log('despublicar');
        return res.json('Despublicado...');
    }

    return;

    // if(state == 1){

    //     const urlPDF = await LocalPDF(existProduct);
    //     console.log('rul', urlPDF);
        
    //    console.log('se ejecuta al final');

       
    // }else{
    //     //Check by exist product
    //     // const existProductPdf = await Product.findOne({
    //     //     where: {productId : existProduct.id}
    //     // });

    //     // if(!existProductPdf){
    //     //     return res.status(400).json({
    //     //         msg: "El producto no existe"
    //     //     })
    //     // }

    //     // await existProductPdf.destroy();
    // }

}

const deleteProduct = async (req, res) => {

    const rolUser = await User.findByPk(req.user.id);

    //Check user is admin
    if( rolUser.rolId == 3) {
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
    res.send('message')
}

const productById = async(req, res) => {
    
    //check that user exist
    //const userExist = await User.findByPk(req.user.id);

    let markets = [];
    let descriptions = [];
    let observations = [];
    let features = [];
    let observationsFeatures = [];
    let adventages = [];
    let observationsAdventages = [];


    //TODO: Verificar si existe el usuario


    //Search product
    const product = await Product.findByPk(req.params.id);

    if(product){
        for(let i=1; i<=12; i++){
            if(product['market'+[i]] != null){
                markets.push(product['market'+[i]]);
                descriptions.push(product['description_market'+[i]])
                observations.push(product['observations'+[i]])
            }
        }

        for(let i=1; i<=5; i++){
            if(product['feature'+[i]] != null){
                features.push(product['feature'+[i]]);
                observationsFeatures.push(product['observationsFeature'+[i]]);
            }

            if(product['adventage'+[i]] != null){
                adventages.push(product['feature'+[i]]);
                observationsAdventages.push(product['observationsAdventages'+[i]]);
            }
        }
    }


    let productById = {
        "id" : product.id,
        "img" : product.img,
        "name" : product.name,
        "reference" : product.reference,
        "state" : product.state,
        "url_video" : product.url_video,
        "userId" : product.userId,
        "markets" : markets,
        "descriptions" : descriptions,
        "observationsMarket" : observations,
        "features" : features,
        "observationsFeatures" : observationsFeatures,
        "adventages" : adventages,
        "observationsAdventages" : observationsAdventages
    }


    res.status(200).json(productById);
}

const addProductToCategory = async (req, res) => {

    await ProductXCategory.create(req.body)

    console.log('Exitoso');

    res.json({msg: "Exitoso"})

}

const getProductsByCategory = async (req, res) => {

    let dataProducts = {
        "products" : []
    };

    let productsDB = [];

    //check that user exist
    const userExist = await User.findByPk(req.user.id);

     //* Si el rol del usuario es 1 0 3 podrán ver todos los productos.
    //* si el rol es 2 no se ejecuta y pasa a la otra consulta. una vez ingresa a la condicion formatea el resultado 
    //* para entregarlo como un conjunto de arreglos para cada producto.

    const products = await ProductXCategory.findAll({
        where: { CategoryId : req.params.id},
    }); 

    for(let i=0; i<products.length; i++){
        let product = await Product.findByPk(products[i].ProductId);
        productsDB.push(product);
    }

    for(let j=0; j<productsDB.length; j++){

        let dataFormater = await formaterProduct(productsDB[j]);
        dataProducts.products.push(dataFormater);
    }

    return res.status(200).json(dataProducts);

}

const getProductsApprovedByCategory = async (req, res) => {
    let dataProducts = {
        "products" : []
    };

    let productsDB = [];

    //check that user exist
    const userExist = await User.findByPk(req.user.id);

     //* Si el rol del usuario es 1 0 3 podrán ver todos los productos.
    //* si el rol es 2 no se ejecuta y pasa a la otra consulta. una vez ingresa a la condicion formatea el resultado 
    //* para entregarlo como un conjunto de arreglos para cada producto.

    const products = await ProductXCategory.findAll({
        where: { CategoryId : req.params.id},
    }); 

    for(let i=0; i<products.length; i++){
        let product = await Product.findByPk(
            products[i].ProductId,
            // {
            //     where: {state : true}
            // }
        );
        console.log('product********>', product.state)
        if(product.state == true){
            productsDB.push(product);
        }
    }

    for(let j=0; j<productsDB.length; j++){

        let dataFormater = await formaterProduct(productsDB[j]);
        dataProducts.products.push(dataFormater);
    }

    return res.status(200).json(dataProducts);
}

const deleteProductCategory = async (req, res) => {

    const { category, productId } = req.body;

    const rolUser = await User.findByPk(req.user.id);

     //Check user is admin
    if( rolUser.rolId == 3) {
        return res.status(401).json({
            message : "No tienes los permisos para realizar la acción deseada"
        })
    }

     //Check by exist product
    const existProduct = await ProductXCategory.findOne({ where: {
        CategoryId : category, 
        ProductId : productId,
    }});

    if(!existProduct){
        return res.status(400).json({
            msg: "El producto no existe en esta categoria"
        })
    }

    await existProduct.destroy();

    return res.status(200).json({
        msg: 'Producto eliminado exitosamente'
    })
}

const getCotization = async (req, res) => {

    console.log('REFERENCE', req.params.reference);

    const username = '2023PAFi';
    const password = 'INTUSERPAF';
    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;  

    console.log('ingresa al try')
        const headers = {
            Authorization: authHeader,
        };

        const response = await axios.get('https://170.239.154.131:4300/CSS_Cotizaciones/api/test/login', { headers });
        return res.json(response.data);
    
    // try {
        
    // } catch (error) {
    //     console.log('Ingresa al catch')
    //    return res.status(500).json({ error: 'Error al consultar la API' });
    // }

    // const response = await axios.get(
    //     'https://170.239.154.131:4300/CSS_Cotizaciones/api/test/login', 
    //     {
    //         params: queryParams
    //     });
    // console.log('RESPONSE', response);

    // res.json({
    //     data: response.data,
    //     loading: false
    // });
}

export {
    AddProduct,
    addProductToCategory,
    AllProducts,
    updateProduct,
    updateStatus,
    deleteProduct,
    productPdf,
    productById,
    getProductsByCategory,
    deleteProductCategory,
    getCotization,
    getProductsApprovedByCategory
}




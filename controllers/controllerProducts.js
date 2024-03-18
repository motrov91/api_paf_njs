import { organizedDataSQL, formaterProduct } from '../helpers/organizedDataSQLProduct.js';
import { Product, User, ProductXCategory, PdfProduct } from '../models/index_model.js';
import { LocalPDF, destroyPDF } from '../helpers/localPDF.js';
import axios from 'axios';
import curlirize from 'axios-curlirize';
import { sendEmailProduct } from '../helpers/emails.js'



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
        //en el body llegan elementos dentro de listas, al final retoraa un objeto, listo para cargar.
        let dataProduct = organizedDataSQL(req.body);

        //Revisar esta linea porque puede esta haciendo lo mismo que la de abajo(40).
        dataProduct['userId'] = req.user.id;
        
        //Se le asigna la respuesta de la creacion del usuario en la base de datos.
        const productData = await Product.create(dataProduct);

        //Recibe el objeto del producto recien creado y lo formatea para organizarlo en listas para mostrar en la respuesta.
        let dataFormater = await formaterProduct(productData);

        return res.status(200).json(dataFormater);
        
    } catch (error) {
        console.log(`Error: ${error}`)
        return res.status(400).json({
            message: "Ha sucedido un error al momento de crear el producto"
        })
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
    try {

        if( userExist.rolId == 1 || userExist.rolId == 3 || userExist.rolId == 4 ){
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
        
    } catch (error) {
        return res.status(400).json({msg : 'Error al momento de cargar los producto'})
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

    try {
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
    } catch (error) {
        console.log('Error', error)
        return res.status(400).json({
            msg: "Se ha producido un error almomento de modificar el producto"
        })
    }

    

}

const updateStatus = async (req, res ) => {
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
        try {
            //* Check if exist pdf producto in db
            const pdfExist = await Product.findByPk(req.params.id);

            if(!pdfExist){
                console.log('ingresa porque no existe ningun pdf')
                return res.status(404).json('No se ha encontrado el producto que se busca.');
            };

            
            pdfExist['secureUrlPdf'] = null;
            pdfExist['publicIdPdf'] = null;

            pdfExist.save();
            await destroyPDF(pdfExist.publicId)

            return res.status(200).json('Producto despublicado exitosamente');

        } catch (error) {
            return res.status(400).json('No se ha podido completar la acción');
        }
    }

    return;

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

    const {CategoryId, ProductId} = req.body;

    const productById = await ProductXCategory.findOne({ where: {
        CategoryId : CategoryId, 
        ProductId : ProductId,
    }})

    if(productById == null){
        try {
            await ProductXCategory.create(req.body)
            return res.json({msg: "Exitoso"})
        } catch (error) {
            return res.status(404).json({msg: "No se ha podido completar la trasacción"})
        }
    }else{
        return res.status(400).json({msg: "Al parecer ya esta vinculado el producto a la categoria"})
    }

    const pdfProduct = await PdfProduct.findOne({

    })

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

    try {
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
    
    } catch (error) {
        return res.status(501).json({
            'Error': "No se pudo completar la transacción"
        })
    }
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

const getLoginCotization = async (req, res) => {
    let data;

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://170.239.154.131:4300/CSS_Cotizaciones/api/test/login',
        headers: { 
          'Authorization': 'Basic SU5UVVNFUlBBRjoyMDIzUEFGaQ==', 
          'Cookie': 'sapxslb=598F97697387964C85FCDE1F8FAEC4A0; xsSecureId44E71A007C073438083DAAC5655DC2FF=C799030EE83F2341939BC18AE4DB6CC9'
        },
        data: {
            "Username": process.env.USERNAMEPRODUCT,
            "Password" : process.env.PASSWORDPRODUCT
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        data = response.data
        return res.json(response.data)
      })
      .catch((error) => {
        return console.log(error);
      });
}

const getProductsChild = async (req, res) => {

    const { reference, token } = req.body;


    // Valor del encabezado X-CSRF-Token que deseas enviar
    const csrfToken = token.trim();

    //inicia axios-curlirize
    curlirize(axios);

    const username = process.env.USERNAMEPRODUCT;
    const password = process.env.PASSWORDPRODUCT;
    console.log({token, username, password})

    // Combina el nombre de usuario y la contraseña en una cadena con formato "usuario:contraseña"
    const credentials = `${username}:${password}`;

    // Codifica las credenciales en Base64
    const base64Credentials = Buffer.from(credentials).toString('base64');

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 

    // Configura los encabezados personalizados
    const customHeaders = {
        'X-CSRF-Token': csrfToken,
        'Authorization': `Basic ${base64Credentials}`,
        'Cookie' : 'sapxslb=CD48102D46475246AAF242318DAB2B60; xsSecureIdBCF4987D100731B9F6395E03CB8613C3=510B062BB170BD44B2EA4268FA71127E',
    };


    // Opciones de la solicitud
    const requestOptions = {
        method: 'get', 
        url: 'https://170.239.154.131:4300/CSS_Cotizaciones/api/references/6300096400', // URL de la API que deseas consultar
        headers: customHeaders, 
    };

    // Realiza la solicitud utilizando axios.request
    axios.request(requestOptions)
    .then(response => {
        // Aquí puedes manejar la respuesta de la API
        console.log('Respuesta de la API:', response.data);
    })
    .catch(error => {
        // Aquí puedes manejar errores
        console.error('Error al hacer la solicitud:', error);
    })

}

const sendProductoEmail = async(req, res) => {
    console.log('body message', req.body)
    const { emailUser, nameUser, emailClient, messageList } = req.body;
    
    let listaConvertidaMensajes = JSON.parse(messageList);
    
    let result = await sendEmailProduct(emailClient, nameUser, emailUser, listaConvertidaMensajes)
    return res.status(200).json({'statusMessage': result});
} 

const getProductsByPdf = async(req, res) => {
    const productListPdf = []
    try {
        const products = await ProductXCategory.findAll({
            where: { CategoryId: req.params.id },
        });

        await Promise.all(products.map(async (e)=>{
            try {
                const producto = await Product.findByPk(e['ProductId']);
                const { publicIdPdf, secureUrlPdf } = producto;
                
                if(secureUrlPdf !== null){
                    const item = {
                        publicIdPdf,
                        secureUrlPdf
                    }
                    productListPdf.push(item);
                }

            } catch (error) {
                console.log(error)
            }
        }))

        res.status(200).json(productListPdf);
    } catch (error) {
        console.log('ERROR', error)
    }
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
    getLoginCotization,
    getProductsChild,
    getProductsApprovedByCategory,
    sendProductoEmail,
    getProductsByPdf,
}




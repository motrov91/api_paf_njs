import {fileURLToPath} from 'url';
import fs from 'fs';
import path from 'path';

import { v2 as cloudinary } from 'cloudinary'

import { uploadFileHL } from '../helpers/upload_file.js'
import { Product, User } from '../models/index_model.js';


cloudinary.config( process.env.CLOUDINARY_URL )

const uploadFile = async (req, res) => {

    try {
        //const nameFileUploaded = await uploadFileHL( req.files, ['rtf', 'txt'], 'textos' );
        const nameFileUploaded = await uploadFileHL( req.files, undefined, 'images' );
        res.json({ nameFileUploaded });
        
    } catch (msg) {
        res.status(400).json({ msg });
    }

    

}

const updateImageProduct = async (req, res) => {

    const { id } = req.params;

    //Check by exist product
    const existProduct = await Product.findByPk(id);

    if(!existProduct){
        return res.status(400).json({
            msg: "El producto no existe"
        })
    }

    //Clean images
    if(existProduct.img){
        //Delete image in server
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const pathImage = path.join( __dirname, '../uploads/', 'imgs', existProduct.img ); 

        if(fs.existsSync( pathImage )){
            fs.unlinkSync( pathImage );
        }

    }


    //Upload image 
    const nameFile = await uploadFileHL(req.files, undefined, 'imgs');

    existProduct.img = nameFile;

    await existProduct.save()

    console.log('Actualización existosa')

    res.json({nameFile})

}
const updateImageProductCloud = async (req, res) => {

    const { id } = req.params;

    console.log('++++',req.files)

    //Check by exist product
    const existProduct = await Product.findByPk(id);

    if(!existProduct){
        return res.status(400).json({
            msg: "El producto no existe"
        })
    }

    // const nameArr = existProduct.img.split('/');

    // let extensionArc = nameArr[nameArr.length-1];

    // let extensionFinal = extensionArc.split('.');

    // console.log(extensionFinal)

    // if(extensionFinal[extensionArc.length-1] == 'webp'  ){
    //     console.log('ingresa');
    //     return res.status(400).json({
    //         msg: 'La imagen no tiene un formato valido'
    //     })
    // }

    try {

         //Clean images
        if(existProduct.img){
            //TODO : Clean image server
            //Delete image in server
            // const __filename = fileURLToPath(import.meta.url);
            // const __dirname = path.dirname(__filename);

            // const pathImage = path.join( __dirname, '../uploads/', 'imgs', existProduct.img ); 

            // if(fs.existsSync( pathImage )){
            //     fs.unlinkSync( pathImage );
            // }

            const nameArr = existProduct.img.split('/');

            const reference = nameArr[ nameArr.length - 1 ];
            const [ public_id ] = reference.split('.');

            cloudinary.uploader.destroy( public_id );
        }

        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
        existProduct.img = secure_url;

        await existProduct.save()

        const product = await Product.findByPk(id ,{   
            include: [
                { model: User.scope('deletePassword') }
            ]
        });


        //Upload image 
        // const nameFile = await uploadFileHL(req.files, undefined, 'imgs');

        // existProduct.img = nameFile;

        // await existProduct.save()

        // console.log('Actualización existosa')

        return res.status(200).json(product);
        
    } catch (error) {
        console.log(error)
    }

   

}



export {
    uploadFile,
    updateImageProduct,
    updateImageProductCloud
}   
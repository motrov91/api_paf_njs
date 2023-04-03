import path from 'path';
import {fileURLToPath} from 'url';
import { v4 as uuidv4 } from 'uuid';


const uploadFileHL = ( files, validExtension = [ 'png', 'jpg', 'jpeg', 'gif'], folder = '' ) => {

    return new Promise((resolve, reject) => {
        
        const { archivo } = files;

        const dividername = archivo.name.split('.');

        const extension = dividername[ dividername.length -1 ];

        if(!validExtension.includes(extension)){
            return reject(`La extensión ${extension} no se encuentra dentro de las extensiones validas ${ validExtension }`)
        }

        const temporalName = uuidv4() + '.' + extension;

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const uploadPath = path.join( __dirname, '../uploads/', folder, temporalName );

        archivo.mv(uploadPath, (err) => {
            if (err) {
                console.log(err)
                return reject(err)
            }

            resolve( temporalName );
        });

    })
   
}

export {
    uploadFileHL
}
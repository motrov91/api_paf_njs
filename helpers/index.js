import generateJWT from './generateJWT';
import tokens from './tokens';
import uploadFile from './upload_file';


module.exports = {
    ...generateJWT,
    ...tokens ,
    ...uploadFile 
}
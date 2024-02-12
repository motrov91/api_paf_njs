import jwt from 'jsonwebtoken';
import { User } from '../models/index_model.js';


const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if(!token){
        console.log('no esta llegando un token')
        return res.status(401).json({
            msg: 'No hay un token en la petición'
        });
    }

    try {

        const { id } = jwt.verify( token, process.env.JWT_SECRET )

        //console.log("ID>>>>>>>>", id)

        //Verificar usuario en la base de datos
        const user = await User.findByPk(id);

        //console.log("USER>>>>>>>>", user)

        if(!user){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Token no válido"
        })
    }
}

export {
    validateJWT
}
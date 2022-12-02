import {check, validationResult} from 'express-validator';
import { User } from '../models/index_model.js';
import { generateJWT } from '../helpers/tokens.js'
import { secureJWT } from '../helpers/generateJWT.js'

const  loginUser = async (req, res, next) => {
    console.log(req.body);
    check('email').isEmail().withMessage('Debe ingresar un email').run(req);
    check('password').notEmpty().withMessage('La contraseña debe ser obligatoria').run(req);

    let result = validationResult(req);

    if(!result.isEmpty()){
        return res.json(result.array())
    }

    const { email, password } = req.body;

    try {

        //Check user in the db
        const user = await User.findOne({ where: {email} });

        if(!user){
            return res.status(400).json({
                msg: 'El usuario no se encuentra registrado'
            });
        }

        const userData = {
            "id" : user.id,
            "name": user.name,
            "email": user.email,
            "cargo": user.cargo,
            "rolId": user.rolId

        }

        //Check password with db and client
        if(!user.verifyPassword(password)){
            return res.status(400).json({
                msg: 'El password no es correcto.'
            });
        }

        const token = generateJWT({ id: user.id, name: user.name, email: user.email, cargo: user.cargo });

        return res.send({
            userData,
            token,
            code: 200
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Contacte con el administrador'
        });
    }

    

}

const validateTokenUser = async(req, res) => {

    console.log("Ingresa......");
    //Generate JWT
    const token = await secureJWT(req.user.id);

    console.log('TOKEN', token);

    res.send({
        userData : req.user,
        token : token,
        code: 200
    })
}

export {
    loginUser,
    validateTokenUser
}
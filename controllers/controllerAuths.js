import {check, validationResult} from 'express-validator';
import { User } from '../models/index_model.js';
import { generateJWT, tokenRecovery } from '../helpers/tokens.js'
import { secureJWT } from '../helpers/generateJWT.js'
import { emailRecovery } from '../helpers/emails.js';
import bcrypt from 'bcrypt';

const  loginUser = async (req, res) => {
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

        //console.log('========================================================================')
        //console.log({token})
        //console.log('========================================================================')

        return res.status(200).send({
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

    //console.log("Ingresa......");
    //Generate JWT  
    const token = await secureJWT(req.user.id);

    //console.log('TOKEN', token);

    res.send({
        userData : req.user,
        token : token,
        code: 200
    })
}

const validateEmail = async (req, res) => {

    //console.log(req.body)

    const { emailToVerificate } = req.body;

    const userData = await User.findOne({
        where: {
            email : emailToVerificate 
        }
    })

    if(!userData){
        return res.status(400).json({ "usuarioStatus" : false })
    }

    try {
        ///tokenRecovery crea el token y se lo asigna a token.
        const token = tokenRecovery();

        userData.set({
            token
        })

        await userData.save();

        //Función creada en el helper email y recibe como parametros [nombre, email, token]
        emailRecovery({
            nombre: userData.name,
            email: userData.email,
            token: token
        })

        res.status(200).json({"usuarioStatus" : true})
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            "usuarioStatus" : false
        })
    }

    
}

const changesPassword = async(req, res) =>{

    const tokenData = req.params['token'];
    const { newPass, repeat } = req.body;

    //Verificar que el token sea válido.
    const userData = await User.findOne({ where: {token : tokenData}})

    if(!userData){
        return res.status(400).json({ msg:"Token no valido" });
    }

    try {

        const salt = await bcrypt.genSalt(10);
        const passwordEncrypted = await bcrypt.hash(newPass, salt);

        userData.set({
            password : passwordEncrypted,
            token : null
        })

        await userData.save();

        return res.status(200).json({msg: "success"});
        
    } catch (error) {
        return res.status(400).json({ msg:"Error al modificar el password" });
    }

    
}

export {
    loginUser,
    validateTokenUser,
    validateEmail,
    changesPassword
}
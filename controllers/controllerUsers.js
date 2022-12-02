//check -> verify an input
//validationResult -> save result of validation
import { check, validationResult } from 'express-validator';

import {User, Rol, Category} from '../models/index_model.js'

//* Method to create users in db
const addUser = async (req, res, next) => {

    console.log('add', req.body);

    //Validate data of user
     await check('name').notEmpty().withMessage('El nombre es obligatorio').run(req)
     await check('email').isEmail().withMessage('No parece ser un email').run(req)
     await check('password').isLength({min: 7}).withMessage('La contraseña debe contener al menos siete (7) caracteres').run(req)
     await check('repeat_password').equals(req.body.password).withMessage('Las contraseñas al parecer no coinciden').run(req)
     await check('cargo').notEmpty().withMessage('El nombre es obligatorio').run(req)

    let result = validationResult(req);

    if(!result.isEmpty()){
        return res.json(result.array())   
    }

    //verify by duplicate email
    const existUser = await User.findOne({ where:{ email : req.body.email } })

    if(existUser){
        return res.json({
            message : 'El usuario ya se encuentra registrado',
            code: 400
        })
    }

    try {
        const user = await User.create(req.body)

        return res.status(200).json(user)
        
    } catch (error) {
        console.log(`Error : ${error}`)
        next()
    }
    
}

//* Method to search all users in db
const allUsers = async (req, res, next) =>{
    
    const users = await User.scope('deletePassword').findAll();
    return res.json({users});
}

//* Method to create administrators in db
const addRol = async (req, res, next) =>{
    //Validate data
    await check('rol').notEmpty().withMessage('El campo no puede estar vácio').run(req)

    let result = validationResult(req);

    if(!result.isEmpty()){
        return res.json(result.array())   
    }

    const { rol } = req.body;

    const newRol = rol.toUpperCase();

    await Rol.create({
        rol: newRol
    });

    res.json({
        code: 200,
        response: 'Rol creado con éxito'
    })

}

const modifyUser = async (req, res, next) => {

    const {name, email, cargo, rolId} = req.body;

    const existUser = await User.findByPk(req.params.id)

    if(!existUser){
        return res.status(400).json({
            msg: "El usuario no existe"
        })
    }

    existUser.set({
        name,
        email,
        cargo,
        rolId
    })

    await existUser.save();

    return res.status(200).json({
        response: "Success"
    })

}

const deleteUser = async (req, res, next) =>{
    const { id } = req.params;
    console.log('ID', id)
    await User.destroy({
        where: { id : id }
    })
    return res.status(200).json({
        msg: "Eliminación Exitosa"
    })
}

export {
    addUser,
    allUsers,
    addRol,
    modifyUser,
    deleteUser
}
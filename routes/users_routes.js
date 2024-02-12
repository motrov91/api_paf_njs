import express from 'express';
import { addRol, addUser, allUsers, modifyUser, deleteUser } from '../controllers/controllerUsers.js'
import{ validateJWT } from '../middlewares/validate-jwt.js'

const router = express.Router();

    
//* - Administrator - *// 
    //Add new user
    //Para crear un usuario es necesario tener creado roles
    router.post('/add-user', [ validateJWT ], addUser);

    //Get all users
    router.get('/all-users', [ validateJWT ], allUsers);

    router.post('/add-rol', [ validateJWT ], addRol);

    router.put('/update-user/:id', [ validateJWT ], modifyUser);

    router.delete('/delete-user/:id', [ validateJWT ], deleteUser);

export default router;
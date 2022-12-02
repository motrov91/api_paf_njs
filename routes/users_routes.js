import express from 'express';
import { addRol, addUser, allUsers, modifyUser, deleteUser } from '../controllers/controllerUsers.js'

const router = express.Router();

    
//* - Administrator - *// 
    //Add new user
    //Para crear un usuario es necesario tener creado roles
    router.post('/add-user', addUser);

    //Get all users
    router.get('/all-users', allUsers);

    router.post('/add-rol', addRol);

    router.put('/update-user/:id', modifyUser);

    router.delete('/delete-user/:id', deleteUser);

export default router;
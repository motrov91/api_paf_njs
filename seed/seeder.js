import { exit } from 'node:process';
import roles from "./roles.js";
import rol from '../models/roles_model.js';

import db from '../config/db.js';

const dataImport = async () => {
    try {

        await db.authenticate();

        await db.sync();

        await rol.bulkCreate(roles);
        console.log('Creacion de roles exitoso');
        exit();
        
    } catch (error) {
        console.log(error);
        exit(1);
    }
}

if(process.argv[2] === "-i"){
    dataImport();
}
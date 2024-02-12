import express from 'express';
import { reportProblem, deleteAccount } from '../controllers/controllerReports.js'
import{ validateJWT } from '../middlewares/validate-jwt.js'


const router = express.Router();

    
//* - Administrator - *// 
    //Reportar un problema en la aplicación
    router.post('/report-problem', [ validateJWT ], reportProblem);

    //Eliinar cuenta dentro de la aplicacion
    router.post('/delete-account', [ validateJWT ], deleteAccount);

export default router;
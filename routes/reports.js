import express from 'express';
import { reportProblem, deleteAccount, sessionsApp } from '../controllers/controllerReports.js'
import{ validateJWT } from '../middlewares/validate-jwt.js'


const router = express.Router();

    
//* - Administrator - *// 
    //Reportar un problema en la aplicación
    router.post('/report-problem', [ validateJWT ], reportProblem);

    //Eliinar cuenta dentro de la aplicacion
    router.post('/delete-account', [validateJWT], deleteAccount);
    
//Obtener todos las sessiones de la app
    router.get('/get-sessions', [validateJWT], sessionsApp)

export default router;
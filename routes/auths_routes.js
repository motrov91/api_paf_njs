import express from "express";
import { loginUser, validateTokenUser, validateEmail, changesPassword } from "../controllers/controllerAuths.js";
import{ validateJWT } from '../middlewares/validate-jwt.js'

const router = express.Router();

//[] dentro de las llaves se van a cargar todos los middlewares que consideremos necesarios
router.get('/', [ validateJWT ], validateTokenUser )
router.post('/login', loginUser);
router.post('/valitadeEmail', validateEmail);
router.post('/changePassword/:token', changesPassword);


export default router;
import express from "express";
import { loginUser, validateTokenUser } from "../controllers/controllerAuths.js";
import{ validateJWT } from '../middlewares/validate-jwt.js'

const router = express.Router();

//[] dentro de las llaves se van a cargar todos los middlewares que consideremos necesarios
router.get('/', [ validateJWT ], validateTokenUser )
router.post('/login', loginUser);


export default router;
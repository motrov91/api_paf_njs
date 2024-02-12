import express  from "express";
import { uploadFile, uploadImageBrandCloud, updateImageProductCloud } from "../controllers/controllerUploads.js";
import { validateFileUp } from "../middlewares/validate_file.js"

const router = express.Router();

    router.put('/upload_img', [ validateFileUp ], uploadFile);
    router.put('/product/:id', [ validateFileUp ], updateImageProductCloud)
    router.put('/brandImage/:id', [ validateFileUp ], uploadImageBrandCloud)


export default router;



import express  from "express";
import { uploadFile, updateImageProduct, updateImageProductCloud } from "../controllers/controllerUploads.js";
import { validateFileUp } from "../middlewares/validate_file.js"

const router = express.Router();

    router.put('/upload_img', [ validateFileUp ], uploadFile);

    router.put('/product/:id', [ validateFileUp ], updateImageProductCloud)

export default router;



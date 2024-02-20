import express from 'express';
import { addBrand, allBrand, updateBrand, deleteBrand, updateShowStatus} from '../controllers/controllerBrands.js'
import{ validateJWT } from '../middlewares/validate-jwt.js'
const router = express.Router();


    router.post('/add-brand', addBrand);
    router.get('/all-brand', allBrand);
    router.put('/update-show/:id', updateShowStatus);
    router.put('/update-brand/:id', updateBrand);
    router.delete('/delete-brand/:id',[validateJWT], deleteBrand);

export default router;

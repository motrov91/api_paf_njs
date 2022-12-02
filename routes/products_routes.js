import express from 'express';
import { AddProduct, AllProducts, updateProduct, deleteProduct } from '../controllers/controllerProducts.js';
import{ validateJWT } from '../middlewares/validate-jwt.js'

const router = express.Router();

    router.post('/add-product',[ validateJWT ], AddProduct);
    router.get('/all-products', [ validateJWT ], AllProducts);
    router.put('/update-product/:id', [ validateJWT ], updateProduct);
    router.delete('/delete-product/:id', [ validateJWT ], deleteProduct);


export default router;
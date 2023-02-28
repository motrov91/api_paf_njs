import express from 'express';
import { AddProduct, AllProducts, updateProduct, updateStatus, deleteProduct, productPdf, productById } from '../controllers/controllerProducts.js';
import{ validateJWT } from '../middlewares/validate-jwt.js'
import { pdfGenerator } from '../helpers/pdf.js';

const router = express.Router();

    router.post('/add-product',[ validateJWT ], AddProduct);
    router.get('/all-products', [ validateJWT ], AllProducts);
    router.get('/product-pdf/:id',[pdfGenerator], productPdf)
    router.get('/product/:id', productById);
    router.put('/update-product/:id', [ validateJWT ], updateProduct);
    router.put('/update-status/:id', [ validateJWT ], updateStatus);
    router.delete('/delete-product/:id', [ validateJWT ], deleteProduct);


export default router;
import express from 'express';
import { AddProduct, AllProducts, updateProduct, updateStatus, deleteProduct, deleteProductCategory, productPdf, 
    productById, addProductToCategory, getProductsByCategory , getLoginCotization, getProductsApprovedByCategory, 
    getProductsChild, sendProductoEmail, getProductsByPdf} from '../controllers/controllerProducts.js';
import{ validateJWT } from '../middlewares/validate-jwt.js'
import { pdfGenerator } from '../helpers/pdf.js';

const router = express.Router();

    router.post('/add-product',[ validateJWT ], AddProduct);
    router.post('/addProductToCategory', [validateJWT], addProductToCategory)
    router.post('/productsChild', getProductsChild)
    router.post('/sendEmailProduct', [ validateJWT ], sendProductoEmail);
    router.get('/pdfProductsByCategory/:id', getProductsByPdf);
    router.get('/all-products', [ validateJWT ], AllProducts);
    router.get('/product-pdf/:id',[pdfGenerator], productPdf)
    router.get('/product/:id', productById);
    router.get('/all-products-id/:id', [ validateJWT ], getProductsByCategory);
    router.get('/all-products-approved-id/:id', [ validateJWT ], getProductsApprovedByCategory);
    router.get('/login-cotization'/*, [validateJWT]*/, getLoginCotization);
    router.get('/getParents/:reference')
    router.put('/update-product/:id', [ validateJWT ], updateProduct);
    router.put('/update-status/:id', [ validateJWT ], updateStatus);
    router.delete('/delete-product/:id', [ validateJWT ], deleteProduct);
    router.delete('/delete-product-category', [ validateJWT ], deleteProductCategory);

export default router;
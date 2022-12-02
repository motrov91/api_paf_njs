import express from 'express';
import { addCategory, allCategories, updateCategory, deleteCategory } from '../controllers/controllerCategories.js';
import{ validateJWT } from '../middlewares/validate-jwt.js';

const router = express.Router();

    //Add category product
    router.post('/add-category', addCategory);
    router.get('/all-categories', allCategories);
    router.put('/update-category/:id', updateCategory);
    router.delete('/delete-category/:id', [validateJWT], deleteCategory);

export default router; 
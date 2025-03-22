const express = require ('express');
const{
    getProduct,
    addProduct,
    deleteProduct,
    getProductBYId,
    updateProduct,
    favoriteProduct,
} = require('../backend/controllers/productController');

const router = express.Router();

router.get('/products',getProduct);
router.get('/products/:id',getProductBYId);
router.post('/products',addProduct);
router.put('/products/:id',updateProduct);
router.put('/productsFav/:id',favoriteProduct);
router.delete('/products/:id',deleteProduct);




module.exports = router;
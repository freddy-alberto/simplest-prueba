const express = require('express');
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Todos los autenticados ven y actualizan stock
router.get('/', verifyToken, getProducts);
router.put('/:id', verifyToken, updateProduct);

// Solo el ADMIN crea o borra 
router.post('/', verifyToken, isAdmin, addProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;
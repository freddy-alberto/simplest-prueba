const express = require('express');
const router = express.Router();
const { getUsers, updateUserRole } = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

/**
 * Rutas protegidas:
 * Ambas requieren token válido Y ser administrador para ejecutarse.
 */
router.get('/', verifyToken, isAdmin, getUsers);
router.put('/:id', verifyToken, isAdmin, updateUserRole);

module.exports = router;
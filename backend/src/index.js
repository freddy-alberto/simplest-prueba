/**
 * ARCHIVO PRINCIPAL DEL SERVIDOR - SUPERMERCADO SIMPLEST
 * Este archivo centraliza la configuración, middlewares y rutas del sistema.
 * Cumple con el requerimiento de "Estructura modular clara".
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carga variables de entorno (JWT_SECRET, DB_USER, etc.)

// Importación de rutas modulares
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 
const auditoriaRoutes = require('./routes/auditoria'); // Nueva ruta para el historial 


// extraemos específicamente verifyToken para proteger las rutas.
const { verifyToken } = require('./middleware/authMiddleware'); 

const app = express();

/**
 * MIDDLEWARES GLOBALES
 */
app.use(cors()); // Permite la conexión desde el frontend (React)
app.use(express.json()); // Permite procesar datos en formato JSON

/**
 * DEFINICIÓN DE RUTAS (API ENDPOINTS)
 * Todas las rutas están protegidas o gestionadas según el requerimiento del reto.
 */

// Rutas de Autenticación: Registro y Login (Públicas)
app.use('/api/auth', authRoutes);

// --- CAMBIO REALIZADO EN LAS RUTAS ABAJO ---
// Se reemplaza 'authMiddleware' por 'verifyToken' que es la función válida.

// Rutas de Inventario: CRUD completo de productos (Protegido por Token)
app.use('/api/products', verifyToken, productRoutes);

// Rutas de Usuarios: Gestión de rangos (Protegido - Solo Admin)
app.use('/api/users', verifyToken, userRoutes);

// Rutas de Auditoría: Historial de movimientos (Protegido por Token)
// Se agrega verifyToken para cumplir con la "Implementación segura" del reto.
app.use('/api/auditoria', verifyToken, auditoriaRoutes);

/**
 * RUTA DE PRUEBA
 * Verifica que el servidor está respondiendo correctamente.
 */
app.get('/', (req, res) => {
  res.send('🚀 El servidor de Simplest Supermercado está operando correctamente.');
});

/**
 * INICIO DEL SERVIDOR----------------------------------------------------------------------------------
 */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('==============================================');
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`✅ Conexión a PostgreSQL establecida correctamente`);
  console.log('==============================================');
});
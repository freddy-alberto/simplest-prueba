const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// RUTA: Obtener historial para el Admin-- asi lleva registro
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.auditoria ORDER BY fecha DESC');
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Error al obtener auditoría:", err.message);
        res.status(500).send('Error al obtener la auditoría');
    }
});

/**
 * FUNCIÓN: registrarAccion 
 * muestra el nombre del usuario
 */
const registrarAccion = async (usuario, accion, detalles) => {
    try {
        
        // Si el usuario llega como undefined, intentamos identificar por qué
        let nombreFinal = usuario;

        if (!usuario || usuario === 'Desconocido') {
            console.log("⚠️ ADVERTENCIA: El controlador no envió un nombre de usuario válido.");
            nombreFinal = 'Anonimo/Sistema'; 
        }

        // Insertar en la base de datos--los datos
        await pool.query(
            'INSERT INTO public.auditoria (usuario, accion, detalles) VALUES ($1, $2, $3)',
            [nombreFinal, accion, detalles]
        );

        // NOTIFICACIÓN EN CONSOLA CON MÁS DETALLES
        console.log(`--------------------------------------------------`);
        console.log(`🔔 REGISTRO EXITOSO`);
        console.log(`👤 Ejecutado por: ${nombreFinal}`);
        console.log(`🛠️ Acción: ${accion}`);
        console.log(`📦 Info: ${detalles}`);
        console.log(`--------------------------------------------------`);

    } catch (err) {
        console.error('❌ Error en el INSERT de auditoría:', err.message);
    }
};

module.exports = router;
module.exports.registrarAccion = registrarAccion;
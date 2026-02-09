const db = require('../config/db');

/**
 * Obtiene todos los usuarios registrados.
 * Lógica: Se usa para que el admin vea a quién puede promover o bloquear.
 */
const getUsers = async (req, res) => {
    try {
        // Seleccionamos ID, nombre y rol (nunca enviamos la contraseña por seguridad)
        const result = await db.query('SELECT id, username, role FROM users ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Error al obtener usuarios:", err.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

/**
 * Actualiza el rol de un usuario (admin, empleado, bloqueado).
 *  El frontend evita que el admin se auto-bloquee.
 */
const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    // Validación que Solo permitimos roles válidos
    const validRoles = ['admin', 'empleado', 'bloqueado'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ error: 'Rol no válido' });
    }

    try {
        const result = await db.query(
            'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, username, role',
            [role, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log(`✅ Acción completa: Usuario ${result.rows[0].username} ahora es ${role}`);
        res.json(result.rows[0]);
    } catch (err) {
        console.error("❌ Error al actualizar rol:", err.message);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

module.exports = { getUsers, updateUserRole };
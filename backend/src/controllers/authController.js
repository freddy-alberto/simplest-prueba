const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * REGISTRO: Crea un nuevo usuario.
 * Por defecto, todos los nuevos  son nada más que'empleado'.
 */
const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        // 1. Validar que los campos no estén vacíos o solo contengan espacios
        if (!username?.trim() || !password?.trim()) {
            console.error("❌ Registro fallido: Campos vacíos");
            return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
        }

        // 2. Encriptar la contraseña (Seguridad: Nunca guardar claves en texto plano)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Insertar en la base de datos con el rol 'empleado'
        const newUser = await db.query(
            'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
            [username.trim(), hashedPassword, 'empleado']
        );

        console.log(`✅ Usuario ${username} registrado correctamente en el servidor`);
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error("❌ Error en registro:", err.message);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

/**
 * LOGIN: Valida las credenciales y genera el Token de acceso.
 * Modificado para incluir el nombre de usuario dentro del Token.
 */
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // 1. Buscar si el usuario existe en la tabla 'users'
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const user = result.rows[0];

        // 2. Comparar la contraseña ingresada con el hash guardado en la DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error(`❌ Intento de login fallido para: ${username}`);
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        /**
         * 3. GENERACIÓN DEL TOKEN JWT
         * Añadimos 'username' al payload. Esto permite que cualquier parte 
         * del sistema sepa quién es el usuario logueado sin consultar la DB.
         */
        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username, // <--- CAMBIO CLAVE: Permite identificar al autor en Auditoría
                role: user.role 
            },
            process.env.JWT_SECRET || 'clave_secreta_provisional',
            { expiresIn: '8h' }
        );

        // Notificación en la consola del servidor para rastreo
        console.log(`✅ Login exitoso: ${username} (Rol: ${user.role})`);

        // Enviamos el token y los datos para que el Frontend los guarde en localStorage
        res.json({ 
            token, 
            user: { 
                username: user.username, 
                role: user.role 
            } 
        });
        
    } catch (err) {
        console.error("❌ Error interno en Login:", err.message);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = { register, login };
const jwt = require('jsonwebtoken');

/*
 * MIDDLEWARE: verifyToken
 * Intercepta la petición, extrae el Token y recupera los datos del usuario.
 */
const verifyToken = (req, res, next) => {
    // 1. Extraemos el encabezado 'Authorization'
    const authHeader = req.headers['authorization'];
    
    // El token suele venir como "Bearer XXXXX...", tomamos solo la parte del código
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado: No se encontró el token' });
    }

    try {
        /**
         * 2. VERIFICACIÓN:
         * Usamos la clave secreta para descifrar el token.
         * Si el login guardó el 'username', aquí lo recuperamos.
         */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3- INYECCIÓN DE DATOS:
        // Guardamos el objeto decodificado en 'req.user' para que los 
        // controladores (productos/auditoria) puedan usar 'req.user.username'.
        req.user = decoded; 
        
        next(); // Permite que la petición continúe//
    } catch (err) {
        console.error("❌ Error al procesar el Token:", err.message);
        return res.status(401).json({ error: 'Sesión expirada o token no válido' });
    }
};

/**
 * MIDDLEWARE: isAdmin
 * Restringe el acceso a funciones que solo el Administrador puede hacer, con el fin de crear roles claros.
 */
const isAdmin = (req, res, next) => {
    // Verificamos si los datos inyectados en verifyToken tienen el rol 'admin'
    if (!req.user || req.user.role !== 'admin') {
        console.warn(`⚠️ Intento de acceso no autorizado de: ${req.user?.username || 'Desconocido'}`);
        return res.status(403).json({ error: 'Acceso denegado: Se requiere ser Administrador' });
    }
    next();
};

module.exports = { verifyToken, isAdmin };
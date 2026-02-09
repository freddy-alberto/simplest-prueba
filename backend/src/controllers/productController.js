const db = require('../config/db');
// IMPORTANTE: Importamos la función de registro desde el archivo de rutas de auditoría
const { registrarAccion } = require('../routes/auditoria');

// LEER: Obtiene todos los productos de la base de datos
const getProducts = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// CREAR: Registra un nuevo producto y guarda quién lo hizo
const addProduct = async (req, res) => {
    const { name, price, stock } = req.body;

    // Validación básica de entrada
    if (!name?.trim() || isNaN(price) || isNaN(stock) || price <= 0 || stock < 0) {
        return res.status(400).json({ error: 'Datos inválidos.' });
    }

    try {
        // Insertamos el producto en la tabla 'products'
        const result = await db.query(
            'INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *',
            [name.trim(), price, stock]
        );
        
        // --- LÓGICA DE AUDITORÍA CON DEPURACIÓN ---
        // 1 Rastreamos qué llega exactamente en el objeto req.user
        console.log("DEBUG - Datos del usuario en CREAR:", req.user);

        // 2. Intentamos capturar el nombre desde cualquier propiedad posible del token
        const responsable = req.user?.username || req.user?.name || `ID:${req.user?.id}`; 
        
        // 3. Llamamos a registrarAccion pasando el nombre capturado
        await registrarAccion(responsable, 'CREAR', `Añadió el producto: ${name.trim()}`);
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error en addProduct:", err);
        res.status(500).json({ error: 'Error al guardar' });
    }
};

// ACTUALIZAR: Modifica stock o precio y registra al responsable
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { price, stock } = req.body;

    if (isNaN(price) || isNaN(stock) || price <= 0 || stock < 0) {
        return res.status(400).json({ error: 'Valores numéricos inválidos' });
    }

    try {
        // Ejecutamos la actualización en la base de datos
        const result = await db.query(
            'UPDATE products SET price = $1, stock = $2 WHERE id = $3 RETURNING *',
            [price, stock, id]
        );
        
        // --- LÓGICA DE AUDITORÍA y DEPURACIÓN ---
        // 1. Rastreamos qué llega exactamente en el objeto req.user
        console.log("DEBUG - Datos del usuario en ACTUALIZAR:", req.user);

        // 2. Buscamos el nombre del responsable
        const responsable = req.user?.username || req.user?.name || `ID:${req.user?.id}`;

        // 3. Registramos el movimiento
        await registrarAccion(responsable, 'ACTUALIZAR', `Modificó producto ID: ${id} (Precio: ${price}, Stock: ${stock})`);
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error en updateProduct:", err);
        res.status(500).json({ error: 'Error al actualizar' });
    }
};

// ELIMINAR: Borra un producto y guarda el registro del Admin que lo ejecutó
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        // 1 Antes de borrar, obtenemos el nombre para que el historial sea descriptivo
        const productData = await db.query('SELECT name FROM products WHERE id = $1', [id]);
        const productName = productData.rows[0]?.name || id;

        // 2. Procedemos a eliminar el registro
        await db.query('DELETE FROM products WHERE id = $1', [id]);
        
        // --- LÓGICA DE AUDITORÍA CON DEPURACIÓN ---
        // 1. Rastreamos qué llega exactamente en el objeto req.user
        console.log("DEBUG - Datos del usuario en ELIMINAR:", req.user);

        // 2. Identificamos al responsable
        const responsable = req.user?.username || req.user?.name || `ID:${req.user?.id}`;

        // 3. Guardamos el log de eliminación
        await registrarAccion(responsable, 'ELIMINAR', `Eliminó el producto: ${productName}`);
        
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        console.error("Error en deleteProduct:", err);
        res.status(500).json({ error: 'Error al eliminar' });
    }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
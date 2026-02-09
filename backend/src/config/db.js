const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
module.exports = pool;

// Manejo básico de eventos del pool para detectar desconexiones inesperadas
pool.on('connect', () => {
  console.log('✅ Pool de conexiones PostgreSQL creado');
});

pool.on('error', (err, client) => {
  console.error('❌ Error inesperado en cliente del pool:', err);
});

module.exports = pool;
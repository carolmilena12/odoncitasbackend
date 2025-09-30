const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_reservas',
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});

// Probar la conexión al iniciar
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error conectando a MySQL:', err.message);
  } else {
    console.log('✅ Conexión a MySQL establecida correctamente');
    connection.release();
  }
});

module.exports = pool.promise();
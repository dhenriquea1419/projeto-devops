const mysql = require('mysql2/promise');
require('dotenv').config();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function connectDB() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('🟢 Conexão com o banco de dados MySQL estabelecida com sucesso!');
  } catch (error) {
    console.error('🔴 Erro ao conectar com o banco de dados:', error.message);
    throw new Error(`Falha na conexão: ${error.message}`);
  } finally {
    if (connection) {
      connection.release(); // Libera a conexão de volta para o pool
    }
  }
}

module.exports = { connectDB, pool };
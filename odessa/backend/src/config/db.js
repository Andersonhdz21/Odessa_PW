const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

async function getPool() {
  try {
    if (!global._mssqlPool) {
      global._mssqlPool = await sql.connect(config);
      console.log('✅ Conexión a SQL Server establecida');
    }
    return global._mssqlPool;
  } catch (err) {
    console.error('❌ Error conectando a SQL Server:', {
      error: err.message,
      server: config.server,
      port: config.port,
      database: config.database
    });
    throw err;
  }
}

module.exports = { sql, getPool };
const { getPool } = require('../config/db');

const checkDb = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT 1 AS ok');
    return res.json({ ok: result.recordset[0].ok });
  } catch (err) {
    console.error('DB debug error:', err);
    return res.status(500).json({ message: 'Error de conexión a BD', error: err.message });
  }
};

module.exports = { checkDb };
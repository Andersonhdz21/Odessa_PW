const { getPool, sql } = require('../config/db');
const queries = require('../models/sqlQueries');
const { hashPassword, comparePassword } = require('../utils/hash');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const pool = await getPool();
    const existing = await pool.request()
      .input('email', sql.VarChar, email)
      .query(queries.getUserByEmail);

    if (existing.recordset && existing.recordset.length > 0) {
      return res.status(409).json({ message: 'Usuario ya existe' });
    }

    const passwordHash = await hashPassword(password);

    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .input('passwordHash', sql.VarChar, passwordHash)
      .query(queries.createUser);

    const created = result.recordset && result.recordset[0] ? result.recordset[0] : null;
    return res.status(201).json({ id: created ? created.id : null, username, email });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Faltan datos' });

    const pool = await getPool();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query(queries.getUserByEmail);

    const user = result.recordset && result.recordset[0];
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const match = await comparePassword(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '12h' });

    const { passwordHash, ...userSafe } = user;
    return res.json({ token, user: userSafe });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
}

module.exports = { register, login };
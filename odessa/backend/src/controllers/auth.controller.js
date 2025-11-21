const { getPool, sql } = require('../config/db');
const queries = require('../models/sqlQueries');
const { hashPassword, comparePassword } = require('../utils/hash');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const pool = await getPool();
    // verificar si ya existe el usuario
    const existing = await pool.request().input('email', sql.VarChar, email).query(queries.getUserByEmail);
    if (existing.recordset && existing.recordset.length > 0) {
      return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    const passwordHash = await hashPassword(password);
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .input('passwordHash', sql.VarChar, passwordHash)
      .query(queries.createUser);

    const userId = (result.recordset && result.recordset[0] && result.recordset[0].id) || null;
    return res.status(201).json({ id: userId, message: 'Usuario creado' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan credenciales' });
    }

    const pool = await getPool();
    const result = await pool.request().input('email', sql.VarChar, email).query(queries.getUserByEmail);
    const user = (result.recordset && result.recordset[0]) || null;
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const match = await comparePassword(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

module.exports = { register, login };
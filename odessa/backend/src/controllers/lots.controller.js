const { getPool, sql } = require('../config/db');
const queries = require('../models/sqlQueries');

const createLot = async (req, res) => {
  try {
    const { name, location, price, size, description } = req.body;
    if (!name || !price || !size) {
      return res.status(400).json({ message: 'Faltan datos del lote' });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input('name', sql.VarChar, name)
      .input('location', sql.VarChar, location)
      .input('price', sql.Decimal(18, 2), price)
      .input('size', sql.Decimal(18, 2), size)
      .input('description', sql.Text, description)
      .query(queries.createLot);

    res.status(201).json({ id: result.recordset[0].id, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear el lote' });
  }
};

const getLots = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(queries.getAllLots);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los lotes' });
  }
};

module.exports = { createLot, getLots };
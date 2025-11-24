const { getPool, sql } = require('../config/db');
const queries = require('../models/sqlQueries');

async function listLots(req, res) {
  try {
    const pool = await getPool();
    const result = await pool.request().query(queries.getAllLots);
    return res.json(result.recordset || []);
  } catch (err) {
    console.error('listLots error:', err);
    return res.status(500).json({ message: 'Error obteniendo lotes' });
  }
}

async function getLot(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const pool = await getPool();
    const result = await pool.request().input('id', sql.Int, id).query(queries.getLotById);
    const lot = result.recordset && result.recordset[0];
    if (!lot) return res.status(404).json({ message: 'Lote no encontrado' });
    return res.json(lot);
  } catch (err) {
    console.error('getLot error:', err);
    return res.status(500).json({ message: 'Error obteniendo lote' });
  }
}

async function createLot(req, res) {
  try {
    const { name, location, price, size, description = null } = req.body;
    if (!name || !location || price == null || size == null) {
      return res.status(400).json({ message: 'Faltan datos obligatorios (name, location, price, size)' });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input('name', sql.VarChar(255), name)
      .input('location', sql.VarChar(255), location)
      .input('price', sql.Float, parseFloat(price))
      .input('size', sql.Float, parseFloat(size))
      .input('description', sql.VarChar(sql.MAX), description)
      .query(queries.createLot);

    const created = result.recordset && result.recordset[0];
    return res.status(201).json(created || null);
  } catch (err) {
    console.error('createLot error:', err);
    return res.status(500).json({ message: 'Error creando lote' });
  }
}

async function updateLot(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const { name, location, price, size, description } = req.body;

    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.VarChar(255), name)
      .input('location', sql.VarChar(255), location)
      .input('price', sql.Float, price != null ? parseFloat(price) : null)
      .input('size', sql.Float, size != null ? parseFloat(size) : null)
      .input('description', sql.VarChar(sql.MAX), description)
      .query(queries.updateLot);

    const updated = result.recordset && result.recordset[0];
    if (!updated) return res.status(404).json({ message: 'Lote no encontrado o no modificado' });
    return res.json(updated);
  } catch (err) {
    console.error('updateLot error:', err);
    return res.status(500).json({ message: 'Error actualizando lote' });
  }
}

async function deleteLot(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const pool = await getPool();
    await pool.request().input('id', sql.Int, id).query(queries.deleteLot);
    return res.json({ message: 'Lote eliminado' });
  } catch (err) {
    console.error('deleteLot error:', err);
    return res.status(500).json({ message: 'Error eliminando lote' });
  }
}

module.exports = { listLots, getLot, createLot, updateLot, deleteLot };
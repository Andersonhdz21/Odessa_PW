const { getPool, sql } = require('../config/db');
const queries = require('../models/sqlQueries');

async function getAllSubdivisions(req, res) {
    try {
        const pool = await getPool();
        const result = await pool.request().query(queries.getAllSubdivisions);
        return res.json(result.recordset);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error obteniendo lotificaciones' });
    }
}

async function getSubdivisionById(req, res) {
    try {
        const { id } = req.params;
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(queries.getSubdivisionById);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Lotificación no encontrada' });
        }

        return res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error obteniendo la lotificación' });
    }
}

module.exports = { getAllSubdivisions, getSubdivisionById };
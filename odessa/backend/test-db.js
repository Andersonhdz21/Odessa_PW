const { getPool } = require('./src/config/db');
const dotenv = require('dotenv');

dotenv.config(); 

console.log('---------------------------------------------------');
console.log('🕵️‍♂️ PROBANDO CONEXIÓN A BASE DE DATOS...');
console.log(`📡 Servidor: ${process.env.DB_SERVER}`);
console.log(`👤 Usuario: ${process.env.DB_USER}`);
console.log(`📦 Base de Datos: ${process.env.DB_DATABASE}`);
console.log('---------------------------------------------------');

async function testConnection() {
    try {
        const pool = await getPool();
        console.log('¡ÉXITO! La conexión funciona perfectamente.');
        console.log('Si el Frontend falla, el problema NO es la base de datos.');
        process.exit(0);
    } catch (error) {
        console.error('💀 ERROR FATAL DE CONEXIÓN:');
        console.error(error.message); // Muestra el error exacto
        process.exit(1);
    }
}

testConnection();
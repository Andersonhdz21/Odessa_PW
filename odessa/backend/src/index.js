const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(express.json());

// health check root
app.get('/', (req, res) => res.send('API Odessa funcionando correctamente'));

// montar rutas con manejo de error si faltan archivos
try {
  const lotsRoutes = require('./routes/lots.routes');
  app.use('/api/lots', lotsRoutes);
  console.log('Rutas /api/lots montadas');
} catch (e) {
  console.warn('No se pudo montar /api/lots:', e.message || e);
}

try {
  const authRoutes = require('./routes/auth.routes');
  app.use('/api/auth', authRoutes);
  console.log('Rutas /api/auth montadas');
} catch (e) {
  console.warn('No se pudo montar /api/auth:', e.message || e);
}

// intentar conexión a la BD al arrancar para log claro
let listened = false;
const { getPool } = (() => {
  try {
    return require('./config/db');
  } catch (e) {
    console.warn('No se pudo require ./config/db:', e.message || e);
    return {};
  }
})();

async function checkDbAndStart() {
  if (typeof getPool === 'function') {
    try {
      const pool = await getPool();
      if (pool) console.log('Conexión a SQL establecida');
    } catch (err) {
      console.error('Error conectando a SQL en arranque:', err && err.message ? err.message : err);
      // continuar de todos modos para poder inspeccionar rutas/puerto
    }
  } else {
    console.warn('getPool no disponible: no se intentó conexión a SQL');
  }

  // start server
  const server = app.listen(PORT, () => {
    listened = true;
    console.log(`Backend escuchando en http://localhost:${PORT}`);
  });

  // trap errores del server
  server.on('error', (err) => {
    console.error('Error en server:', err && err.message ? err.message : err);
  });
}

checkDbAndStart();

module.exports = app;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

//env
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

//health check
app.get('/', (req, res) => res.send('API Odessa funcionando correctamente'));

//lots
try {
  const lotsRoutes = require('./routes/lots.routes');
  app.use('/api/lots', lotsRoutes);
  console.log('✅ Rutas /api/lots montadas');
} catch (e) {
  console.warn('⚠️ No se pudo montar /api/lots:', e.message || e);
}

//auth
try {
  const authRoutes = require('./routes/auth.routes');
  app.use('/api/auth', authRoutes);
  console.log('✅ Rutas /api/auth montadas');
} catch (e) {
  console.warn('⚠️ No se pudo montar /api/auth:', e.message || e);
}

//subdivisions
try {
  const subdivisionsRoutes = require('./routes/subdivisions.routes');
  app.use('/api/subdivisions', subdivisionsRoutes);
  console.log('✅ Rutas /api/subdivisions montadas');
} catch (e) {
  console.warn('⚠️ No se pudo montar /api/subdivisions:', e.message || e);
}

//debug
try {
  const debugRoutes = require('./routes/debug.routes');
  app.use('/api/debug', debugRoutes);
  console.log('✅ Rutas /api/debug montadas');
} catch (e) {
  // optional
}

//db config
let listened = false;
const { getPool } = (() => {
  try {
    return require('./config/db');
  } catch (e) {
    console.warn('⚠️ No se pudo requerir ./config/db:', e.message || e);
    return {};
  }
})();

async function checkDbAndStart() {
  //db connection
  if (typeof getPool === 'function') {
    try {
      const pool = await getPool();
      if (pool) console.log('✅ Conexión a SQL establecida');
    } catch (err) {
      console.error('❌ Error conectando a SQL en arranque:', err && err.message ? err.message : err);
    }
  } else {
    console.warn('⚠️ getPool no disponible');
  }

  //server start
  const server = app.listen(PORT, () => {
    listened = true;
    console.log(`🚀 Backend escuchando en http://localhost:${PORT}`);
  });

  server.on('error', (err) => {
    console.error('❌ Error crítico en server:', err && err.message ? err.message : err);
  });
}

checkDbAndStart();

module.exports = app;
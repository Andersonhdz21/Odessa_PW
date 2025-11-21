// backend/server.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import { testConnection } from './config/db.js';

// Inicializamos Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Probamos conexión al iniciar
testConnection();

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 Servidor Odessa funcionando correctamente');
});

// Levantamos el servidor
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Importar rutas
const testRoutes = require('./routes/test');
const authRoutes = require('./routes/auth');         // Nueva ruta de autenticación
const usuariosRoutes = require('./routes/usuarios'); // CRUD de usuarios (tu archivo actual)
const db = require('./config/db');

// Inicializar Express
const app = express();

// Configuración básica
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba (opcional, puedes mantenerla)
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando bien');
});

// Rutas
app.use('/api', testRoutes);                // Tus rutas de prueba originales
app.use('/api/auth', authRoutes);           // Nueva ruta para autenticación (Firebase)
app.use('/api/usuarios', usuariosRoutes);   // Tus rutas CRUD existentes (ahora separadas)
app.use('/api/pacientes', require('./routes/pacienteRoutes'));
app.use('/api/medicos', require('./routes/medico.routes'));
app.use('/api/citas', require('./routes/citasRoutes'));
app.use('/api/historial', require('./routes/tratamientoRoutes'));
app.use('/api/recepcionistas', require('./routes/recepcionistaroutes'));
app.use('/uploads', express.static('uploads'));
// Exportar la instancia de Express
module.exports = app;
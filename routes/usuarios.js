const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const usuarioService = require('../services/usuarioService');

// Obtener todos los usuarios (solo admin)
router.get('/', verificarToken, async (req, res) => {
  try {
    const usuarios = await usuarioService.getUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar usuarios' });
  }
});

// Crear usuario (solo admin)
router.post('/', verificarToken, async (req, res) => {
  try {
    const nuevoUsuario = await usuarioService.createUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

module.exports = router;
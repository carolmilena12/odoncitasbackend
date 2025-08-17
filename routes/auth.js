const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const usuarioService = require('../services/usuarioService');

// Endpoint para perfil del usuario logueado (usa Firebase UID)
router.get('/me', verificarToken, async (req, res) => {
  try {
    const usuario = await usuarioService.getUsuarioPorFirebaseUid(req.user.uid);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
});

module.exports = router;
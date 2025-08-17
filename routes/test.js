const express = require('express');
const router = express.Router();
const verificarTokenYRol = require('../middlewares/authMiddleware');

// Solo para admin
router.get('/admin-panel', verificarTokenYRol(['administrador']), (req, res) => {
  res.json({ message: 'Bienvenida, administradora' });
});

// Para médico y recepcionista
router.get('/citas', verificarTokenYRol(['medico', 'recepcionista']), (req, res) => {
  res.json({ message: 'Bienvenido al sistema de citas' });
});

module.exports = router;
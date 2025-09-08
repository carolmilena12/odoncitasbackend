const express = require('express');
const router = express.Router();
const pacienteCtrl = require('../controllers/pacienteController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/', verificarToken, pacienteCtrl.crearPaciente);
router.get('/', verificarToken, pacienteCtrl.obtenerPacientes);
router.put('/:id', verificarToken, pacienteCtrl.actualizarPaciente);
router.delete('/:id', verificarToken, pacienteCtrl.eliminarPaciente);

module.exports = router;

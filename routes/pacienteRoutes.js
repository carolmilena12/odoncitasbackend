const express = require('express');
const router = express.Router();
const pacienteCtrl = require('../controllers/paciente.controller');
const verificarToken = require('../middlewares/verificarToken');

router.post('/', verificarToken, pacienteCtrl.crearPaciente);
router.get('/', verificarToken, pacienteCtrl.obtenerPacientes);
router.put('/:id', verificarToken, pacienteCtrl.actualizarPaciente);
router.delete('/:id', verificarToken, pacienteCtrl.eliminarPaciente);

module.exports = router;

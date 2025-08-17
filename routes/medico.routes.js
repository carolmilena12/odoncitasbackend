const express = require('express');
const router = express.Router();
const medicoCtrl = require('../controllers/medico.controller');
const verificarToken = require('../middlewares/verificarToken');

router.post('/', verificarToken, medicoCtrl.crearMedico);
router.get('/', verificarToken, medicoCtrl.obtenerMedicos);
router.put('/:id', verificarToken, medicoCtrl.actualizarMedico);
router.delete('/:id', verificarToken, medicoCtrl.eliminarMedico);

module.exports = router;

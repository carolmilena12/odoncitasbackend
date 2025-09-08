const express = require('express');
const router = express.Router();
const horarioCtrl = require('../controllers/horario.controller');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/', verificarToken, horarioCtrl.crearHorario);
router.get('/', verificarToken, horarioCtrl.obtenerHorarios);
router.put('/:id', verificarToken, horarioCtrl.actualizarHorario);
router.delete('/:id', verificarToken, horarioCtrl.eliminarHorario);

module.exports = router;

const express = require('express');
const router = express.Router();
const citaCtrl = require('../controllers/cita.Controller');
const verificarToken = require('../middlewares/verificarToken');

router.post('/', verificarToken, citaCtrl.crearCita);
router.get('/', verificarToken, citaCtrl.obtenerCitas);
router.put('/:id', verificarToken, citaCtrl.actualizarCita);
router.delete('/:id', verificarToken, citaCtrl.eliminarCita);

module.exports = router;

const express = require('express');
const router = express.Router();
const tratamientoCtrl = require('../controllers/tratamiento.controller');
const verificarToken = require('../middlewares/verificarToken');

router.post('/', verificarToken, tratamientoCtrl.crearTratamiento);
router.get('/', verificarToken, tratamientoCtrl.obtenerTratamientos);
router.put('/:id', verificarToken, tratamientoCtrl.actualizarTratamiento);
router.delete('/:id', verificarToken, tratamientoCtrl.eliminarTratamiento);

module.exports = router;

const express = require('express');
const router = express.Router();
const recepcionistaCtrl = require('../controllers/recepcionista.controller');
const verificarToken = require('../middlewares/verificarToken');

router.post('/', verificarToken, recepcionistaCtrl.crearRecepcionista);
router.get('/', verificarToken, recepcionistaCtrl.obtenerRecepcionistas);
router.put('/:id', verificarToken, recepcionistaCtrl.actualizarRecepcionista);
router.delete('/:id', verificarToken, recepcionistaCtrl.eliminarRecepcionista);

module.exports = router;

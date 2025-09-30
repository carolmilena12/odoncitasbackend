const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// POST /api/pacientes - Crear nuevo paciente
router.post('/', pacienteController.crearPaciente);

// GET /api/pacientes - Obtener todos los pacientes
router.get('/', pacienteController.obtenerPacientes);

// GET /api/pacientes/:id - Obtener paciente por ID
router.get('/:id', pacienteController.obtenerPacientePorId);

// PUT /api/pacientes/:id - Actualizar paciente
router.put('/:id', pacienteController.actualizarPaciente);

// DELETE /api/pacientes/:id - Eliminar paciente
router.delete('/:id', pacienteController.eliminarPaciente);

module.exports = router;
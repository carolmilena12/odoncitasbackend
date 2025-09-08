const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medico.controller');
const { upload } = require('../config/multerConfig'); // Import correcto con CommonJS
const path = require('path');
const fs = require('fs');

// POST /api/medicos - Crear médico con foto
router.post('/', upload.single('foto'), medicoController.crearMedico);

// GET /api/medicos - Obtener todos los médicos
router.get('/', medicoController.obtenerMedicos);

// PUT /api/medicos/:id - Actualizar médico
router.put('/:id', medicoController.actualizarMedico);

// DELETE /api/medicos/:id - Eliminar médico
router.delete('/:id', medicoController.eliminarMedico);

// Nueva ruta para servir fotos de médicos
router.get('/:id/foto', async (req, res) => {
  try {
    const medicos = await medicoService.obtenerMedicos();
    const medico = medicos.find(m => m.id === parseInt(req.params.id));
    
    if (!medico || !medico.foto) {
      return res.status(404).json({ mensaje: 'Foto no encontrada' });
    }

    const fotoPath = path.join(__dirname, '../uploads', medico.foto);
    
    if (!fs.existsSync(fotoPath)) {
      return res.status(404).json({ mensaje: 'Archivo de foto no encontrado' });
    }

    res.sendFile(fotoPath);
  } catch (err) {
    console.error('Error sirviendo foto:', err);
    res.status(500).json({ mensaje: 'Error al obtener foto' });
  }
});

module.exports = router;

module.exports = router;
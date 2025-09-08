const medicoService = require('../services/medico.service');

// Crear médico con imagen
exports.crearMedico = async (req, res) => {
  try {
    const foto = req.file ? req.file.filename : null; // si hay imagen la guardamos
    const id = await medicoService.crearMedico(req.body, foto);
    res.status(201).json({ id, mensaje: 'Médico creado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear médico' });
  }
};

// Obtener médicos
exports.obtenerMedicos = async (req, res) => {
  try {
    const medicos = await medicoService.obtenerMedicos();
    res.json(medicos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener médicos' });
  }
};

// Actualizar médico (con opción de nueva imagen)
exports.actualizarMedico = async (req, res) => {
  try {
    const foto = req.file ? req.file.filename : null;
    await medicoService.actualizarMedico(req.params.id, req.body, foto);
    res.json({ mensaje: 'Médico actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar médico' });
  }
};

// Eliminar médico
exports.eliminarMedico = async (req, res) => {
  try {
    await medicoService.eliminarMedico(req.params.id);
    res.json({ mensaje: 'Médico eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar médico' });
  }
};

const medicoService = require('../services/medicoService');

exports.crearMedico = async (req, res) => {
  try {
    const id = await medicoService.crearMedico(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear médico' });
  }
};

exports.obtenerMedicos = async (req, res) => {
  try {
    const medicos = await medicoService.obtenerMedicos();
    res.json(medicos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener médicos' });
  }
};

exports.actualizarMedico = async (req, res) => {
  try {
    await medicoService.actualizarMedico(req.params.id, req.body);
    res.json({ mensaje: 'Médico actualizado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar médico' });
  }
};

exports.eliminarMedico = async (req, res) => {
  try {
    await medicoService.eliminarMedico(req.params.id);
    res.json({ mensaje: 'Médico eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar médico' });
  }
};

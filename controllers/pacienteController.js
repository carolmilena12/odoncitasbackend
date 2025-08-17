const pacienteService = require('../services/pacienteService');

exports.crearPaciente = async (req, res) => {
  try {
    const id = await pacienteService.crearPaciente(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear paciente' });
  }
};

exports.obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await pacienteService.obtenerPacientes();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener pacientes' });
  }
};

exports.actualizarPaciente = async (req, res) => {
  try {
    await pacienteService.actualizarPaciente(req.params.id, req.body);
    res.json({ mensaje: 'Paciente actualizado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar paciente' });
  }
};

exports.eliminarPaciente = async (req, res) => {
  try {
    await pacienteService.eliminarPaciente(req.params.id);
    res.json({ mensaje: 'Paciente eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar paciente' });
  }
};

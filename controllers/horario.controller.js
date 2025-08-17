const horarioService = require('../services/horarioService');

exports.crearHorario = async (req, res) => {
  try {
    const id = await horarioService.crearHorario(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear horario' });
  }
};

exports.obtenerHorarios = async (req, res) => {
  try {
    const horarios = await horarioService.obtenerHorarios();
    res.json(horarios);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener horarios' });
  }
};

exports.actualizarHorario = async (req, res) => {
  try {
    await horarioService.actualizarHorario(req.params.id, req.body);
    res.json({ mensaje: 'Horario actualizado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar horario' });
  }
};

exports.eliminarHorario = async (req, res) => {
  try {
    await horarioService.eliminarHorario(req.params.id);
    res.json({ mensaje: 'Horario eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar horario' });
  }
};

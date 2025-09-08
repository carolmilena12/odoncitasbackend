const citaService = require('../services/citasService');

exports.crearCita = async (req, res) => {
  try {
    const id = await citaService.crearCita(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear cita' });
  }
};

exports.obtenerCitas = async (req, res) => {
  try {
    const citas = await citaService.obtenerCitas();
    res.json(citas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener citas' });
  }
};

exports.actualizarCita = async (req, res) => {
  try {
    await citaService.actualizarCita(req.params.id, req.body);
    res.json({ mensaje: 'Cita actualizada' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar cita' });
  }
};

exports.eliminarCita = async (req, res) => {
  try {
    await citaService.eliminarCita(req.params.id);
    res.json({ mensaje: 'Cita eliminada' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar cita' });
  }
};

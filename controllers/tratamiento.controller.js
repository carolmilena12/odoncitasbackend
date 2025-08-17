const tratamientoService = require('../services/tratamientoService');

exports.crearTratamiento = async (req, res) => {
  try {
    const id = await tratamientoService.crearTratamiento(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear tratamiento' });
  }
};

exports.obtenerTratamientos = async (req, res) => {
  try {
    const tratamientos = await tratamientoService.obtenerTratamientos();
    res.json(tratamientos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener tratamientos' });
  }
};

exports.actualizarTratamiento = async (req, res) => {
  try {
    await tratamientoService.actualizarTratamiento(req.params.id, req.body);
    res.json({ mensaje: 'Tratamiento actualizado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar tratamiento' });
  }
};

exports.eliminarTratamiento = async (req, res) => {
  try {
    await tratamientoService.eliminarTratamiento(req.params.id);
    res.json({ mensaje: 'Tratamiento eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar tratamiento' });
  }
};

const recepcionistaService = require('../services/recepcionistaService');

exports.crearRecepcionista = async (req, res) => {
  try {
    const id = await recepcionistaService.crearRecepcionista(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear recepcionista' });
  }
};

exports.obtenerRecepcionistas = async (req, res) => {
  try {
    const recepcionistas = await recepcionistaService.obtenerRecepcionistas();
    res.json(recepcionistas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener recepcionistas' });
  }
};

exports.actualizarRecepcionista = async (req, res) => {
  try {
    await recepcionistaService.actualizarRecepcionista(req.params.id, req.body);
    res.json({ mensaje: 'Recepcionista actualizado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar recepcionista' });
  }
};

exports.eliminarRecepcionista = async (req, res) => {
  try {
    await recepcionistaService.eliminarRecepcionista(req.params.id);
    res.json({ mensaje: 'Recepcionista eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar recepcionista' });
  }
};

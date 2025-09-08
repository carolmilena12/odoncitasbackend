const medicoService = require('../services/medico.service');

exports.crearMedico = async (req, res) => {
  try {
    console.log("Body recibido:", req.body);
    console.log("Archivo recibido:", req.file);

    if (!req.file) {
      return res.status(400).json({ mensaje: 'Debe subir una foto para el médico' });
    }

    const medico = {
      nombre: req.body.nombre,
      correo: req.body.correo,
      matricula: req.body.matricula,
      foto: req.file.filename
    };
    
    console.log("💾 Guardando en MySQL:", medico);
    const id = await medicoService.crearMedico(medico);
    res.status(201).json({ 
      id, 
      mensaje: 'Médico creado correctamente',
      foto: req.file.filename 
    });
  } catch (err) {
    console.error('Error en crearMedico:', err);
    res.status(500).json({ mensaje: 'Error al crear médico: ' + err.message });
  }
};

exports.obtenerMedicos = async (req, res) => {
  try {
    const medicos = await medicoService.obtenerMedicos();
    res.json(medicos);
  } catch (err) {
    console.error('Error en obtenerMedicos:', err);
    res.status(500).json({ mensaje: 'Error al obtener médicos' });
  }
};

exports.actualizarMedico = async (req, res) => {
  try {
    await medicoService.actualizarMedico(req.params.id, req.body);
    res.json({ mensaje: 'Médico actualizado' });
  } catch (err) {
    console.error('Error en actualizarMedico:', err);
    res.status(500).json({ mensaje: 'Error al actualizar médico' });
  }
};

exports.eliminarMedico = async (req, res) => {
  try {
    await medicoService.eliminarMedico(req.params.id);
    res.json({ mensaje: 'Médico eliminado' });
  } catch (err) {
    console.error('Error en eliminarMedico:', err);
    res.status(500).json({ mensaje: 'Error al eliminar médico' });
  }
};
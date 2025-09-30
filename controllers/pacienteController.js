const pacienteService = require('../services/pacienteService');

const pacienteController = {
  // Crear nuevo paciente
  async crearPaciente(req, res) {
    try {
      console.log('🎯 [CONTROLLER] Llegó petición POST /api/pacientes');
      
      const { nombre, identificacion, telefono, direccion, email } = req.body;

      // Validar campos obligatorios
      if (!nombre || !identificacion || !telefono || !direccion) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son obligatorios: nombre, identificación, teléfono, dirección'
        });
      }

      const pacienteData = { nombre, identificacion, telefono, direccion, email };
      
      const nuevoPaciente = await pacienteService.crearPaciente(pacienteData);

      res.status(201).json({
        success: true,
        message: 'Paciente creado exitosamente',
        data: nuevoPaciente
      });

    } catch (error) {
      console.error('Error en crearPaciente controller:', error);
      
      if (error.message.includes('ya existe')) {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al crear paciente'
      });
    }
  },

  // Obtener todos los pacientes
  async obtenerPacientes(req, res) {
    try {
      console.log('🔍 [CONTROLLER] Obteniendo todos los pacientes...');
      
      const pacientes = await pacienteService.obtenerPacientes();

      res.json({
        success: true,
        data: pacientes
      });
    } catch (error) {
      console.error('Error en obtenerPacientes controller:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener los pacientes'
      });
    }
  },

  // Obtener paciente por ID - IMPLEMENTACIÓN COMPLETA
  async obtenerPacientePorId(req, res) {
    try {
      const { id } = req.params;
      
      console.log(`🔍 [CONTROLLER] Buscando paciente con ID: ${id}`);

      // Validar que el ID sea un número
      if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({
          success: false,
          message: 'ID de paciente no válido'
        });
      }

      const paciente = await pacienteService.obtenerPacientePorId(parseInt(id));

      if (!paciente) {
        return res.status(404).json({
          success: false,
          message: 'Paciente no encontrado'
        });
      }

      console.log(`✅ [CONTROLLER] Paciente encontrado: ${paciente.nombre}`);
      
      res.json({
        success: true,
        data: paciente
      });

    } catch (error) {
      console.error('Error en obtenerPacientePorId controller:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el paciente'
      });
    }
  },

  // Actualizar paciente
  async actualizarPaciente(req, res) {
    try {
      const { id } = req.params;
      const datosActualizados = req.body;

      console.log(`✏️ [CONTROLLER] Actualizando paciente ID: ${id}`);

      // Validar que el ID sea un número
      if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({
          success: false,
          message: 'ID de paciente no válido'
        });
      }

      // Validar que hay datos para actualizar
      if (Object.keys(datosActualizados).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No se proporcionaron datos para actualizar'
        });
      }

      const pacienteActualizado = await pacienteService.actualizarPaciente(parseInt(id), datosActualizados);

      if (!pacienteActualizado) {
        return res.status(404).json({
          success: false,
          message: 'Paciente no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Paciente actualizado exitosamente',
        data: pacienteActualizado
      });

    } catch (error) {
      console.error('Error en actualizarPaciente controller:', error);
      
      if (error.message.includes('Ya existe otro paciente')) {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al actualizar el paciente'
      });
    }
  },

  // Eliminar paciente
  async eliminarPaciente(req, res) {
    try {
      const { id } = req.params;

      console.log(`🗑️ [CONTROLLER] Eliminando paciente ID: ${id}`);

      // Validar que el ID sea un número
      if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({
          success: false,
          message: 'ID de paciente no válido'
        });
      }

      const resultado = await pacienteService.eliminarPaciente(parseInt(id));

      if (!resultado) {
        return res.status(404).json({
          success: false,
          message: 'Paciente no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Paciente eliminado exitosamente'
      });

    } catch (error) {
      console.error('Error en eliminarPaciente controller:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el paciente'
      });
    }
  }
};

module.exports = pacienteController;
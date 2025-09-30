const db = require('../config/db');

const pacienteService = {
  async crearPaciente(pacienteData) {
    try {
      console.log('🎯 [SERVICE] Llegó al service crearPaciente');
      console.log('📦 Datos:', pacienteData);
      
      const { nombre, identificacion, telefono, direccion, email } = pacienteData;

      // DEBUG: Verificar la conexión a la BD
      console.log('🔍 [DEBUG] Probando conexión a BD...');
      
      // Verificar si ya existe - CON MÁS DEBUG
      console.log('🔍 [DEBUG] Ejecutando SELECT para verificar duplicado...');
      const existe = await db.execute(
        'SELECT id FROM pacientes WHERE identificacion = ?',
        [identificacion]
      );

      console.log('🔍 [DEBUG] Resultado de SELECT existe:', existe);
      console.log('🔍 [DEBUG] Tipo de resultado:', typeof existe);
      
      if (existe && existe[0] && existe[0].length > 0) {
        throw new Error('Ya existe un paciente con esta identificación');
      }

      // Insertar nuevo paciente
      console.log('💾 [DEBUG] Ejecutando INSERT...');
      const result = await db.execute(
        `INSERT INTO pacientes (nombre, identificacion, telefono, direccion, email, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [nombre, identificacion, telefono, direccion, email]
      );

      console.log('🔍 [DEBUG] Resultado de INSERT:', result);

      // Obtener el paciente recién creado
      const nuevoPaciente = await db.execute(
        'SELECT * FROM pacientes WHERE id = ?',
        [result[0].insertId]
      );

      console.log('✅ [SERVICE] Paciente creado exitosamente');
      return nuevoPaciente[0][0];

    } catch (error) {
      console.error('❌ [SERVICE] Error:', error.message);
      console.error('🔍 [SERVICE] Stack:', error.stack);
      throw error;
    }
  },

  async obtenerPacientes() {
    try {
      console.log('🔍 [SERVICE] Ejecutando obtenerPacientes...');
      
      const pacientes = await db.execute(
        'SELECT * FROM pacientes ORDER BY created_at DESC'
      );
      
      console.log('🔍 [DEBUG] Resultado de SELECT pacientes:', pacientes);
      
      if (!pacientes) {
        console.log('❌ [DEBUG] pacientes es undefined');
        return [];
      }
      
      console.log('✅ [SERVICE] Pacientes obtenidos:', pacientes[0]);
      return pacientes[0];
      
    } catch (error) {
      console.error('❌ [SERVICE] Error en obtenerPacientes:');
      console.error('📌 Mensaje:', error.message);
      console.error('🔍 Stack:', error.stack);
      throw error;
    }
  },

  async obtenerPacientePorId(id) {
    try {
      const paciente = await db.execute(
        'SELECT * FROM pacientes WHERE id = ?',
        [id]
      );
      return (paciente && paciente[0] && paciente[0][0]) || null;
    } catch (error) {
      console.error('Error en obtenerPacientePorId service:', error);
      throw error;
    }
  }
};

module.exports = pacienteService;
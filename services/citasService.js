const db = require('../config/db');

async function crearCita(cita) {
  const { paciente_id, medico_id, fecha, motivo, estado } = cita;

  // Verificar si ya hay una cita ocupada para ese médico en esa fecha/hora
  const [existente] = await db.promise().execute(
    `SELECT * FROM citas_agendadas
     WHERE medico_id = ? AND fecha = ?`,
    [medico_id, fecha]
  );

  if (existente.length > 0) {
    const citaOcupada = existente[0];
    const mensaje = `Ya existe una cita para el médico ${medico_id} en la fecha ${fecha}`;
    const error = new Error(mensaje);
    error.code = 'CITA_DUPLICADA';
    throw error;
  }

  // Si no hay conflicto, crear la cita
  const [result] = await db.promise().execute(
    `INSERT INTO citas_agendadas (paciente_id, medico_id, fecha, motivo, estado)
     VALUES (?, ?, ?, ?, ?)`,
    [paciente_id, medico_id, fecha, motivo, estado]
  );

  return result.insertId;
}


async function crearCita(cita) {
  const { paciente_id, medico_id, fecha, motivo, estado } = cita;
  const [result] = await db.promise().execute(
    `INSERT INTO citas_agendadas (paciente_id, medico_id, fecha, motivo, estado)
     VALUES (?, ?, ?, ?, ?)`,
    [paciente_id, medico_id, fecha, motivo, estado]
  );
  return result.insertId;
}

async function obtenerCitas() {
  const [rows] = await db.promise().query(`
    SELECT c.cita_id, c.fecha, c.motivo, c.estado,
           p.nombre AS paciente_nombre,
           m.nombre AS medico_nombre
    FROM citas_agendadas c
    JOIN pacientes p ON p.id = c.paciente_id
    JOIN medicos m ON m.id = c.medico_id
  `);
  return rows;
}

async function actualizarCita(id, datos) {
  const { fecha, motivo, estado } = datos;
  await db.promise().execute(
    `UPDATE citas_agendadas SET fecha = ?, motivo = ?, estado = ? WHERE cita_id = ?`,
    [fecha, motivo, estado, id]
  );
}

async function eliminarCita(id) {
  await db.promise().execute(`DELETE FROM citas_agendadas WHERE cita_id = ?`, [id]);
}

module.exports = {
  crearCita,
  obtenerCitas,
  actualizarCita,
  eliminarCita,
};

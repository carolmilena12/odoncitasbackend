const db = require('../config/db');

async function crearTratamiento(tratamiento) {
  const { paciente_id, medico_id, descripcion, fecha_inicio, fecha_fin } = tratamiento;
  const [result] = await db.promise().execute(
    `INSERT INTO tratamientos (paciente_id, medico_id, descripcion, fecha_inicio, fecha_fin)
     VALUES (?, ?, ?, ?, ?)`,
    [paciente_id, medico_id, descripcion, fecha_inicio, fecha_fin]
  );
  return result.insertId;
}

async function obtenerTratamientos() {
  const [rows] = await db.promise().query(`
    SELECT t.*, p.nombre AS paciente_nombre, m.nombre AS medico_nombre
    FROM tratamientos t
    JOIN pacientes p ON p.id = t.paciente_id
    JOIN medicos m ON m.id = t.medico_id
  `);
  return rows;
}

async function actualizarTratamiento(id, datos) {
  const { descripcion, fecha_inicio, fecha_fin } = datos;
  await db.promise().execute(
    `UPDATE tratamientos SET descripcion = ?, fecha_inicio = ?, fecha_fin = ? WHERE tratamiento_id = ?`,
    [descripcion, fecha_inicio, fecha_fin, id]
  );
}

async function eliminarTratamiento(id) {
  await db.promise().execute(`DELETE FROM tratamientos WHERE tratamiento_id = ?`, [id]);
}

module.exports = {
  crearTratamiento,
  obtenerTratamientos,
  actualizarTratamiento,
  eliminarTratamiento,
};

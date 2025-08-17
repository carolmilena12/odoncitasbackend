const db = require('../config/db');

async function crearHorario(horario) {
  const { medico_id, dia, hora_inicio, hora_fin } = horario;
  const [result] = await db.promise().execute(
    `INSERT INTO horarios (medico_id, dia, hora_inicio, hora_fin)
     VALUES (?, ?, ?, ?)`,
    [medico_id, dia, hora_inicio, hora_fin]
  );
  return result.insertId;
}

async function obtenerHorarios() {
  const [rows] = await db.promise().query(`
    SELECT h.*, m.nombre AS medico_nombre
    FROM horarios h
    JOIN medicos m ON m.id = h.medico_id
  `);
  return rows;
}

async function actualizarHorario(id, datos) {
  const { dia, hora_inicio, hora_fin } = datos;
  await db.promise().execute(
    `UPDATE horarios SET dia = ?, hora_inicio = ?, hora_fin = ? WHERE horario_id = ?`,
    [dia, hora_inicio, hora_fin, id]
  );
}

async function eliminarHorario(id) {
  await db.promise().execute(`DELETE FROM horarios WHERE horario_id = ?`, [id]);
}

module.exports = {
  crearHorario,
  obtenerHorarios,
  actualizarHorario,
  eliminarHorario,
};

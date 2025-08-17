const db = require('../config/db');

async function crearMedico(medico) {
  const { nombre, especialidad, correo } = medico;
  const [result] = await db.promise().execute(
    `INSERT INTO medicos (nombre, especialidad, correo) VALUES (?, ?, ?)`,
    [nombre, especialidad, correo]
  );
  return result.insertId;
}

async function obtenerMedicos() {
  const [rows] = await db.promise().query(`SELECT * FROM medicos`);
  return rows;
}

async function actualizarMedico(id, datos) {
  const { nombre, especialidad, correo } = datos;
  await db.promise().execute(
    `UPDATE medicos SET nombre = ?, especialidad = ?, correo = ? WHERE id = ?`,
    [nombre, especialidad, correo, id]
  );
}

async function eliminarMedico(id) {
  await db.promise().execute(`DELETE FROM medicos WHERE id = ?`, [id]);
}

module.exports = {
  crearMedico,
  obtenerMedicos,
  actualizarMedico,
  eliminarMedico,
};

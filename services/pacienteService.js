const db = require('../config/db');

async function crearPaciente(paciente) {
  const { nombre, documento, correo } = paciente;
  const [result] = await db.promise().execute(
    `INSERT INTO pacientes (nombre, documento, correo) VALUES (?, ?, ?)`,
    [nombre, documento, correo]
  );
  return result.insertId;
}

async function obtenerPacientes() {
  const [rows] = await db.promise().query(`SELECT * FROM pacientes`);
  return rows;
}

async function actualizarPaciente(id, datos) {
  const { nombre, documento, correo } = datos;
  await db.promise().execute(
    `UPDATE pacientes SET nombre = ?, documento = ?, correo = ? WHERE id = ?`,
    [nombre, documento, correo, id]
  );
}

async function eliminarPaciente(id) {
  await db.promise().execute(`DELETE FROM pacientes WHERE id = ?`, [id]);
}

module.exports = {
  crearPaciente,
  obtenerPacientes,
  actualizarPaciente,
  eliminarPaciente,
};

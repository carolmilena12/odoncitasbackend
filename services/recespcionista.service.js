const db = require('../config/db');

async function crearRecepcionista(recepcionista) {
  const { nombre, correo, turno } = recepcionista;
  const [result] = await db.promise().execute(
    `INSERT INTO recepcionistas (nombre, correo, turno) VALUES (?, ?, ?)`,
    [nombre, correo, turno]
  );
  return result.insertId;
}

async function obtenerRecepcionistas() {
  const [rows] = await db.promise().query(`SELECT * FROM recepcionistas`);
  return rows;
}

async function actualizarRecepcionista(id, datos) {
  const { nombre, correo, turno } = datos;
  await db.promise().execute(
    `UPDATE recepcionistas SET nombre = ?, correo = ?, turno = ? WHERE id = ?`,
    [nombre, correo, turno, id]
  );
}

async function eliminarRecepcionista(id) {
  await db.promise().execute(`DELETE FROM recepcionistas WHERE id = ?`, [id]);
}

module.exports = {
  crearRecepcionista,
  obtenerRecepcionistas,
  actualizarRecepcionista,
  eliminarRecepcionista,
};

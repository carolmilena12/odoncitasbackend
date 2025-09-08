const db = require('../config/db');

async function crearMedico(medico) {
  const { nombre, correo, matricula, foto } = medico; // Removió especialidad
  const [result] = await db.promise().execute(
    `INSERT INTO medicos (nombre, correo, matricula, foto) VALUES (?, ?, ?, ?)`, // Removió especialidad
    [nombre, correo, matricula, foto] // Removió especialidad
  );
  return result.insertId;
}

async function obtenerMedicos() {
  const [rows] = await db.promise().query(`SELECT * FROM medicos`);
  return rows;
}

async function actualizarMedico(id, datos) {
  const { nombre, correo, matricula, foto } = datos; // Removió especialidad
  let query = `UPDATE medicos SET nombre = ?, correo = ?, matricula = ?`; // Removió especialidad
  const params = [nombre, correo, matricula]; // Removió especialidad

  if (foto) {
    query += `, foto = ?`;
    params.push(foto);
  }

  query += ` WHERE id = ?`;
  params.push(id);

  await db.promise().execute(query, params);
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
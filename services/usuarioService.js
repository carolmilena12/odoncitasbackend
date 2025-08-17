// services/usuarioService.js
const db = require('../config/db'); // conexión mysql2

/**
 * Obtiene un usuario completo por firebase_uid
 * @param {string} firebaseUid
 * @returns {Promise<object|null>}
 */
async function getUsuarioPorFirebaseUid(firebaseUid) {
  try {
    const [rows] = await db.promise().execute(
      `SELECT u.usu_id, u.usu_usuario, u.usu_fecha_vigencia, u.firebase_uid, u.rol_id,
              p.per_id, p.per_nombre_completo, p.per_documento_identidad, p.per_correo,
              r.rol_nombre
       FROM autenticacion_usuarios u
       LEFT JOIN persona p ON p.per_id = u.per_id
       LEFT JOIN autenticacion_roles r ON r.rol_id = u.rol_id
       WHERE u.firebase_uid = ?`,
      [firebaseUid]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error('Error en usuarioService.getUsuarioPorFirebaseUid:', err);
    throw err;
  }
}

module.exports = {
  getUsuarioPorFirebaseUid,
};
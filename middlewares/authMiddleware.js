const admin = require('../firebase'); // Importa la conexión con Firebase
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

/**
 * Middleware que valida el token del usuario y su rol.
 * @param {Array} rolesPermitidos - Lista de roles que tienen acceso a la ruta
 */
const verificarTokenYRol = (rolesPermitidos = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verificamos si existe el header Authorization y comienza con "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Extraemos el token (eliminar "Bearer ")
    const token = authHeader.split(' ')[1];

    try {
      // Verificamos el token con Firebase Admin
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken; // El uid y otros datos están en decodedToken

      // Buscar en Firestore el rol del usuario
      const uid = decodedToken.uid;
      const userDoc = await db.collection('usuarios').doc(uid).get();

      if (!userDoc.exists) {
        return res.status(403).json({ message: 'Usuario no registrado en Firestore' });
      }

      const usuario = userDoc.data();

      // Validar si el rol está permitido para esta ruta
      if (!rolesPermitidos.includes(usuario.rol)) {
        return res.status(403).json({ message: 'Acceso denegado: rol no autorizado' });
      }

      // Guardamos el rol para posibles usos posteriores
      req.user.rol = usuario.rol;

      // Todo está bien, sigue al siguiente paso o controlador
      next();

    } catch (error) {
      console.error('Error al verificar token:', error);
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
  };
};

module.exports = verificarTokenYRol;

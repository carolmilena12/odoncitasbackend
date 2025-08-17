const admin = require('../firebase'); // conexión inicializada de Firebase

const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email || null
    };
    next();
  } catch (err) {
    console.error('Error verificando token:', err);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = verificarToken;
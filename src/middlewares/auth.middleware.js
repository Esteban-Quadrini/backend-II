
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No autorizado' });
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepository.findById(payload.id);
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

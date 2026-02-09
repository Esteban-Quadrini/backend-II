const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  const payload = { id: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
};

exports.current = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No auth token' });
    res.json(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo usuario actual' });
  }
};
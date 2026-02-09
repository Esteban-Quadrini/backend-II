const User = require('../models/User');
const { hashPassword } = require('../utils/hash');

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, cart, role } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email ya registrado' });

    const hashed = hashPassword(password); 
    const user = await User.create({ first_name, last_name, email, age, password: hashed, cart, role });

    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(409).json({ error: 'Email ya registrado' });
    res.status(500).json({ error: 'Error creando usuario' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').lean();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo usuarios' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password').lean();
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo usuario' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = hashPassword(updates.password);
    }
    
    if (updates.email) {
      const other = await User.findOne({ email: updates.email, _id: { $ne: req.params.id } });
      if (other) return res.status(409).json({ error: 'Email ya registrado por otro usuario' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, select: '-password' }).lean();
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(409).json({ error: 'Email ya registrado' });
    res.status(500).json({ error: 'Error actualizando usuario' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean();
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error eliminando usuario' });
  }
};
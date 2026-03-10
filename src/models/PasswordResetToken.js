const mongoose = require('mongoose');

const PasswordResetTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: { type: String, unique: true },
  expiresAt: Date,
  used: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('PasswordResetToken', PasswordResetTokenSchema);

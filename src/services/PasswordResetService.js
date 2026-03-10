
const crypto = require('crypto');
const PasswordResetTokenRepository = require('../repositories/PasswordResetTokenRepository');
const UserRepository = require('../repositories/UserRepository');
const MailService = require('./MailService');
const { hashPassword, comparePassword } = require('../utils/hash');

class PasswordResetService {
  static async requestReset(email) {
    const user = await UserRepository.findByEmail(email);
    if (!user) return; 
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + (Number(process.env.PASSWORD_RESET_TOKEN_EXPIRES_MINUTES || 60) * 60000));
    await PasswordResetTokenRepository.create({ user: user._id, token, expiresAt });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const html = `<p>Hacé click en el botón para restablecer tu contraseña (expira en 1 hora):</p>
      <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;border-radius:4px;text-decoration:none;">Restablecer contraseña</a>`;
    await MailService.sendMail({ to: user.email, subject: 'Restablecer contraseña', html });
  }

  static async resetPassword(token, newPassword) {
    const tokenDoc = await PasswordResetTokenRepository.findByToken(token);
    if (!tokenDoc) throw { status: 400, message: 'Token inválido' };
    if (tokenDoc.used) throw { status: 400, message: 'Token ya usado' };
    if (tokenDoc.expiresAt < new Date()) throw { status: 400, message: 'Token expirado' };
    const user = await UserRepository.findById(tokenDoc.user);
    if (!user) throw { status: 400, message: 'Usuario no encontrado' };
    const same = await comparePassword(newPassword, user.password);
    if (same) throw { status: 400, message: 'La nueva contraseña no puede ser igual a la anterior' };
    const hashed = await hashPassword(newPassword);
    await UserRepository.updateById(user._id, { password: hashed });
    await PasswordResetTokenRepository.markUsed(tokenDoc._id);
  }
}

module.exports = PasswordResetService;

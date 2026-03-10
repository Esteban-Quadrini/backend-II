
const nodemailer = require('nodemailer');

class MailService {
  static async createTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  static async sendMail({ to, subject, html, text }) {
    const transporter = await this.createTransport();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html
    });
    return info;
  }
}

module.exports = MailService;

const transporter = require('../config/mailer');

module.exports = {
  sendMail: async ({ to, subject, html }) => {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    });
    return info;
  }
};

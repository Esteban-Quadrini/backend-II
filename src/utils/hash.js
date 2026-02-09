const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

exports.hashPassword = (plain) => {
  
  return bcrypt.hashSync(plain, saltRounds);
};

exports.comparePassword = (plain, hash) => {
  return bcrypt.compareSync(plain, hash);
};
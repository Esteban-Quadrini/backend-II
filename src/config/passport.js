const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const { comparePassword } = require('../utils/hash');

module.exports = (passportInstance) => {
 
  passportInstance.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Credenciales inválidas' });

      const match = comparePassword(password, user.password);
      if (!match) return done(null, false, { message: 'Credenciales inválidas' });

      const userObj = user.toObject();
      delete userObj.password;
      return done(null, userObj);
    } catch (err) {
      return done(err);
    }
  }));

 
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };

  passportInstance.use('jwt', new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id, '-password').lean();
      if (!user) return done(null, false, { message: 'Token inválido' });
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }));
};

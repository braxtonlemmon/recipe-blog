const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const strategy = new JwtStrategy(options, (payload, next) => {
  User.findById(payload.id, (err, user) => {
    if (err) { return next(err, false); }
    if (user) { return next(null, user); }
    return next(null, false);
  });
});

passport.use(strategy);


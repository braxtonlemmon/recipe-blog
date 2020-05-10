const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

// jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
// jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

const cookieExtractor = req => {
  const token = req && req.cookies ? req.cookies.token : null;
  return token;
}

const options = {
  // jwtFromRequest: req => req.cookies.token,
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_OR_KEY,
};

const strategy = new JwtStrategy(options, (payload, next) => {
  User.findById(payload.id, (err, user) => {
    console.log('found');
    console.log(user.username);
    if (err) { return next(err, false); }
    if (user) { return next(null, user); }
    return next(null, false);
  });
});

passport.use(strategy);


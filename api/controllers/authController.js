import { body, validationResult } from 'express-validator';
import User from '../models/user';
import utils from '../lib/utils';
import issueJWT from '../lib/utils';
import bcrypt from 'bcrypt';

const login = [
  body('username', 'Username is required').trim().isLength({ min: 1 }),
  body('password', 'Password is required').trim().isLength({ min: 1 }),
  body('*').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }
    User.findOne({ username: req.body.username })
      .then(user => {
        if (!user) {
          return res.status(400).send('user not found');
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            const token = issueJWT(user);
            // const token = utils.issueJWT(user);
            res.cookie('token', token, { maxAge: 30000, httpOnly: true, secure: false });
            console.log(token);
            return res.json({ token: token, name: user.username })
            // res.json({ token: token.token, expires: token.expires, name: user.username });
          } else {
            return res.send('incorrect password!');
          }
        })
      })

      .catch(err => {
        return res.status(401).send({ err: err });
      });
  }
]

const logout = (req, res, next) => {
  req.logout();
}

export default {
  login,
  logout
}
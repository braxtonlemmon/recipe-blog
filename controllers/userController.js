const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const createUser = [
  body('username', 'username is required').trim().isLength({ min: 1 }),
  body('password', 'password is required').trim().isLength({ min: 1 }),
  body('*').escape(),
  (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      const errors = validationResult(req);
      const user = new User({
        username: req.body.username,
        password: hashedPassword
      });
      if (!errors.isEmpty()) {
        res.send({ user: user, errors: errors.array() });
        return;
      } else {
        user.save(err => {
          if (err) { return next(err); }
          res.send('user created');
        })
      }
    })
  }
]

const editUser = (req, res, next) => {
  res.send('edit user');
}

const updateUser = (req, res, next) => {
  res.send('update user');
}

const destroyUser = (req, res, next) => {
  res.send('destroy user');
}

const showUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.send('user not found');
      }
      res.send(user);
    })
    .catch(err => {
      return next(err);
    })
}

export default {
  createUser,
  updateUser,
  destroyUser,
  showUser,
}
import { Router } from 'express';
import userController from '../controllers/userController';
import User from '../models/user';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
require('dotenv').config();
const router = Router();
const utils = require('../lib/utils');

router.post('/login', [
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
            const token = utils.issueJWT(user);
            res.send({token: token.token, expires: token.expires});
          }
        })
      })
      .catch(err => {
        return res.status(401).send({ err: err });
      });
  }
]);


router.post('/',        userController.createUser);
router.put('/:id',      userController.updateUser);
router.delete('/:id',   userController.destroyUser);
router.get('/:id',      userController.showUser);
export default router;
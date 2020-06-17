require('dotenv').config();
require('regenerator-runtime/runtime');
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import routes from './routes';
import passport from 'passport';
import cors from 'cors';

const serverless = require('serverless-http');
const app = express();
const apiRoutes = require('./middleware/api.js');

// Setup mongoose connection
require('./config/database');
require('./config/passport');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Passport Stuff
app.use(passport.initialize());

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:8000',
  ],
  credentials: true
}));
app.use(compression());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/api', apiRoutes)
app.use('/users',     routes.users);
app.use('/recipes', routes.recipes);
app.use('/auth', routes.auth);
app.use('/comments',  routes.comments);
app.get("/hey", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  console.log(req.user);
  res.send('yay');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
module.exports.handler = serverless(app);

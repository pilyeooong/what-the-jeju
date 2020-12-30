const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport');
const helmet = require('helmet');
const hpp = require('hpp');
const db = require('./models');

const apiRouter = require('./routes');

dotenv.config();

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.error(err);
  });

passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  app.use(morgan('dev'));
}
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

module.exports = app;

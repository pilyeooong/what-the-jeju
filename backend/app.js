const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
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
  }) 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET
}));

app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('server is running on port 3000');
})

module.exports = app;
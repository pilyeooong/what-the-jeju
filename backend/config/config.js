const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "hotjeju",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "hotjeju_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false,
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "hotjeju",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

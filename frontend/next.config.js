const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  env: {
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY
  }
}
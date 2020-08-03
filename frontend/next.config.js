const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  env: {
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    NAVER_MAP_CLIENT: process.env.NAVER_MAP_CLIENT,
    NAVER_MAP_CLIENT_SECRET: process.env.NAVER_MAP_CLIENT_SECRET
  }
}
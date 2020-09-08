const dotenv = require('dotenv');
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

dotenv.config();

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/api/auth/kakao/callback',
  }, async(accessToken, refreshToken, profile, done) => {
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({
        where: { snsId: profile.id, provider: 'kakao' },
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.kakao_account.email,
          password: 'zkzkdhfhrmdls',
          nickname: profile.displayName,
          snsId: profile.id,
          provider: 'kakao'
        });
        done(null, newUser);
      }
    } catch (err) {
      console.error(err);
      done(error);
    }
  }))
}
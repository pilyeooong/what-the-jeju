const { User, Place, Image } = require('../models');
const passport = require('passport');
const axios = require('axios');
const bcrypt = require('bcrypt');
const { naverConfig } = require('../utils/apiHeaders');

exports.getMe = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Place,
            as: 'Wished',
            attributes: ['id', 'name', 'lat', 'lng'],
            include: [
              {
                model: Image,
                attributes: ['id', 'src'],
              },
            ],
          },
          {
            model: Place,
            as: 'Liked',
            attributes: ['id'],
          },
        ],
      });
      return res.status(200).send(user);
    } else {
      return res.status(200).send(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res
        .status(401)
        .send(
          '해당 이메일로 가입된 계정이 없거나 비밀번호가 일치하지 않습니다.'
        );
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const loginUser = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
      });
      console.log('loginUser', loginUser);
      return res.status(200).send(loginUser);
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout();
  req.session.destroy();
  return res.status(200).send('logout');
};

exports.signUp = async (req, res, next) => {
  const exUser = await User.findOne({ where: { email: req.body.email } });
  if (exUser) {
    return res.status(409).send('이미 사용중인 이메일입니다.');
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    return res.status(201).send(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.checkJejuNative = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('로그인이 필요합니다.');
  }

  const { lat, lng } = req.body;
  try {
    const result = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${lng},${lat}&sourcecrs=epsg:4326&output=json&orders=legalcode`,
      naverConfig
    );
    if (result.data.results[0].region.area1.name === '제주특별자치도') {
      await User.update({ jejuNative: 1 }, { where: { id: req.user.id } });
      return res.status(200).send(true);
    }
    return res.status(200).send(false);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

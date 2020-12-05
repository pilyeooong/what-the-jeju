const { User, Place, Image } = require('../models');
const passport = require('passport');

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
            attributes: ['id']
          }
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
    };
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
      return res.status(200).send(loginUser);
    });
  })(req, res, next);
}


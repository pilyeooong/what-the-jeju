const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const users = await User.findAll();
  return res.status(200).send(users);
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
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
      return res.status(200).send(loginUser);
    });
  })(req, res, next);
});

router.post('/', async (req, res, next) => {
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
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', async (req, res, next) => {
  passport.authenticate('kakao', (err, user, info) => {
    if (err) {
      console.error(err);
      next(err);
    }
    if (info){
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.err(loginErr);
        return next(loginErr);
      }
      const loginUser = await User.findOne({
        where : { id: user.id },
      });
      return res.status(200).send(loginUser);
    })
  })(req, res, next);
});

module.exports = router;

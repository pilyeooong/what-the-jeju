const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao'), (req, res) => {
  res.redirect('http://localhost:3000');
});

module.exports = router;

const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const { getMe, login, logout, signUp, checkJejuNative } = require('../controllers/user');

const router = express.Router();

router.get('/', isLoggedIn, getMe);

router.post('/login', isNotLoggedIn, login);

router.post('/logout', isLoggedIn, logout);

router.post('/', isNotLoggedIn, signUp);

// localhost나 https에서만 동작
router.post('/check/jejunative', isLoggedIn, checkJejuNative);

module.exports = router;

const express = require('express');
const userRouter = require('./user');
const placeRouter = require('./place');
const placesRouter = require('./places');
const authRouter = require('./auth');

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/place', placeRouter);
router.use('/places', placesRouter);

module.exports = router;
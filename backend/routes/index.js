const express = require('express');
const userRouter = require('./user');
const placeRouter = require('./place');

const router = express.Router();

router.use('/user', userRouter);
router.use('/place', placeRouter);

module.exports = router;
const express = require('express');
const { getAllPlaces } = require('../controllers/places');

const router = express.Router();

router.get('/', getAllPlaces);

module.exports = router;
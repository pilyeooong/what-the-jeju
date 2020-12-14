const express = require('express');
const { getCategorizedPlaces } = require('../controllers/category');

const router = express.Router();

router.post('/',);

router.get('/:id', getCategorizedPlaces);

module.exports = router;
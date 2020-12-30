const express = require('express');
const { getCategorizedPlaces, createCategory } = require('../controllers/category');

const router = express.Router();

router.post('/', createCategory);

router.get('/:id', getCategorizedPlaces);

module.exports = router;
const express = require('express');
const { Place, Image } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const places = await Place.findAll({
      include: [
        {
          model: Image,
          attributes: ['src']
        }
      ]
    });
    return res.status(200).send(places);
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;
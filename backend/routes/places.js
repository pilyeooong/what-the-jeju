const express = require('express');
const { Place, Image, Hashtag, Category } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const places = await Place.findAll({
      include: [
        {
          model: Image,
          attributes: ['src']
        },
        {
          model: Category,
          attributes: ['name']
        },
        {
          model: Hashtag,
          attributes: ['name']
        }
      ],
      attributes: ['id', 'name', 'description', 'address', 'fee']
    });
    return res.status(200).send(places);
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;
const express = require('express');
const { Category, Place, Image, Hashtag } = require('../models');

const router = express.Router();

router.post('/', async(req, res, next) => {
  try {
    const category = await Category.create({
      name: req.body.name,
    });
    return res.status(201).send(category);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const category = await Category.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Place,
        include: [{
          model: Image
        }, {
          model: Hashtag,
          attributes: ['name']
        }, {
          model: Category,
          attributes: ['name']
        }]
      }
    ]
  });
  return res.status(200).send(category.Places);
});

module.exports = router;
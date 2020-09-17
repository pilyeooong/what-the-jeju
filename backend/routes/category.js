const express = require('express');
const { Category, Place } = require('../models');

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
  const places = await Category.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: Place,
      }
    ]
  })
  return res.status(200).send(places);
})
module.exports = router;
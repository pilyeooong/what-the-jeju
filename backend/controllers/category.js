const { Category, Place, Image, Hashtag } = require('../models');

exports.createCategory =  async(req, res, next) => {
  try {
    const category = await Category.create({
      name: req.body.name,
    });
    return res.status(201).send(category);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getCategorizedPlaces = async (req, res, next) => {
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
};

const { Place, Image, Hashtag, Category } = require('../models');

exports.getAllPlaces = async (req, res, next) => {
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
}
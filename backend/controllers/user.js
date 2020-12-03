const { User, Place, Image } = require('../models');

exports.getMe = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Place,
            as: 'Wished',
            attributes: ['id', 'name', 'lat', 'lng'],
            include: [
              {
                model: Image,
                attributes: ['id', 'src'],
              },
            ],
          },
          {
            model: Place,
            as: 'Liked',
            attributes: ['id']
          }
        ],
      });
      return res.status(200).send(user);
    } else {
      return res.status(200).send(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
}
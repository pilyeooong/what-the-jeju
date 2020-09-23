const express = require('express');
const fs = require('fs');
const axios = require('axios');
const { Place, Image, Category } = require('../models');
const { upload } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (err) {
  console.log('uploads folder not exist, Creating');
  fs.mkdirSync('uploads');
}

router.post('/images', upload.array('image'), async (req, res, next) => {
  return res.send(req.files.map((f) => f.filename));
});

router.post('/', upload.none(), async (req, res, next) => {
  try {
    const place = await Place.create({
      CategoryId: req.body.category,
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      fee: 0,
    });
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        console.log(images);
        await place.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        console.log(image);
        await place.addImages(image);
      }
    }
    return res.status(201).send(place);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const place = await Place.findOne({
      where: { id: req.params.id },
      include: [{
        model: Image
      }],
    });
    return res.status(200).send(place);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

const config = {
  headers: {
    'X-NCP-APIGW-API-KEY-ID': `${process.env.NAVER_MAP_CLIENT}`,
    'X-NCP-APIGW-API-KEY': `${process.env.NAVER_MAP_CLIENT_SECRET}`,
  },
};

router.post('/directions', (req, res, next) => {
  const { data: { origin, destination }} = req.body;
  const startPoint = `${parseFloat(origin.lng)},${parseFloat(origin.lat)}`;
  const endPoint = `${parseFloat(destination.lng)},${parseFloat(
    destination.lat
  )}`;
  axios.get(`https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${startPoint}&goal=${endPoint}?option=trafast`, config)
  .then(response => res.status(200).send(response.data))
  .catch(err => {
    console.error(err);
    next(err);
  })
})

router.get('/geocode/:place', async (req, res, next) => {
  const { place } = req.params;
  axios.get(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURI(place)}`, config)
  .then(response => res.status(200).send(response.data))
  .catch(err => {
    console.error(err);
    next(err);
  });
});

module.exports = router;

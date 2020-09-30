const express = require('express');
const fs = require('fs');
const axios = require('axios');
const { Place, Image, User } = require('../models');
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

router.get('/address/:placeName', async (req, res, next) => {
  try {
    const result = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURI(
        req.params.placeName
      )}`,
      { headers: { Authorization: `KakaoAK ${process.env.KAKAO_ID}` } }
    );

    const addresses = result.data.documents.map((address, index) => {
      const obj = {};
      obj.idx = index;
      obj.address_name = address.address_name;
      obj.place_name = address.place_name;
      obj.lng = address.x;
      obj.lat = address.y;
      return obj;
    });

    return res.status(200).send(addresses);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/', upload.none(), async (req, res, next) => {
  try {
    const place = await Place.create({
      CategoryId: req.body.category,
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      lat: req.body.lat,
      lng: req.body.lng,
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
      include: [
        {
          model: Image,
        },
        {
          model: User,
          as: 'Wishers',
          attributes: ['id'],
        },
      ],
    });
    return res.status(200).send(place);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/wish/:placeId', async (req, res, next) => {
  try {
    const place = await Place.findOne({
      where: { id: parseInt(req.params.placeId, 10) },
    });
    if (!place) {
      return res.status(404).send('존재하지 않는 장소입니다.');
    }
    if (!req.user) {
      return res.status(401).send('로그인이 필요합니다.');
    }
    await place.addWishers(req.user.id);
    return res.status(200).json({ placeId: place.id, userId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// router.get('/search/address', async (req, res, next) => {

// });

const config = {
  headers: {
    'X-NCP-APIGW-API-KEY-ID': `${process.env.NAVER_MAP_CLIENT}`,
    'X-NCP-APIGW-API-KEY': `${process.env.NAVER_MAP_CLIENT_SECRET}`,
  },
};

router.post('/directions', (req, res, next) => {
  const {
    data: { origin, destination },
  } = req.body;
  const startPoint = `${parseFloat(origin.lng)},${parseFloat(origin.lat)}`;
  const endPoint = `${parseFloat(destination.lng)},${parseFloat(
    destination.lat
  )}`;
  const wayPoints = [
    { name: '정방폭포', lng: 126.5730501, lat: 33.244748 },
    { name: '서귀포의료원', lng: 126.5639216, lat: 33.2555355 },
    { name: '열린병원', lng: 126.5654153, lat: 33.2544709 },
    { name: '서귀포중학교', lng: 126.5699083, lat: 33.2477513 },
    { name: '동홍동', lng: 126.56887224757, lat: 33.2579021227116 },
  ];
  axios
    .get(
      `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${startPoint}&goal=${endPoint}&waypoints=${wayPoints[4].lng},${wayPoints[4].lat}&option=traoptimal`,
      config
    )
    .then((response) => res.status(200).send(response.data))
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get('/geocode/:place', async (req, res, next) => {
  const { place } = req.params;
  axios
    .get(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURI(
        place
      )}`,
      config
    )
    .then((response) => res.status(200).send(response.data))
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;

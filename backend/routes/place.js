const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const { response } = require('express');

const router = express.Router();

const headers = {
  'X-NCP-APIGW-API-KEY-ID': `${process.env.NAVER_MAP_CLIENT}`,
  'X-NCP-APIGW-API-KEY': `${process.env.NAVER_MAP_CLIENT_SECRET}`,
};

router.post('/directions', async (req, res, next) => {
  const {
    data: { origin, destination },
  } = req.body;

  const startPoint = `${parseFloat(origin.lat)},${parseFloat(origin.lng)}`;
  const endPoint = (`${parseFloat(destination.lat)},${parseFloat(destination.lng)}`);

  console.log(startPoint);

  const options = {
    url: `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${startPoint}&goal=${endPoint}?option=trafast`,
    headers,
  };

  try {
    await request(options, (err, response, body) => {
      if (err) {
        console.error(err);
        next(err);
      }
      return res.status(200).send(response.body);
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/geocode/:place', async (req, res, next) => {
  const options = {
    url: `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURI(
      req.params.place
    )}`,
    headers,
  };

  try {
    await request(options, (err, response, body) => {
      if (err) {
        console.err(err);
        next(err);
      }
      return res.status(200).send(response.body);
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;

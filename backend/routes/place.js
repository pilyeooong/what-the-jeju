const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const { response } = require('express');

const router = express.Router();

router.post('/directions', async (req, res, next) => {
  const {
    data: { origin, destination },
  } = req.body;
  console.log(origin, destination);
  var headers = {
    'X-NCP-APIGW-API-KEY-ID': `${process.env.NAVER_MAP_CLIENT}`,
    'X-NCP-APIGW-API-KEY': `${process.env.NAVER_MAP_CLIENT_SECRET}`,
  };

  // const origin = '127.1058342,37.359708';
  // const destination = '129.075986,35.179470';

  var options = {
    url: `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${origin}&goal=${destination}`,
    headers: headers,
  };
  try {
    // await request(options, (err, response, body) => {
    //   if(err) {
    //     console.error(err);
    //     next(err);
    //   }
    //   return res.status(200).send(response.body);
    // });
  } catch (err) {
    console.error(err);
    next(err);
  }

  return res.status(200).send(origin, destination);
});

router.get('/geocode', async (req, res, next) => {});
module.exports = router;

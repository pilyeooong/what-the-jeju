const express = require('express');
const fs = require('fs');
const { upload } = require('./middlewares');
const {
  addPlace,
  placeDetail,
  likePlace,
  unLikePlace,
  wishPlace,
  unWishPlace,
  searchDirections,
  searchPlaceWithAddress,
  searchPlaceWithKeyword,
  addImages,
} = require('../controllers/place');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (err) {
  console.log('uploads folder not exist, Creating');
  fs.mkdirSync('uploads');
}

router.post('/images', upload.array('image'), addImages);

router.get('/search/address/:placeName', searchPlaceWithAddress);

router.get('/search/keyword/:placeName', searchPlaceWithKeyword);

router.post('/', upload.none(), addPlace);

router.get('/:id', placeDetail);

router.patch('/:placeId/like', likePlace);

router.patch('/:placeId/unlike', unLikePlace);

router.patch('/:placeId/wish', wishPlace);

router.patch('/:placeId/unwish', unWishPlace);

router.post('/directions', searchDirections);

module.exports = router;

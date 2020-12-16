const Place = require('../models/place');
const Category = require('../models/category');
const Hashtag = require('../models/hashtag');
const Image = require('../models/image');
const { addPlace, placeDetail, likePlace, unLikePlace } = require('./place');

const req = {
  user: {
    id: 1,
  },
  body: {
    category: 'testCategory',
    name: 'testPlace',
    description: 'testDescription #test',
    address: 'testAddress',
    lat: 'testLat',
    lng: 'testLng',
    image: 'image',
  },
  params: {
    id: 1,
    placeId: 1
  }
};

const res = {
  status: jest.fn(() => res),
  send: jest.fn(),
  json: jest.fn()
};

const err = new Error();

const next = jest.fn();

const mockedCategory = { id: 1, name: 'testCategory' };
const mockedCreatedPlace = {
  id: 2,
  name: 'testPlace',
  description: 'testDescription',
  address: 'testAddress',
  lat: 'testLat',
  lng: 'testLng',
  addHashtags: jest.fn().mockResolvedValue(true),
  addImages: jest.fn().mockResolvedValue(true),
};

describe('addPlace', () => {
  it('유효한 값이 주어지면 place를 생성한다.', async () => {
    Category.findOne = jest.fn().mockResolvedValue(mockedCategory);
    // jest.spyOn(Category, 'findOne').mockResolvedValue(mockedCategory);
    jest.spyOn(Place, 'findOne').mockImplementation(async () => null);
    jest
    .spyOn(Place, 'create')
    .mockImplementation(async () => mockedCreatedPlace);
    jest
    .spyOn(Hashtag, 'findOrCreate')
    .mockImplementation(async () => [[1, true]]); // Promise.all(model.findOrCreate)의 반환 형태
    jest.spyOn(Image, 'create').mockResolvedValue();
    
    await addPlace(req, res, next);

    expect(res.status).toBeCalledWith(201);
    expect(res.send).toBeCalledWith(mockedCreatedPlace);
  });

  it('같은 이름의 장소가 존재하면 409 응답코드를 반환한다.', async () => {
    jest
      .spyOn(Category, 'findOne')
      .mockImplementation(async () => mockedCategory);
    jest
      .spyOn(Place, 'findOne')
      .mockImplementation(async () => mockedCreatedPlace);

    await addPlace(req, res, next);

    expect(res.status).toBeCalledWith(409);
    expect(res.send).toBeCalledWith('같은 이름의 장소가 존재합니다.');
  });

  it('에러 발생시 next(err)를 호출한다', async () => {
    jest.spyOn(Category, 'findOne').mockImplementation(async () => { throw err; })
    await addPlace(req, res, next);

    expect(next).toBeCalledWith(err);
  });
});

describe('placeDetail', () => {
  const mockedPlace = {
    id: 1,
    name: 'testPlace'
  }
  it('유효한 요청일 시 place를 응답한다.', async () => {
    Place.findOne = jest.fn().mockResolvedValue(mockedPlace);

    await placeDetail(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith(mockedPlace);
  });

  it('요청한 id를 갖는 place가 존재 하지 않을시 404 에러를 응답한다.', async () => {
    Place.findOne.mockResolvedValue(null);

    await placeDetail(req, res, next);

    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith('존재하지 않는 장소입니다.');
  });

  it('에러 발생시 next(err) 응답', async () => {
    Place.findOne.mockRejectedValue(err);

    await placeDetail(req, res, next);

    expect(next).toBeCalledWith(err);
  });
});

describe('likePlace', () => {
  const mockedPlace = {
    id: 1,
    name: 'testPlace',
    addLikers(value) {
      return Promise.resolve(true);
    }
  };

  it('place에 like를 추가한다.', async() => {
    Place.findOne.mockResolvedValue(mockedPlace);

    await likePlace(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ placeId: mockedPlace.id, userId: req.user.id })
  });

  it('에러 발생시 next(err) 호출', () => {});
});

describe('unlikePlace', () => {
  const mockedPlace = {
    id: 1,
    name: 'testPlace',
    removeLikers(value) {
      return Promise.resolve(true);
    }
  };

  it('place에 like를 삭제한다.', async() => {
    Place.findOne.mockResolvedValue(mockedPlace);

    await unLikePlace(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ placeId: mockedPlace.id, userId: req.user.id })
  });
});
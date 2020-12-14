const Place = require('../models/place');
const Category = require('../models/category');
const Hashtag = require('../models/hashtag');
const Image = require('../models/image');
const { addPlace } = require('./place');

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
};

const res = {
  status: jest.fn(() => res),
  send: jest.fn(),
};

const next = () => jest.fn();

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
    jest.spyOn(Category, 'findOne').mockResolvedValue(mockedCategory);
    jest.spyOn(Place, 'findOne').mockImplementation(async () => null);
    jest
      .spyOn(Place, 'create')
      .mockImplementation(async () => mockedCreatedPlace);
    jest
      .spyOn(Hashtag, 'findOrCreate')
      .mockImplementation(async () => [[1, true]]); // Promise.all(model.findOrCreate)의 반환 형태
    jest.spyOn(Image, 'create').mockResolvedValue();

    // Place.findOne.mockResolvedValue(null); // 등록하려는 장소가 존재하지 않는다.
    // Category.findOne.mockResolvedValue(mockedCategory);
    // Place.create.mockResolvedValue(mockedCreatedPlace);

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

    jest.spyOn(Category, 'findOne').mockImplementation(async () => { throw new Error(); })
    await addPlace(req, res, next);
  });
});

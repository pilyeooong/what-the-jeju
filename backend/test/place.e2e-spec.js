const request = require('supertest');
const { sequelize } = require('../models');
const app = require('../app');

const TEST_EMAIL = 'test@test.com';
const TEST_PASSWORD = 'test';
const TEST_NICKNAME = 'nickname';
const CATEGORY = '카페';
const PLACE_NAME = 'PLACE_NAME';
const PLACE_DESCRIPTION = 'PLACE_DESCRIPTION #HASHTAG';
const PLACE_ADDRESS = 'PLACE_ADDRESS';
const PLACE_LAT = 'PLACE_LAT';
const PLACE_LNG = 'PLACE_LNG';

beforeAll(async (done) => {
  await sequelize.sync();
  done();
});

const agent = request.agent(app);

describe('로그인 필요 동작 수행을 위한 유저 인증', () => {
  it('회원가입 수행', async (done) => {
    const res = await request(app).post('/api/user').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      nickname: TEST_NICKNAME,
    });
    expect(res.status).toEqual(201);
    done();
  });

  it('로그인 수행', async (done) => {
    const res = await agent.post('/api/user/login').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    expect(res.status).toEqual(200);
    done();
  });
});

describe('POST /place', () => {
  it('장소 등록을 위한 카테고리 추가 요청 성공시 201 응답을 반환한다', async (done) => {
    const res = await agent.post('/api/category').send({
      name: CATEGORY,
    });
    expect(res.status).toEqual(201);
    done();
  });

  it('유효한 요청시 place를 추가하고 201 응답을 반환한다.', async (done) => {
    const res = await agent.post('/api/place').send({
      category: CATEGORY,
      name: PLACE_NAME,
      description: PLACE_DESCRIPTION,
      address: PLACE_ADDRESS,
      lat: PLACE_LAT,
      lng: PLACE_LNG,
    });
    expect(res.status).toEqual(201);
    done();
  });
});

describe('GET /:id', () => {
  it('유효한 place id 전달 시 디테일 정보와 200 응답을 반환한다', async (done) => {
    const PLACE_ID = 1;
    const res = await request(app).get(`/api/place/${PLACE_ID}`);
    expect(res.status).toEqual(200);
    done();
  });

  it('존재하지 않는 place의 id 일 경우 404 에러를 응답한다', async (done) => {
    const PLACE_ID = 2;
    const res = await request(app).get(`/api/place/${PLACE_ID}`);
    expect(res.status).toEqual(404);
    expect(res.text).toEqual('존재하지 않는 장소입니다.');
    done();
  });
});

describe('PATCH /:id/like', () => {
  it('로그인 안한 상태에서 요청시 401 에러를 반환한다.', async (done) => {
    const PLACE_ID = 1;
    const res = await request(app).patch(`/api/place/${PLACE_ID}/like`);
    expect(res.status).toEqual(401);
    expect(res.text).toEqual('로그인이 필요합니다.');
    done();
  })
  it('유효한 요청일시 place에 좋아요를 등록하고 200 응답을 반환한다', async (done) => {
    const PLACE_ID = 1;
    const res = await agent.patch(`/api/place/${PLACE_ID}/like`);
    expect(res.status).toEqual(200);
    done();
  });
  it('존재하지 않는 place에 좋아요 요청 시 404 에러를 응답한다', async (done) => {
    const PLACE_ID = 2;
    const res = await agent.patch(`/api/place/${PLACE_ID}/like`);
    expect(res.status).toEqual(404);
    done();
  });
});

describe('PATCH /:id/unlike', () => {
  it('로그인 안한 상태에서 요청시 401 에러를 반환한다.', async (done) => {
    const PLACE_ID = 1;
    const res = await request(app).patch(`/api/place/${PLACE_ID}/unlike`);
    expect(res.status).toEqual(401);
    expect(res.text).toEqual('로그인이 필요합니다.');
    done();
  })
  it('유효한 요청일시 place에 좋아요를 취소하고 200 응답을 반환한다', async (done) => {
    const PLACE_ID = 1;
    const res = await agent.patch(`/api/place/${PLACE_ID}/unlike`);
    expect(res.status).toEqual(200);
    done();
  });
  it('존재하지 않는 place에 좋아요 취소 요청 시 404 에러를 응답한다', async (done) => {
    const PLACE_ID = 2;
    const res = await agent.patch(`/api/place/${PLACE_ID}/unlike`);
    expect(res.status).toEqual(404);
    done();
  });
});

describe('PATCH /:id/wish', () => {
  it('로그인 안한 상태에서 요청시 401 에러를 반환한다.', async (done) => {
    const PLACE_ID = 1;
    const res = await request(app).patch(`/api/place/${PLACE_ID}/wish`);
    expect(res.status).toEqual(401);
    expect(res.text).toEqual('로그인이 필요합니다.');
    done();
  })
  it('유효한 요청일시 place에 찜하기 요청에 대해 200 응답을 반환한다', async (done) => {
    const PLACE_ID = 1;
    const res = await agent.patch(`/api/place/${PLACE_ID}/wish`);
    expect(res.status).toEqual(200);
    done();
  });
  it('존재하지 않는 place에 찜하기 요청 시 404 에러를 응답한다', async (done) => {
    const PLACE_ID = 2;
    const res = await agent.patch(`/api/place/${PLACE_ID}/wish`);
    expect(res.status).toEqual(404);
    done();
  });
});

describe('PATCH /:id/unwish', () => {
  it('로그인 안한 상태에서 요청시 401 에러를 반환한다.', async (done) => {
    const PLACE_ID = 1;
    const res = await request(app).patch(`/api/place/${PLACE_ID}/unwish`);
    expect(res.status).toEqual(401);
    expect(res.text).toEqual('로그인이 필요합니다.');
    done();
  })
  it('유효한 요청일 시 place에 찜하기 취소 요청에 대해 200 응답을 반환한다', async (done) => {
    const PLACE_ID = 1;
    const res = await agent.patch(`/api/place/${PLACE_ID}/unwish`);
    expect(res.status).toEqual(200);
    done();
  });
  it('존재하지 않는 place에 찜하기 취소 요청 시 404 에러를 응답한다', async (done) => {
    const PLACE_ID = 2;
    const res = await agent.patch(`/api/place/${PLACE_ID}/unwish`);
    expect(res.status).toEqual(404);
    done();
  });
});

afterAll(async (done) => {
  await sequelize.sync({ force: true });
  await sequelize.close();
  done();
});

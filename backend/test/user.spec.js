const request = require('supertest');
const axios = require('axios');
const { sequelize } = require('../models');
const app = require('../app');

beforeAll(async () => {
  await sequelize.sync();
});

const TEST_EMAIL = 'test@test.com';
const TEST_PASSWORD = 'test';
const TEST_NICKNAME = 'nickname'

describe('POST /join', () => {
  it('회원가입 수행', async (done) => {
    const res = await request(app).post('/api/user').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      nickname: TEST_NICKNAME,
    });
    expect(res.status).toEqual(201);
    done();
  });

  it('이미 존재하는 이메일로 가입 시도시 409 에러', async (done) => {
    const res = await request(app).post('/api/user').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      nickname: TEST_NICKNAME,
    });
    expect(res.status).toEqual(409);
    expect(res.text).toEqual('이미 사용중인 이메일입니다.');
    done();
  });
});

describe('POST /login ~ ', () => {

  const agent = request.agent(app);

  it('로그인 수행', async (done) => {
    const res = await agent.post('/api/user/login').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
    expect(res.status).toEqual(200);
    done();
  });

  it('로그인 상태에서 회원가입 요청시 403 에러', async (done) => {
    const res = await agent.post('/api/user').send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      nickname: TEST_NICKNAME,
    });
    expect(res.status).toEqual(403);
    expect(res.text).toEqual('로그인 유저는 접근할 수 없습니다.');
    done();
  });

  it('로그인 상태시 내 정보를 반환', async (done) => {
    const res = await agent.get('/api/user');
    expect(res.status).toEqual(200);
    expect(res.body.email).toEqual(TEST_EMAIL);
    expect(res.body.nickname).toEqual(TEST_NICKNAME);
    done();
  });

  it('로그인 상태일 시 로그아웃', async (done) => {
    const res = await agent.post('/api/user/logout');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('logout');
    done();
  });

  it('로그아웃 상태에서는 로그아웃 시도시 403 에러', async (done) => {
    const res =  await agent.post('/api/user/logout');
    expect(res.status).toEqual(403);
    expect(res.text).toEqual('로그인이 필요합니다.');
    done();
  });
});

describe('POST /check/JejuNative', () => {
  const agent = request.agent(app);

  it('로그인 상태가 아닐 시 403 에러', async (done) => {
    const res = await agent.post('/api/user/check/jejunative').send({
      lat: expect.any(Number),
      lng: expect.any(Number),
    });
    expect(res.status).toEqual(403);
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

  it('도내 lat, lng일 시 응답 코드 200과 true를 반환', async (done) => {
    const mockedResult = {
      data: {
        results: [{
          region: {
            area1: {
              name: '제주특별자치도'
            }
          }
        }]
      }
    }
    axios.get = jest.fn().mockResolvedValue(mockedResult);

    const res = await agent.post('/api/user/check/jejunative').send({
      lat: expect.any(Number),
      lng: expect.any(Number),
    });
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('true');
    done();
  });

  it('도내가 아닌 lat, lng일 시 응답 코드 200과 false를 반환', async (done) => {
    const mockedResult = {
      data: {
        results: [{
          region: {
            area1: {
              name: '서울'
            }
          }
        }]
      }
    }
    axios.get = jest.fn().mockResolvedValue(mockedResult);

    const res = await agent.post('/api/user/check/jejunative').send({
      lat: expect.any(Number),
      lng: expect.any(Number),
    });
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('false');
    done();
  });
})

afterAll(async () => {
  await sequelize.sync({ force: true });
});

jest.mock('../models');
const { User } = require('../models');
const { getMe, login } = require('./user');
const { Strategy: LocalStrategy } = require('passport-local');
const passport = require('passport');

describe('getMe', () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  }
  const next = jest.fn()

  it('로그인이 되어있을 시 (req.user 존재), 내 유저 정보를 반환한다', async () => {
    const req = {
      user: {
        id: 1
      }
    };

    const user = {
      id: 1
    };

    User.findOne.mockResolvedValue(user);
    await getMe(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith(user);
  });

  it('로그인이 되어 있지 않으면, null을 반환한다.', async () => {
    const req = {};

    await getMe(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith(null);
  });

  it('에러 발생시 next()의 인자로 err를 전달한다.', async () => {
    const req = {
      user: {
        id: 1
      }
    };

    const err = new Error();
    User.findOne.mockRejectedValue(err);
    await getMe(req, res, next);

    expect(next).toBeCalledWith(err);
  });
});


describe('login', () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn()
  }
  const next = jest.fn();

  it('유효한 이메일과 비밀번호 입력시 로그인 및 로그인 한 유저 정보를 반환한다.', async () => {
    const user = { id: 1, email: 'testUser' };
    const req = {
      // body: {
      //   email: 'email@email.com',
      //   password: 'password'
      // },
      login: jest.fn((user, cb) => cb(null))
    }

    User.findOne.mockResolvedValue(user);

    passport.authenticate = jest.fn((type, callback) => () => { callback(null, user, null) });

    await login(req, res, next);

    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(req.login).toHaveBeenCalledTimes(1);
  });
  it.todo('에러 발생시 next(err)를 호출한다.');
  it.todo('정상적인 요청이나, 유효한 이메일 혹은 비밀번호가 일치하지 않을시 401 에러와 메시지를 반환한다.');
});
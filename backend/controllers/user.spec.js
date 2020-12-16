jest.mock('../models');
const { User } = require('../models');
const { getMe, login, logout, signUp } = require('./user');
const { isLoggedIn, isNotLoggedIn } = require('../routes/middlewares');
const { Strategy: LocalStrategy } = require('passport-local');
const passport = require('passport');
const bcrypt = require('bcrypt');

const res = {
  status: jest.fn(() => res),
  send: jest.fn()
}

jest.mock('bcrypt');

describe('getMe', () => {
  const next = jest.fn();

  it('로그인이 되어있을 시 (req.user 존재), 내 유저 정보를 반환한다', async () => {
    const req = {
      user: {
        id: 1,
      },
    };

    const user = {
      id: 1,
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
        id: 1,
      },
    };

    const err = new Error();
    User.findOne.mockRejectedValue(err);
    await getMe(req, res, next);

    expect(next).toBeCalledWith(err);
  });
});

describe('login', () => {
  const next = jest.fn();

  const req = {
    login: jest
      .fn()
      .mockImplementationOnce((user, cb) => cb(null))
      .mockImplementationOnce((user, cb) => cb('error')),
  };

  const user = { id: 1, email: 'testUser' };

  it('유효한 이메일과 비밀번호 입력시 로그인, 응답코드 200을 반환한다.', async () => {
    User.findOne.mockResolvedValue(user);

    passport.authenticate = jest.fn((type, callback) => () => {
      callback(null, user, null);
    });

    await login(req, res, next);

    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(req.login).toHaveBeenCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
  });

  it('에러 발생시 next(err)를 호출한다.', async () => {
    passport.authenticate = jest.fn((type, callback) => () => {
      callback('error', user, null);
    });

    await login(req, res, next);

    expect(next).toBeCalledWith('error');
  });

  it('정상적인 요청이나, 유효한 이메일 혹은 비밀번호가 일치하지 않을시 401 에러와 메시지를 반환한다.', async () => {
    passport.authenticate = jest.fn((type, callback) => () => {
      callback(null, user, 'wrong info');
    });

    await login(req, res, next);

    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(req.login).toHaveBeenCalledTimes(1);
    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith(
      '해당 이메일로 가입된 계정이 없거나 비밀번호가 일치하지 않습니다.'
    );
  });

  it('req.login 콜백 에러시 next(err) 호출', async () => {
    passport.authenticate = jest.fn((type, callback) => () => {
      callback(null, user, null);
    });

    await login(req, res, next);

    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(next).toBeCalledWith('error');
  });
});

describe('logout', () => {
  const next = jest.fn();

  it('로그인이 되어 있는 상태일시 로그아웃', async () => {
    const req = {
      isAuthenticated: jest.fn().mockReturnValue(true),
      logout: jest.fn(),
      session: {
        destroy: jest.fn()
      }
    };

    await isLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);

    await logout(req, res, next);
    expect(req.logout).toBeCalledTimes(1);
    expect(req.session.destroy).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith('logout');
  });
});

describe('signUp', () => {
  const next = jest.fn();

  const user = {
      email: 'test@gmail.com',
      password: 'test',
      nickname: 'test'
  };

  const req = {
    body: {
      ...user
    }
  };

  const HASHED_PASSWORD = 'HASHED_PASSWORD';
  bcrypt.hash.mockResolvedValue(HASHED_PASSWORD);

  it('이미 존재하는 이메일로 가입하려는 경우 응답코드 409를 반환한다.', async () => {
   
    User.findOne.mockResolvedValue(user);

    await signUp(req, res, next);

    expect(res.status).toBeCalledWith(409);
    expect(res.send).toBeCalledWith('이미 사용중인 이메일입니다.');
  });

  it('유효한 값(이메일 중복x)으로 요청시 user를 생성한다.', async () => {
    const createdUser = {
      ...user,
      password: HASHED_PASSWORD
    }
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(createdUser);

    await signUp(req, res, next);
    
    expect(res.status).toBeCalledWith(201);
    expect(res.send).toBeCalledWith(createdUser);

  });

  it('에러 발생시 next(err) 호출', async () => {
    const err = new Error();
    
    // User.findOne.mockRejectedValue(err);
    User.create.mockRejectedValue(err);
    
    await signUp(req, res, next);
    
    expect(next).toBeCalledWith(err);
  });
});
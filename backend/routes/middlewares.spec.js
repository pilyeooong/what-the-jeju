const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

describe('isLoggedIn', () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn()
  }
  
  const next = jest.fn();

  it('로그인이 되어있으면 isLoggedIn()은 next()를 호출한다..', () => {
    const req = {
      isAuthenticated: jest.fn(() => true)
    }
    isLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  it('로그인이 되어 있지 않으면 401 응답코드를 반환한다.', () => {
    const req = {
      isAuthenticated: jest.fn(() => false)
    }
    isLoggedIn(req, res, next);
    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith('로그인이 필요합니다.');
  })
});

describe('isNotLoggedIn', () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn()
  }
  
  const next = jest.fn();

  it('로그인이 되어 있지 않으면 isNotLoggedIn은 next()를 호출한다.', () => {
    const req = {
      isAuthenticated: jest.fn(() => false)
    }
    isNotLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  it('로그인이 되어 있으면 403 응답코드를 반환한다.', () => {
    const req = {
      isAuthenticated: jest.fn(() => true)
    }
    isNotLoggedIn(req, res, next);
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledWith('로그인 유저는 접근할 수 없습니다.');
  });
});
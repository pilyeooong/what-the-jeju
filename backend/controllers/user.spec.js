jest.mock('../models');
const { User } = require('../models');
const { getMe } = require('./user');

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

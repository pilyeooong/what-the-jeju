const { User } = require('../models');

const userData = [
  {
    email: 'pilyeong@naver.com',
    nickname: 'pilyeong',
    password: '123',
  },
  {
    email: 'sam@naver.com',
    nickname: 'sam',
    password: '123',
  },
  {
    email: 'max@naver.com',
    nickname: 'max',
    password: '123',
  },
  {
    email: 'john@naver.com',
    nickname: 'john',
    password: '123',
  },
  {
    email: 'andrew@naver.com',
    nickname: 'andrew',
    password: '123',
  },
  {
    email: 'kim@naver.com',
    nickname: 'kim',
    password: '123',
  },
  {
    email: 'lee@naver.com',
    nickname: 'lee',
    password: '123',
  },
  {
    email: 'park@naver.com',
    nickname: 'park',
    password: '123',
  },
  {
    email: 'mike@naver.com',
  nickname: 'mikeeeee',
    password: '123',
  },
]

module.exports = async () => {
  try {
    await User.bulkCreate(userData);
    console.log('user created')
  } catch (err) {
    console.error(err);
  }
};
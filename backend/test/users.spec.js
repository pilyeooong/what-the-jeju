const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { User, sequelize } = require('../models');

const userSeeder = require('../seeders/user_seeder');

const expect = chai.expect;
chai.use(chaiHttp);

// 테스트 케이스 작성 전 , 테이블의 모든 레코드 정리

describe('GET /users', () => {
  beforeEach((done) => {
    User.destroy({
      where: {},
      force: true,
    })
      .then(() => {
        userSeeder();
      })
      .then(() => {
        done();
      });
  });

  it('it should GET all the users', (done) => {
    chai
      .request(app)
      .get('/api/user')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(9);
        done();
      });
  });
});

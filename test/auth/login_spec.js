/* global api, describe, it, expect, beforeEach */

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');
const User = require('../../models/user');
const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

let userId;

describe('POST /login', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id.toString();
        done();
      });
  });

  it('should return a valid token', done => {
    api
      .post('/api/login')
      .send(userData)
      .end((err, res) => {
        expect(res.body.token).to.exist;
        jwt.verify(res.body.token, secret, (err, payload) => {
          expect(payload.sub).to.eq(userId);
          expect(payload.iat).to.be.a('number');
          expect(payload.exp).to.be.a('number');
          done();
        });
      });
  });

  it('should return a 401 response if the password is bad', done => {
    const badData = { email: 'test@test.com', password: 'bad' };

    api
      .post('/api/login')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 401 response if the user doesn\'t exist', done => {
    const badData = { email: 'bad@test.com', password: 'test' };

    api
      .post('/api/login')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
});

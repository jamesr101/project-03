/* global api, describe, it, expect, beforeEach */
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');
const Artist = require('../../models/artist');
const User = require('../../models/user');

// let artistId = null;

const artistData = {
  name: 'test artist',
  image: 'https://test.image',
  dateBorn: new Date(1881, 1, 1),
  dateDeath: new Date(1981, 1, 1),
  info: 'test info',
  wikiLink: 'https://wiki.link'
};

const userData = { username: 'test', email: 'test@test.com', password: 'test', passwordConfirmation: 'test' };
let token;
let artist;

describe('DELETE /artists', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Artist.remove({})
    ])
      .then(() => Promise.props({
        artist: Artist.create(artistData),
        user: User.create(userData)
      }))
      .then(data => {
        artist = data.artist;
        token = jwt.sign({ sub: data.user._id }, secret, { expiresIn: '5m' });
      })
      .then(done);
  });


  it('should return a 401 response without token', done => {
    api
      .delete(`/api/artists/${artist._id}`)
      .send(artistData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204 response with a token', done => {
    api
      .delete(`/api/artists/${artist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(artistData)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should return empty body', done => {
    api
      .delete(`/api/artists/${artist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(artistData)
      .end((err, res) => {
        expect(res.body).to.be.empty;
        done();
      });
  });

});

/* global api, describe, it, expect, beforeEach */
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');
const Artist = require('../../models/artist');
const User = require('../../models/user');


const artistData = [{
  name: 'first artist',
  image: 'https://test.image',
  dateBorn: new Date(1881, 1, 1).toISOString(),
  dateDeath: new Date(1981, 1, 1).toISOString(),
  info: 'test info',
  wikiLink: 'https://wiki.link'
},{
  name: 'second artist',
  image: 'https://testsecond.image',
  dateBorn: new Date(1883, 1, 1).toISOString(),
  dateDeath: new Date(1983, 1, 1).toISOString(),
  info: 'second test info',
  wikiLink: 'https://wikisecond.link'
}];

const userData = { username: 'test', email: 'test@test.com', password: 'test', passwordConfirmation: 'test' };
let token;
let artist;

describe('PUT /artists/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Artist.remove({})
    ])
      .then(() => Promise.props({
        artist: Artist.create(artistData[0]),
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
      .put(`/api/artists/${artist._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response with token', done => {
    api
      .put(`/api/artists/${artist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(artistData[1])
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an artist object', done => {
    api
      .put(`/api/artists/${artist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(artistData[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          '_id',
          'name',
          'image',
          'dateBorn',
          'dateDeath',
          'info',
          'wikiLink'
        ]);

        done();
      });
  });

  it('should return the correct data', done => {
    api
      .put(`/api/artists/${artist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(artistData[1])
      .end((err, res) => {
        expect(res.body.name).to.eq(artistData[1].name);
        expect(res.body.image).to.eq(artistData[1].image);
        expect(res.body.dateBorn).to.eq(artistData[1].dateBorn);
        expect(res.body.dateDeath).to.eq(artistData[1].dateDeath);
        expect(res.body.info).to.eq(artistData[1].info);
        expect(res.body.wikiLink).to.eq(artistData[1].wikiLink);

        done();
      });
  });
});

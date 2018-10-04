/* global api, describe, it, expect, beforeEach */
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');
const Artist = require('../../models/artist');
const User = require('../../models/user');

// let artistId = null;

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

describe('GET /artists', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Artist.remove({})
    ])
      .then(() => Artist.create(artistData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get('/api/artists')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array of artists', done => {
    api
      .get('/api/artists')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach(artist => {
          expect(artist).to.include.keys([
            '_id',
            'name',
            'image',
            'dateBorn',
            'dateDeath',
            'info',
            'wikiLink'
          ]);
        });
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/artists')
      .end((err, res) => {
        res.body = res.body.sort((a, b) => a.dateBorn > b.dateBorn);
        res.body.forEach((artist, i) => {
          expect(artist.name).to.eq(artistData[i].name);
          expect(artist.image).to.eq(artistData[i].image);
          expect(artist.dateBorn).to.eq(artistData[i].dateBorn);
          expect(artist.dateDeath).to.eq(artistData[i].dateDeath);
          expect(artist.info).to.eq(artistData[i].info);
          expect(artist.wikiLink).to.eq(artistData[i].wikiLink);

        });
        done();
      });
  });
});

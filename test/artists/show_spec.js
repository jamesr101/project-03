/* global api, describe, it, expect, beforeEach */

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

let artist;

describe('GET /artists/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Artist.remove({})
    ])
      .then(() => Artist.create(artistData))
      .then(artists => artist = artists[0])
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get(`/api/artists/${artist._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an artist object', done => {
    api
      .get(`/api/artists/${artist._id}`)
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
      .get(`/api/artists/${artist._id}`)
      .end((err, res) => {
        expect(res.body.name).to.eq(artistData[0].name);
        expect(res.body.image).to.eq(artistData[0].image);
        expect(res.body.dateBorn).to.eq(artistData[0].dateBorn);
        expect(res.body.dateDeath).to.eq(artistData[0].dateDeath);
        expect(res.body.info).to.eq(artistData[0].info);
        expect(res.body.wikiLink).to.eq(artistData[0].wikiLink);

        done();
      });
  });
});

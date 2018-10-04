/* global api, describe, it, expect, beforeEach */
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');
const Artist = require('../../models/artist');
const User = require('../../models/user');

// let artistId = null;

const artistData = {
  name: 'test artist',
  image: 'https://test.image',
  dateBorn: new Date(1881, 1, 1).toISOString(),
  dateDeath: new Date(1981, 1, 1).toISOString(),
  info: 'test info',
  wikiLink: 'https://wiki.link'
};

// const date = new Date(artistData.dateBorn);
//
// const MonthNames = [
//   'January', 'February', 'March',
//   'April', 'May', 'June', 'July',
//   'August', 'September', 'October',
//   'November', 'December'
// ];
//
// // const day = artistData.dateBorn.getDate();
// const month = MonthNames[artistData.dateBorn.date.getMonth()];
// const year = artistData.dateBorn.date.getFullYear();
//
// const formatedDate = `${date} ${month} ${year}`;


const userData = { username: 'test', email: 'test@test.com', password: 'test', passwordConfirmation: 'test' };
let token;

describe('POST /artists', () => {
  beforeEach(done => {
    Promise.all([
      Artist.remove({}),
      User.remove({})
    ])
      .then(() => Artist.create(artistData))
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(done);
  });


  it('should return a 401 response without token', done => {
    api
      .post('/api/artists')
      .send(artistData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 response with a token', done => {
    api
      .post('/api/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(artistData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return the created artist', done => {
    api
      .post('/api/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(artistData)
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
      .post('/api/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(artistData)
      .end((err, res) => {
        expect(res.body.name).to.eq(artistData.name);
        expect(res.body.image).to.eq(artistData.image);
        expect(res.body.dateBorn).to.eq(artistData.dateBorn);
        expect(res.body.dateDeath).to.eq(artistData.dateDeath);
        expect(res.body.info).to.eq(artistData.info);
        expect(res.body.wikiLink).to.eq(artistData.wikiLink);

        done();
      });
  });

});

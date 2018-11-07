/* global api, describe, it, expect, beforeEach */

// const Artist = require('../../models/artist');
const Journey = require('../../models/journey');

const User = require('../../models/user');



const journeyData = [{
  title: 'journey title',
  image: '/assets/images/seeds/JPablo.jpg',
  info: 'journey info',
  // user: seededUsers[1],
  // trophyWin: seededTrophy[3],
  tasks: [
    {
      type: 'Info',
      title: 'Go to National Gallery',
      content: 'Our journey begin in National Gallery, firstly arrive to National Gallery',
      order: 0
    }
    // ,{
    //   type: 'FindPainting',
    //   title: 'Find the Weeping Woman',
    //   content: 'Weeping Woman is ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    //   painting: seededPaintings[0],
    //   order: 1
    // }
  ]
}];




describe('GET /journeys', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Journey.remove({})
    ])
      .then(() => Journey.create(journeyData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get('/api/journeys')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array of journeys', done => {
    api
      .get('/api/journeys')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach(journey => {
          expect(journey).to.include.keys([
            '_id',
            'title',
            'image',
            'info'
          ]);
        });
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/journeys')
      .end((err, res) => {
        // res.body = res.body.sort((a, b) => a.dateBorn > b.dateBorn);
        res.body.forEach((journey, i) => {
          expect(journey.title).to.eq(journeyData[i].title);
          expect(journey.image).to.eq(journeyData[i].image);
          expect(journey.info).to.eq(journeyData[i].info);
        });
        done();
      });
  });
});

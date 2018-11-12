/* global api, describe, it, expect, beforeEach */

const Journey = require('../../models/journey');

const User = require('../../models/user');



const journeyData = [{
  title: 'journey title',
  image: '/assets/images/seeds/JPablo.jpg',
  info: 'journey info',
  tasks: [
    {
      type: 'Info',
      title: 'title info',
      content: 'content task info',
      order: 0
    }
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

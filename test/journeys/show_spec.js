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

let journey;

describe('GET /journeys/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Journey.remove({})
    ])
      .then(() => Journey.create(journeyData))
      .then(journeys => journey = journeys[0])
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get(`/api/journeys/${journey._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an journey object', done => {
    api
      .get(`/api/journeys/${journey._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          '_id',
          'title',
          'image',
          'info'
        ]);

        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get(`/api/journeys/${journey._id}`)
      .end((err, res) => {
        expect(res.body.name).to.eq(journeyData[0].name);
        expect(res.body.image).to.eq(journeyData[0].image);
        expect(res.body.dateBorn).to.eq(journeyData[0].dateBorn);
        expect(res.body.dateDeath).to.eq(journeyData[0].dateDeath);
        expect(res.body.info).to.eq(journeyData[0].info);
        expect(res.body.wikiLink).to.eq(journeyData[0].wikiLink);

        done();
      });
  });
});

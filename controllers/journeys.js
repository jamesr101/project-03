const Journey = require('../models/journey');
require('../models/Trophy');

function indexRoute(req, res, next) {
  Journey
    .find()
    .sort({ name: 1 })
    .exec()
    .then(journeys => res.json(journeys))
    .catch(next); // send errors to errorHandler
}

function showRoute(req, res, next) {
  Journey
    .findById(req.params.id)
    .populate('trophyWin user tasks.painting')
    .exec()
    .then(journey => {
      if(!journey) throw new Error('Not Found'); // create a custom error
      return res.json(journey);
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute
};

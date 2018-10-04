const Artist = require('../models/artist');

function indexRoute(req, res, next) {
  Artist
    .find()
    .populate('paintings followers')
    .sort({ name: 1 })
    .exec()
    .then(artists => res.json(artists))
    .catch(next); // send errors to errorHandler
}

function showRoute(req, res, next) {
  Artist
    .findById(req.params.id)
    .populate('paintings followers')
    .exec()
    .then(artist => {
      if(!artist) throw new Error('Not Found'); // create a custom error
      return res.json(artist);
    })
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser;
  Artist
    .create(req.body)
    .then(artist => res.status(201).json(artist))
    .catch(next);
}

function updateRoute(req, res, next) {
  Artist
    .findById(req.params.id)
    .exec()
    .then(artist => artist.set(req.body))
    .then(artist => artist.save())
    .then(artist => res.json(artist))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Artist
    .findById(req.params.id)
    .exec()
    .then(artist => artist.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};

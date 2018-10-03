const Painting = require('../models/painting');

function indexRoute(req, res, next) {
  Painting
    .find()
    .sort({ name: 1 })
    .exec()
    .then(paintings => res.json(paintings))
    .catch(next); // send errors to errorHandler
}

function showRoute(req, res, next) {
  Painting
    .findById(req.params.id)
    .populate('user comment.user')
    .exec()
    .then(painting => {
      if(!painting) throw new Error('Not Found'); // create a custom error
      return res.json(painting);
    })
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser;
  Painting
    .create(req.body)
    .then(painting => res.status(201).json(painting))
    .catch(next);
}

function updateRoute(req, res, next) {
  Painting
    .findById(req.params.id)
    .exec()
    .then(painting => painting.set(req.body))
    .then(painting => painting.save())
    .then(painting => res.json(painting))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Painting
    .findById(req.params.id)
    .exec()
    .then(painting => painting.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function commentCreateRoute(req, res, next) {
  req.body.user = req.currentUser;
  Painting
    .findById(req.params.id)
    .populate('user comments.user')
    .exec()
    .then(painting => {
      painting.comments.push(req.body);
      return painting.save();
    })
    .then(painting => res.json(painting))
    .catch(next);
}

function commentDeleteRoute(req, res, next) {
  Painting
    .findById(req.params.id)
    .populate('user comments.user')
    .exec()
    .then(painting => {
      const comment = painting.comments.id(req.params.commentId);
      comment.remove();
      return painting.save();
    })
    .then(painting => res.json(painting))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: commentCreateRoute,
  deleteComment: commentDeleteRoute
};

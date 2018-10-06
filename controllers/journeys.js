const Journey = require('../models/journey');
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

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

function checkPhotoTaskRoute(req, res, next) {
  req.body.user = req.currentUser;
  console.log(req.body);
  client
    .logoDetection(req.body.photoUrl)
    .then(results => {
      // Journey
      //   .findById(req.journeyId)
      //   .populate('tasks.painting')
      //   .exec()
      //   .then(journey => {
      //     console.log(journey);
      //     const task = journey.task.id(req.taskId);
      //     return task.painting.title;
      //   })
      //   .then(paintTitle => {
      //     console.log('paintTitle ' + paintTitle);
      //     const labels = results[0].logoAnnotations;
      //     return labels;
      //   });
      console.log(results);
      const labels = results[0].logoAnnotations.map(e => e.description);
      return labels;
    })
    .then((labels) => res.status(201).json(labels))
    .catch(next);

  // Journey
  //   .findById(req.params.id)
  //   .then(journey => res.json(journey))
}

// function createRoute(req, res, next) {
//   req.body.user = req.currentUser;
//   Journey
//     .create(req.body)
//     .then(journey => res.status(201).json(journey))
//     .catch(next);
// }
//
// function updateRoute(req, res, next) {
//   Journey
//     .findById(req.params.id)
//     .exec()
//     .then(journey => journey.set(req.body))
//     .then(journey => journey.save())
//     .then(journey => res.json(journey))
//     .catch(next);
// }
//
// function deleteRoute(req, res, next) {
//   Journey
//     .findById(req.params.id)
//     .exec()
//     .then(journey => journey.remove())
//     .then(() => res.sendStatus(204))
//     .catch(next);
// }
//
// function taskCreateRoute(req, res, next) {
//   req.body.user = req.currentUser;
//   Journey
//     .findById(req.params.id)
//     .populate('tasks.painting')
//     .exec()
//     .then(journey => {
//       journey.comments.push(req.body);
//       return journey.save();
//     })
//     .then(journey => res.json(journey))
//     .catch(next);
// }
//
// function taskDeleteRoute(req, res, next) {
//   Journey
//     .findById(req.params.id)
//     .populate('user comments.user')
//     .exec()
//     .then(journey => {
//       const comment = journey.comments.id(req.params.commentId);
//       comment.remove();
//       return journey.save();
//     })
//     .then(journey => res.json(journey))
//     .catch(next);
// }

module.exports = {
  index: indexRoute,
  show: showRoute,
  checkPhotoTask: checkPhotoTaskRoute
  // create: createRoute,
  // update: updateRoute,
  // delete: deleteRoute,
  // createComment: taskCreateRoute,
  // deleteComment: taskDeleteRoute
};

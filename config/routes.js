const router = require('express').Router();
const paintingsController = require('../controllers/paintings');
const authController = require('../controllers/auth');
const artistsController = require('../controllers/artists');
const usersController = require('../controllers/users');
const journeysController = require('../controllers/journeys');
const artsyController = require('../controllers/artsy');
const secureRoute = require('../lib/secureRoute');

router.route('/paintings')
  .get(paintingsController.index)
  .post(secureRoute, paintingsController.create);


router.route('/paintings/checkmatching')
  //.post(secureRoute, paintingsController.create);
  .post(paintingsController.checkMatching);

router.route('/paintings/:id')
  .get(paintingsController.show)
  .put(secureRoute, paintingsController.update)
  .delete(secureRoute, paintingsController.delete);

router.post('/paintings/:id/comments', secureRoute, paintingsController.createComment);
router.delete('/paintings/:id/comments/:commentId', secureRoute, paintingsController.deleteComment);

router.post('/register', authController.register);
router.post('/login', authController.login);

router.route('/user/:id')
  .get(secureRoute, usersController.show)
  .put(secureRoute, usersController.update);

router.route('/artists')
  .get(artistsController.index)
  .post(secureRoute, artistsController.create);

router.route('/artists/:id')
  .get(artistsController.show)
  .put(secureRoute, artistsController.update)
  .delete(secureRoute, artistsController.delete);


router.route('/journeys')
  .get(journeysController.index);

router.route('/journeys/:id')
  .get(journeysController.show);

router.get('/artsy/artists', artsyController.artistsIndex);


router.route('/*')
  .all((req, res) => res.sendStatus(404));

module.exports = router;

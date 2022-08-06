const router = require('express').Router();

const userController = require('./controllers/userController');
const figureController = require('./controllers/figureController');


router.use('/users', userController);
router.use('/figures', figureController)

module.exports = router;
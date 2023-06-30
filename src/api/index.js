const router = require('express').Router();

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const pushes = require('../pushes/pushes.routes');
const ecosystem = require('./_ecosystem');
const shelldues = require('./shelldues/shelldues.routes');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const {
    isAdmin,
    isManager,
    isDeveloper,
    isSupport
  } = require('../middlewares/role.middleware');

router.use('/auth', auth);
router.use('/users', users);
router.use('/pushes', pushes);
router.use('/e', isAuthenticated, ecosystem);
router.use('/shelldues', shelldues);

module.exports = router;
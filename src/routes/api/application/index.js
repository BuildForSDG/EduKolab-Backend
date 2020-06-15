// Module imports
const router = require('express').Router();

// Custom module imports
const auth = require('../../auth');
const post = require('./post');
const get = require('./get');
const del = require('./del');

// Auth routes
router.post('/', auth.optional, post);
router.get('/', auth.required, get);
router.delete('/', auth.required, del);

router.get('/:userID', require('./userID/get'));
router.delete('/:userID', require('./userID/del'));
router.put('/:userID', require('./userID/put'));

// Export Route
module.exports = router;

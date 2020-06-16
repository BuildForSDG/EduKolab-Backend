// Module imports
const router = require('express').Router();

// Custom module imports
const auth = require('../../auth');
const post = require('./post');
const get = require('./get');
const del = require('./del');

// Auth routes
router.post('/', auth.required, post);
router.get('/', auth.required, get);
router.delete('/', auth.required, del);

router.get('/:responseID', auth.required, require('./responseID/get'));
router.delete('/:responseID', auth.required, require('./responseID/del'));
router.put('/:responseID', auth.required, require('./responseID/put'));

// Export Route
module.exports = router;

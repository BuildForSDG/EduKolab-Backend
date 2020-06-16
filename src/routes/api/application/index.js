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

router.get('/:applicationID', auth.required, require('./applicationID/get'));
router.delete('/:applicationID', auth.required, require('./applicationID/del'));
router.put('/:applicationID', auth.required, require('./applicationID/put'));

// Export Route
module.exports = router;

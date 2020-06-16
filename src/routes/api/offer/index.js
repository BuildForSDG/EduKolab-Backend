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

router.get('/:offerID', auth.required, require('./offerID/get'));
router.delete('/:offerID', auth.required, require('./offerID/del'));
router.put('/:offerID', auth.required, require('./offerID/put'));

// Export Route
module.exports = router;

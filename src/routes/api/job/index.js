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

router.get('/:jobID', auth.required, require('./jobID/get'));
router.delete('/:jobID', auth.required, require('./jobID/del'));
router.put('/:jobID', auth.required, require('./jobID/put'));

// Export Route
module.exports = router;

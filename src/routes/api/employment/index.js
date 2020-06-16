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

router.get('/:employmentID', auth.required, require('./employmentID/get'));
router.delete('/:employmentID', auth.required, require('./employmentID/del'));
router.put('/:employmentID', auth.required, require('./employmentID/put'));

// Export Route
module.exports = router;

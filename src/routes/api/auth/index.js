// Module imports
const router = require('express').Router();

// Custom module imports
const auth = require('../../auth');
const login = require('./login');

// Auth routes
router.post('/', auth.optional, login);

// Export Route
module.exports = router;

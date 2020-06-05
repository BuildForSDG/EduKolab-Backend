// Module ikmports
const router = require('express').Router();

// Custom module imports
const auth = require('../../auth');
const login = require('./login');
const register = require('./register');

// Auth routes
router.post('/register', auth.optional, register);
router.post('/login', auth.optional, login);

// Export Route
module.exports = router;

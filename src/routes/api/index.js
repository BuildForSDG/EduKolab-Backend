// Module imports
const express = require('express');

// Router
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/job', require('./job'));
router.use('/user', require('./user'));

// Export API route
module.exports = router;

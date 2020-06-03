// Module imports
const express = require('express');

// Router
const router = express.Router();

router.use('/auth', require('./auth'));

// Export API route
module.exports = router;

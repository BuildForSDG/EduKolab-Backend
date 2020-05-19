const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controller/auth');

const router = express.Router();

router.post(
  '/signup',
  [
    body('fullName')
      .trim()
      .not()
      .isEmpty(),
    body('phoneNumber')
      .trim()
      .not()
      .isLength({ min: 9 })
      .isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      // eslint-disable-next-line no-unused-vars,consistent-return
      .custom((value) => User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('E-Mail address already exists!');
        }
      }))
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;

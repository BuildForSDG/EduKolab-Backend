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
      .isLength({ min: 9 }).withMessage('Phone Number must be 9 characters.')
      // eslint-disable-next-line consistent-return
      .custom((value) => User.findOne({ phoneNumber: value }).then((userDoc) => {
        if (userDoc) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('Phone Number already exists');
        }
      }))
      .notEmpty(),
    body('email', 'Email address is mandatory!')
      .isEmail()
      .trim()
      .withMessage('Please enter a valid email.')
      // eslint-disable-next-line no-unused-vars,consistent-return
      .custom((value) => User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('E-Mail address already exists!');
        }
      }))
      .normalizeEmail(),
    body('password', 'Password is mandatory!')
      .trim()
      .isLength({ min: 6 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/, 'i')
      .withMessage('Password must contain at least a capital letter.')
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;

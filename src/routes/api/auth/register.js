// Module imports
const validator = require('validator');

// Mongoose model imports
const Users = require('../../../models/Users');

// Module export
module.exports = (req, res) => {
  const user = req.body;
  const {
    firstName, familyName, email, phone, password, confirmPassword, userType
  } = user;

  if (!firstName || !familyName || !email || !phone || !password || !confirmPassword || !userType) {
    res.status(400).send({
      data: null,
      message: 'All fields are required',
      error: true
    });
  }

  // Email validation
  if (!validator.isEmail(email)) {
    res.status(400).send({
      data: null,
      message: 'Email is invalid',
      error: true
    });
  }

  // Mobile number validation
  if (!validator.isMobilePhone(phone, 'en-NG')) {
    res.status(400).send({
      data: null,
      message: 'Phone number is invalid',
      error: true
    });
  }

  // Password validation
  if (!/\d/.test(password)) {
    res.status(400).send({
      data: null,
      message: 'Password must contain a number',
      error: true
    });
  } else if (!/[A-Z]/.test(password)) {
    res.status(400).send({
      data: null,
      message: 'Password must contain an upperCase letter',
      error: true
    });
  } else if (password.length < 6) {
    res.status(400).send({
      data: null,
      message: 'Password must be at least 6 characters long',
      error: true
    });
  }

  // ConfirmPassword validation
  if (password !== confirmPassword) {
    res.status(400).send({
      data: null,
      message: 'Passwords do not match',
      error: true
    });
  }

  // userType validation
  if (!['UT', 'UEG', 'UEGW', 'UESR', 'UPCB', 'UPTB', 'UPCTB'].includes(userType)) {
    res.status(400).send({
      data: null,
      message: 'userType selection is invalid',
      error: true
    });
  }

  // Check if user already exists
  Users.findOne({ email, isDeleted: false })
    .then((found) => {
      if (found) {
        return res.status(401).send({
          data: null,
          message: 'a user with this email already exists',
          error: true
        });
      }

      const finalUser = new Users(user);

      // Set user password
      finalUser.setPassword(password);

      // Save user && return response
      return finalUser
        .save()
        .then(async (data) => res.status(200).send({
          data: data.toAuthJSON(),
          message: 'registration successful',
          error: false
        }))
        .catch((err) => res.status(500).send({
          data: null,
          message: err,
          error: true
        }));
    })
    .catch((err) => res.status(500).send({
      data: null,
      message: err,
      error: true
    }));
};

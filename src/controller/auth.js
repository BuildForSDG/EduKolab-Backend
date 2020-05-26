const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (request, response, next) => {
  const errors = body(request);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 400;
    error.data = errors.array();
    throw error;
  }
  const { fullName } = request.body;
  const { phoneNumber } = request.body;
  const { email } = request.body;
  const { password } = request.body;
  const { confirmPassword } = request.body;

  if (confirmPassword !== password) {
    const error = new Error('Password does not match');
    error.statusCode = 400;
    throw error;
  }
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        fullName,
        phoneNumber,
        email,
        password: hashedPw,
        confirmPassword
      });
      return user.save();
    })
    .then((result) => {
      // eslint-disable-next-line no-underscore-dangle
      response.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (request, response, next) => {
  const { email } = request.body;
  const { phoneNumber } = request.body;
  const { password } = request.body;
  let loadedUser;
  User.findOne({ email } || { phoneNumber })
    .then((user) => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          // eslint-disable-next-line no-underscore-dangle
          userId: loadedUser._id.toString()
        },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );
      // eslint-disable-next-line no-underscore-dangle
      response.status(200).json({ userId: loadedUser._id.toString(), token });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Validation Function

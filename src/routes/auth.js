const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (request, response) => {
  User.find({ email: request.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return response.status(409).json({
          message: 'Email address already exists!'
        });
      }
    });
  bcrypt.hash(request.body.password, 10, (error, hash) => {
    if (error) {
      return response.status(500).json({
        errorMsg: error
      });
    }
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      phoneNumber: request.body.phoneNumber,
      email: request.body.email,
      password: hash
    });
    user.save()
      .then((result) => {
        console.log(result);
        response.status(201).json({
          message: 'User created ok'
        });
      })
      .catch((errorReason) => {
        console.log(errorReason);
        response.status(500).json({
          errorMsg: errorReason
        });
      });
  });
});

router.post('/login', (request, response) => {
  User.find({ email: request.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return response.status(401).json({
          message: 'Auth failed'
        });
      }
      bcrypt.compare(request.body.password, user[0].password, (error, result) => {
        if (error) {
          return response.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          const key = jwt.sign({
            email: user[0].email,
            userId: user[0]._id
          }, process.env.JWT_KEY,
          {
            expiresIn: '1h'
          });
          return response.status(200).json({
            message: 'Login Successful',
            token: key
          });
        }
      });
    })
    .catch((errorReason) => {
      console.log(errorReason);
      response.status(500).json({
        errorMsg: errorReason
      });
    });
});

router.delete('/:userId', (request, response) => {
  User.remove({ id: request.params.userId })
    .exec()
    .then((result) => {
      console.log(result);
      response.status(200).json({
        message: 'User deleted'
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        errorMsg: error
      });
    });
});

module.exports = router;

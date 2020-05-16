const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const authRoutes = require('./routes/auth');


mongoose.connect(`mongodb+srv://test-user:${process.env.MONGO_ATLAS_PW}@cluster0-pcodi.mongodb.net/test?retryWrites=true&w=majority`, { userNewUrlParser: true, useUnifiedTopology: true });

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// eslint-disable-next-line consistent-return
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (request.method === 'OPTIONS') {
    response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return response.status(200).json({});
  }
  next();
});

app.use('/auth', authRoutes);

app.use((error, request, response) => {
  const status = error.statusCode || 500;
  const errorMessage = error.message;
  const errorData = error.data;
  response.status(status).json({ message: errorMessage, data: errorData });
});

module.exports = app;

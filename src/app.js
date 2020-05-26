const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { body } = require('express-validator');

const app = express();

const authRoutes = require('./routes/auth');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-pcodi.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(body());

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

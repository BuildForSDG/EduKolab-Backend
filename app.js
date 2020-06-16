// Module imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const formData = require('express-form-data');

// Route imports
const routes = require('./src/routes');

// Environment variables
require('dotenv').config();

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

// Import DB_URL
const { DB_URL } = process.env;

// Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

// Initiate our app
const app = express();
const port = process.env.PORT || 8008;

// Configure our app
app.use(cors());
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(formData.parse());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorHandler());
}

// Passport config
require('./src/config/passport');

// DB connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('debug', true);

// Routes
app.use(routes);

app.listen(port);

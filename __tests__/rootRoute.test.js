
const request = require('supertest');
const express = require('express');
const index = require('../src/routes/index.js');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', index);

test('index route works', (done) => {
  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect({ data: null, message: 'Incorrect Route', error: true })
    .expect(200, done);
});

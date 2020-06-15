// Mongoose model imports
const Jobs = require('../../../models/Jobs');

// Module export
module.exports = (req, res) => Jobs
  .find({ isDeleted: false })
  .then((data) => (data.length > 0 ? res.status(200).send({
    data,
    message: 'Jobs fetched successfully',
    error: false
  }) : res.status(404).send({
    data: null,
    message: 'No jobs found',
    error: true
  })))
  .catch((err) => res.status(500).send({
    data: null,
    message: err,
    error: true
  }));

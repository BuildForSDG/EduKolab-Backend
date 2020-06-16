// Mongoose model imports
const Applications = require('../../../models/Applications');

// Module export
module.exports = (req, res) => Applications.find({ isDeleted: false })
  .then((applications) => (applications.length > 0
    ? res.status(200).send({
      data: applications,
      message: 'Applications fetched successfully',
      error: false
    })
    : res.status(404).send({
      data: null,
      message: 'No applications found',
      error: true
    })))
  .catch((err) => res.status(500).send({
    data: null,
    message: err,
    error: true
  }));

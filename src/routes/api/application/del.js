// Mongoose model imports
const Applications = require('../../../models/Applications');

// Module export
module.exports = (req, res) => Applications
  .find({ isDeleted: false })
  .then((data) => (data.length < 1 ? res.status(404).send({
    data: null,
    message: 'No applications found',
    error: true
  }) : Applications.updateMany({ isDeleted: false }, { isDeleted: true })
    .then(() => {
      res.status(200).send({
        data,
        message: 'Applications deleted successfully',
        error: false
      });
    })
    .catch((err) => res.status(500).send({
      data: null,
      message: err,
      error: true
    }))
  ))
  .catch((err) => res.status(500).send({
    data: null,
    message: err,
    error: true
  }));

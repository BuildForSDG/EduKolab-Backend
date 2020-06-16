// Mongoose model imports
const Employments = require('../../../models/Employments');

// Module export
module.exports = (req, res) => Employments.find({ isDeleted: false })
  .then((employments) => (employments.length > 0
    ? res.status(200).send({
      data: employments,
      message: 'Employments fetched successfully',
      error: false
    })
    : res.status(404).send({
      data: null,
      message: 'No employments found',
      error: true
    })))
  .catch((err) => res.status(500).send({
    data: null,
    message: err,
    error: true
  }));

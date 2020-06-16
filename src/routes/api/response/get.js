// Mongoose model imports
const Responses = require('../../../models/Responses');

// Module export
module.exports = (req, res) => Responses.find({ isDeleted: false })
  .then((responses) => (responses.length > 0
    ? res.status(200).send({
      data: responses,
      message: 'Responses fetched successfully',
      error: false
    })
    : res.status(404).send({
      data: null,
      message: 'No responses found',
      error: true
    })))
  .catch((err) => res.status(500).send({
    data: null,
    message: err,
    error: true
  }));

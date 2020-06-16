// Mongoose model imports
const Responses = require('../../../models/Responses');

// Module export
module.exports = (req, res) => Responses
  .find({ isDeleted: false })
  .then((data) => (data.length < 1 ? res.status(404).send({
    data: null,
    message: 'No responses found',
    error: true
  }) : Responses.updateMany({ isDeleted: false }, { isDeleted: true })
    .then(() => {
      res.status(200).send({
        data,
        message: 'Responses deleted successfully',
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

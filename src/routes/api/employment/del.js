// Mongoose model imports
const Employments = require('../../../models/Employments');

// Module export
module.exports = (req, res) => Employments
  .find({ isDeleted: false })
  .then((data) => (data.length < 1 ? res.status(404).send({
    data: null,
    message: 'No employments found',
    error: true
  }) : Employments.updateMany({ isDeleted: false }, { isDeleted: true })
    .then(() => {
      res.status(200).send({
        data,
        message: 'Employments deleted successfully',
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

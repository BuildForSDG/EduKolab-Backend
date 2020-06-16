// Mongoose model imports
const Offers = require('../../../models/Offers');

// Module export
module.exports = (req, res) => Offers
  .find({ isDeleted: false })
  .then((data) => (data.length < 1 ? res.status(404).send({
    data: null,
    message: 'No Offers found',
    error: true
  }) : Offers.updateMany({ isDeleted: false }, { isDeleted: true })
    .then(() => {
      res.status(200).send({
        data,
        message: 'Offers deleted successfully',
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

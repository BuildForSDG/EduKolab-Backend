// Mongoose model imports
const Offers = require('../../../models/Offers');

// Module export
module.exports = (req, res) => Offers.find({ isDeleted: false })
  .then((offers) => (offers.length > 0
    ? res.status(200).send({
      data: offers,
      message: 'Offers fetched successfully',
      error: false
    })
    : res.status(404).send({
      data: null,
      message: 'No offers found',
      error: true
    })))
  .catch((err) => res.status(500).send({
    data: null,
    message: err,
    error: true
  }));

// Mongoose model imports
const Offers = require('../../../../models/Offers');

// Module export
module.exports = (req, res) => {
  const { offerID } = req.params;

  return Offers.findById(offerID)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(404).send({
          data: null,
          message: 'Offer not found',
          error: true
        });
      }

      Offers.findByIdAndUpdate(
        offerID,
        { ...req.body }, { new: true }
      )
        .then((offer) => res.status(200).send({
          data: offer,
          message: 'Offer updated successfully',
          error: false
        }))
        .catch((err) => res.status(500).send({
          data: null,
          message: err,
          error: true
        }));
    })
    .catch((err) => res.status(500).send({
      data: null,
      message: err,
      error: true
    }));
};

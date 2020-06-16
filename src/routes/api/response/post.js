// Mongoose model imports
const Offers = require('../../../models/Offers');
const Responses = require('../../../models/Responses');
const Users = require('../../../models/Users');

// Module export
module.exports = (req, res) => {
  const response = req.body;
  const { owner, offerID } = response;

  if (!offerID || !owner) {
    res.status(400).send({
      data: null,
      message: 'All fields are required',
      error: true
    });
  }

  // Password validation
  Users.findById(owner)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(404).send({
          data: null,
          message: 'Owner not found',
          error: true
        });
      }
    })
    .catch((err) => res.status(500).send({
      data: null,
      message: err,
      error: true
    }));

  // Password validation
  Offers.findById(offerID)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(404).send({
          data: null,
          message: 'Offer not found',
          error: true
        });
      }
    })
    .catch((err) => res.status(500).send({
      data: null,
      message: err,
      error: true
    }));

  // Check if user already exists
  Responses.findOne({ isDeleted: false, owner, offerID })
    .then((found) => {
      if (found) {
        return res.status(409).send({
          data: null,
          message: 'Offer already exists',
          error: true
        });
      }

      const finalResponse = new Responses(response);

      // Save user && return response
      return finalResponse
        .save()
        .then(async () => res.status(201).send({
          data: null,
          message: 'Response created successfully',
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

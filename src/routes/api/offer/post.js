// Mongoose model imports
const Applications = require('../../../models/Applications');
const Offers = require('../../../models/Offers');
const Users = require('../../../models/Users');

// Module export
module.exports = (req, res) => {
  const offer = req.body;
  const { duties, applicationID, owner } = offer;

  if (!duties || !owner) {
    res.status(400).send({
      data: null,
      message: 'All fields are required',
      error: true
    });
  }

  if (applicationID) {
    Applications.findById(applicationID)
      .then((data) => {
        if (data === null || (data && data.isDeleted === true)) {
          res.status(404).send({
            data: null,
            message: 'Application not found',
            error: true
          });
        }
      })
      .catch((err) => res.status(500).send({
        data: null,
        message: err,
        error: true
      }));
  }

  Users.findById(owner)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(424).send({
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

  // Check if user already exists
  Offers.findOne({ isDeleted: false, owner })
    .then((found) => {
      if (found && found.applicationID === applicationID) {
        return res.status(409).send({
          data: null,
          message: 'Offer already exists',
          error: true
        });
      }

      const finalOffer = new Offers(offer);

      // Save user && return response
      return finalOffer
        .save()
        .then(async () => res.status(201).send({
          data: null,
          message: 'Offer created successfully',
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

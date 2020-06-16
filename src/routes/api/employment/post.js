// Mongoose model imports
const Employments = require('../../../models/Employments');
const Responses = require('../../../models/Responses');
const Users = require('../../../models/Users');

// Module export
module.exports = (req, res) => {
  const employment = req.body;
  const { isAccepted, owner, responseID } = employment;

  if (!isAccepted || !responseID || !owner) {
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
  Responses.findById(responseID)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(404).send({
          data: null,
          message: 'Response not found',
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
  Employments.findOne({ isDeleted: false, owner, responseID })
    .then((found) => {
      if (found) {
        return res.status(409).send({
          data: null,
          message: 'Employment already exists',
          error: true
        });
      }

      const finalEmployment = new Employments(employment);

      // Save user && return response
      return finalEmployment
        .save()
        .then(async () => res.status(201).send({
          data: null,
          message: 'Employment created successfully',
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

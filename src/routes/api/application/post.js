// Mongoose model imports
const Applications = require('../../../models/Applications');
const Jobs = require('../../../models/Jobs');
const Users = require('../../../models/Users');

// Module export
module.exports = (req, res) => {
  const application = req.body;
  const { jobID, owner } = application;

  if (!jobID || !owner) {
    res.status(400).send({
      data: null,
      message: 'All fields are required',
      error: true
    });
  }

  Jobs.findById(jobID)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(404).send({
          data: null,
          message: 'Job not found',
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

  // Check if user already exists
  Applications.findOne({ isDeleted: false, jobID, owner })
    .then((found) => {
      if (found) {
        return res.status(409).send({
          data: null,
          message: 'Application already exists',
          error: true
        });
      }

      const finalApplication = new Applications(application);

      // Save user && return response
      return finalApplication
        .save()
        .then(async () => res.status(201).send({
          data: null,
          message: 'Application created successfully',
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

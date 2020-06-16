// Mongoose model imports
const Applications = require('../../../../models/Applications');

// Module export
module.exports = (req, res) => {
  const { applicationID } = req.params;

  return Applications.findById(applicationID)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(404).send({
          data: null,
          message: 'Application not found',
          error: true
        });
      }

      Applications.findByIdAndUpdate(
        applicationID,
        { ...req.body }, { new: true }
      )
        .then((application) => res.status(200).send({
          data: application,
          message: 'Application updated successfully',
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

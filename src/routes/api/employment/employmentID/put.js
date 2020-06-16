// Mongoose model imports
const Employments = require('../../../../models/Employments');

// Module export
module.exports = (req, res) => {
  const { employmentID } = req.params;

  return Employments.findById(employmentID)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(404).send({
          data: null,
          message: 'Employment not found',
          error: true
        });
      }

      Employments.findByIdAndUpdate(
        employmentID,
        { ...req.body }, { new: true }
      )
        .then((employment) => res.status(200).send({
          data: employment,
          message: 'Employment updated successfully',
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

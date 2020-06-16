// Mongoose model imports
const Jobs = require('../../../models/Jobs');

// Module export
module.exports = (req, res) => Jobs
  .find({ isDeleted: false })
  .then((data) => (data.length < 1 ? res.status(404).send({
    data: null,
    message: 'No jobs found',
    error: true
  }) : Jobs.updateMany({ isDeleted: false }, { isDeleted: true })
    .then(() => {
      res.status(200).send({
        data,
        message: 'Jobs deleted successfully',
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

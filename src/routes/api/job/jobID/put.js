// Mongoose model imports
const Jobs = require('../../../../models/Jobs');

// Module export
module.exports = (req, res) => {
  const { jobID } = req.params;

  return Jobs.findById(jobID)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(404).send({
          data: null,
          message: 'Job not found',
          error: true
        });
      }

      Jobs.findByIdAndUpdate(
        jobID,
        { ...req.body }, { new: true }
      )
        .then((job) => res.status(200).send({
          data: job,
          message: 'Job updated successfully',
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

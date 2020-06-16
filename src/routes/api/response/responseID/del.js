// Mongoose model imports
const Responses = require('../../../../models/Responses');

// Module export
module.exports = (req, res) => {
  const { responseID } = req.params;

  return Responses.findById(responseID)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(404).send({
          data: null,
          message: 'Response not found',
          error: true
        });
      }
      Responses.findByIdAndUpdate(responseID, { isDeleted: true }, { upsert: false })
        .then(() => res.status(200).send({
          data,
          message: 'Response deleted successfully',
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

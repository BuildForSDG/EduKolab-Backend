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

      Responses.findByIdAndUpdate(
        responseID,
        { ...req.body }, { new: true }
      )
        .then((response) => res.status(200).send({
          data: response,
          message: 'Response updated successfully',
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

// Mongoose model imports
const Users = require('../../../../models/Users');

// Module export
module.exports = (req, res) => {
  const { userID } = req.params;

  return Users.findById(userID)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(404).send({
          data: null,
          message: 'User not found',
          error: true
        });
      }
      Users.findByIdAndUpdate(userID, { isDeleted: true }, { upsert: false })
        .then(() => res.status(200).send({
          data,
          message: 'User deleted successfully',
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

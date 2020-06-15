// Mongoose model imports
const Users = require('../../../models/Users');

// Module export
module.exports = (req, res) => Users
  .find({ isDeleted: false }, { hash: 0, salt: 0 })
  .then((data) => (data.length < 1 ? res.status(404).send({
    data: null,
    message: 'No users found',
    error: true
  }) : Users.updateMany({ isDeleted: false }, { isDeleted: true })
    .then(() => {
      res.status(200).send({
        data,
        message: 'Users deleted successfully',
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

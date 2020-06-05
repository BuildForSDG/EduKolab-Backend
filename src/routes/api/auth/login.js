// Mongoose model imports
const Users = require('../../../models/Users');

// Module export
module.exports = (req, res) => {
  const { body } = req;
  const { email, password } = body;

  if (!password || !email) {
    res.status(400).send({
      data: null,
      message: 'email and password are required',
      error: true
    });
  }

  return Users.findOne({ email, isDeleted: false })
    .then((user) => (user && user.validatePassword(password)
      ? res.status(200).send({
        data: user.toAuthJSON(),
        message: 'login successful',
        error: false
      })
      : res.status(404).send({
        data: null,
        message: 'email or password is incorrect',
        error: true
      })));
};

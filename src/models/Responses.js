// Module imports
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Mongoose Schema
const { Schema } = mongoose;

// Mongoose Job Schema
const ResponsesSchema = new Schema(
  {
    isBlocked: {
      default: false,
      type: Boolean
    },
    isDeleted: {
      default: false,
      type: Boolean
    },
    message: String,
    offerID: { required: true, type: String },
    owner: { required: true, type: String }
  },
  {
    timestamps: true
  }
);

ResponsesSchema.methods.generateJWT = function d3() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      owner: this.owner,
      id: this.id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    'secret'
  );
};

ResponsesSchema.methods.toAuthJSON = function d4() {
  return {
    id: this.id,
    message: this.message,
    offerID: this.offerID,
    owner: this.owner
  };
};

// Export Schema Model
module.exports = mongoose.model('Responses', ResponsesSchema);

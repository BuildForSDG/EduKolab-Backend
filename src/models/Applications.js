// Module imports
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Mongoose Schema
const { Schema } = mongoose;

// Mongoose User Schema
const ApplicationsSchema = new Schema(
  {
    isBlocked: {
      default: false,
      type: Boolean
    },
    isDeleted: {
      default: false,
      type: Boolean
    },
    jobID: { required: true, type: String },
    owner: { required: true, type: String }
  },
  {
    timestamps: true
  }
);

ApplicationsSchema.methods.generateJWT = function d3() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this.id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    'secret'
  );
};

ApplicationsSchema.methods.toAuthJSON = function d4() {
  return {
    id: this.id,
    jobID: this.jobID,
    owner: this.owner
  };
};

// Export Schema Model
module.exports = mongoose.model('Applications', ApplicationsSchema);

// Module imports
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Mongoose Schema
const { Schema } = mongoose;

// Mongoose Job Schema
const EmploymentsSchema = new Schema(
  {
    isAccepted: {
      required: true,
      default: false,
      type: Boolean
    },
    isBlocked: {
      default: false,
      type: Boolean
    },
    isDeleted: {
      default: false,
      type: Boolean
    },
    owner: { required: true, type: String },
    responseID: { required: true, type: String }
  },
  {
    timestamps: true
  }
);

EmploymentsSchema.methods.generateJWT = function d3() {
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

EmploymentsSchema.methods.toAuthJSON = function d4() {
  return {
    id: this.id,
    isAccepted: this.isAccepted,
    owner: this.owner,
    responseID: this.responseID
  };
};

// Export Schema Model
module.exports = mongoose.model('Employments', EmploymentsSchema);

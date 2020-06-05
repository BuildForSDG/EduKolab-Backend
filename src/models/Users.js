// Module imports
const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Mongoose Schema
const { Schema } = mongoose;

// Mongoose User Schema
const UsersSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    familyName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      }
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value, 'en-NG')) {
          throw new Error('Phone number is invalid');
        }
      }
    },
    userType: {
      type: String,
      enum: ['UT', 'UEG', 'UEGW', 'UESR', 'UPCB', 'UPTB', 'UPCTB'],
      required: true
    },
    hash: String,
    salt: String,
    isDeleted: {
      default: false,
      type: Boolean
    },
    isVerified: {
      default: false,
      type: Boolean
    },
    isBlocked: {
      default: false,
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

UsersSchema.methods.getPassword = (password) => ({
  salt: crypto.randomBytes(16).toString('hex'),
  hash: crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
});

UsersSchema.methods.setPassword = function d1(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function d2(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function d3() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this.id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    'secret'
  );
};

UsersSchema.methods.toAuthJSON = function d4() {
  return {
    id: this.id,
    firstName: this.firstName,
    familyName: this.familyName,
    email: this.email,
    phone: this.phone,
    userType: this.userType,
    token: this.generateJWT()
  };
};


// Export Schema Model
module.exports = mongoose.model('Users', UsersSchema);

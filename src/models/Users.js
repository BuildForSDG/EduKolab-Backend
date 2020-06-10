// Module imports
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Mongoose Schema
const { Schema } = mongoose;

// Mongoose User Schema
const UsersSchema = new Schema(
  {
    address: { type: String },
    age: { type: Number, min: 18, max: 65 },
    careerInterests: [{
      schoolNames: [{ type: String }],
      subjects: [{
        gradeLevels: [{
          type: String,
          enum: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12']
        }],
        subjectName: { type: String }
      }]
    }],
    currentEmployments: [{
      schoolName: { type: String },
      schoolAddress: { type: String },
      schoolState: {
        type: String,
        enum: [
          'Abia',
          'Adamawa',
          'Akwa Ibom',
          'Anambra',
          'Bauchi',
          'Bayelsa',
          'Benue',
          'Borno',
          'Cross River',
          'Delta',
          'Ebonyi',
          'Edo',
          'Ekiti',
          'Enugu',
          'FCT - Abuja',
          'Gombe',
          'Imo',
          'Jigawa',
          'Kaduna',
          'Kano',
          'Katsina',
          'Kebbi',
          'Kogi',
          'Kwara',
          'Lagos',
          'Nasarawa',
          'Niger',
          'Ogun',
          'Ondo',
          'Osun',
          'Oyo',
          'Plateau',
          'Rivers',
          'Sokoto',
          'Taraba',
          'Yobe',
          'Zamfara'
        ]
      },
      subjectsTaught: [{
        gradeLevels: [{
          type: String,
          enum: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12']
        }],
        subjectName: { type: String }
      }],
      employerEmail: {
        type: String,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      },
      employerPhone: {
        type: String,
        match: /^[234]\d{12}$/
      },
      isVerified: { type: Boolean, default: false }
    }],
    disabilities: [{ type: String }],
    disabilitiesExperiencedWith: [{ type: String }],
    email: {
      type: String,
      match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      required: true,
      unique: true,
      trim: true
    },
    familyName: {
      type: String,
      required: true,
      trim: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE']
    },
    gradeLevel: {
      type: String,
      enum: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12']
    },
    hash: String,
    highestCompletedEducationLevel: {
      certificate: { type: String },
      name: {
        type: String,
        enum: ['FSLC', 'WASSCE', 'OND', 'HND', 'Undergraduate', 'Masters', 'PHD']
      }
    },
    image: { type: String },
    isBlocked: {
      default: false,
      type: Boolean
    },
    isDeleted: {
      default: false,
      type: Boolean
    },
    isEmployed: Boolean,
    isInNeedOfCareerChange: Boolean,
    isVerified: {
      default: false,
      type: Boolean
    },
    phone: {
      type: String,
      match: /^[234]\d{12}$/,
      unique: true,
      trim: true
    },
    resume: { type: String },
    role: {
      type: String,
      enum: [
        'Parent',
        'Relation',
        'Family Friend',
        'Principal',
        'Vice-Principal',
        'HeadMaster',
        'HeadMistress',
        'HeadTeacher'
      ]
    },
    salt: String,
    schools: [{
      id: { type: String },
      isStudentsMixed: { type: Boolean, default: false },
      isTeachersMixed: { type: Boolean, default: false },
      isVerified: { type: Boolean, default: false },
      schoolAddress: { type: String },
      schoolEmail: {
        type: String,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      },
      schoolName: { type: String },
      schoolPhone: {
        type: String,
        match: /^[234]\d{12}$/
      },
      schoolState: {
        type: String,
        enum: [
          'Abia',
          'Adamawa',
          'Akwa Ibom',
          'Anambra',
          'Bauchi',
          'Bayelsa',
          'Benue',
          'Borno',
          'Cross River',
          'Delta',
          'Ebonyi',
          'Edo',
          'Ekiti',
          'Enugu',
          'FCT - Abuja',
          'Gombe',
          'Imo',
          'Jigawa',
          'Kaduna',
          'Kano',
          'Katsina',
          'Kebbi',
          'Kogi',
          'Kwara',
          'Lagos',
          'Nasarawa',
          'Niger',
          'Ogun',
          'Ondo',
          'Osun',
          'Oyo',
          'Plateau',
          'Rivers',
          'Sokoto',
          'Taraba',
          'Yobe',
          'Zamfara'
        ]
      },
      schoolWebsite: {
        type: String,
        match: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/
      },
      subjects: [{
        gradeList: [{
          type: String,
          enum: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12']
        }],
        id: { type: String },
        isStudentsMixed: { type: Boolean, default: false },
        school: { type: String },
        subjectName: { type: String },
        subjectStudentDisabilities: [{ type: String }],
        subjectStudentNumber: Number,
        subjectTeacher: String
      }]
    }],
    state: {
      type: String,
      enum: [
        'Abia',
        'Adamawa',
        'Akwa Ibom',
        'Anambra',
        'Bauchi',
        'Bayelsa',
        'Benue',
        'Borno',
        'Cross River',
        'Delta',
        'Ebonyi',
        'Edo',
        'Ekiti',
        'Enugu',
        'FCT - Abuja',
        'Gombe',
        'Imo',
        'Jigawa',
        'Kaduna',
        'Kano',
        'Katsina',
        'Kebbi',
        'Kogi',
        'Kwara',
        'Lagos',
        'Nasarawa',
        'Niger',
        'Ogun',
        'Ondo',
        'Osun',
        'Oyo',
        'Plateau',
        'Rivers',
        'Sokoto',
        'Taraba',
        'Yobe',
        'Zamfara'
      ]
    },
    subjectList: [{
      type: String
    }],
    userType: {
      type: String,
      enum: ['UT', 'UEG', 'UEGW', 'UESR', 'UPCB', 'UPTB', 'UPCTB'],
      required: true
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

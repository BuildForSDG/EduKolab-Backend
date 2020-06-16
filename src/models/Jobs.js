// Module imports
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Mongoose Schema
const { Schema } = mongoose;

// Mongoose Job Schema
const JobsSchema = new Schema(
  {
    details: { required: true, type: String },
    isBlocked: {
      default: false,
      type: Boolean
    },
    isDeleted: {
      default: false,
      type: Boolean
    },
    isMixed: { required: true, type: Boolean, default: false },
    owner: { required: true, type: String },
    teacherAge: {
      required: true, type: Number, min: 18, max: 65
    },
    teacherDisabilitiesExperiencedWith: [{ type: String }],
    teacherGender: {
      type: String,
      enum: ['MALE', 'FEMALE']
    },
    teacherHighestCompletedEducationLevelName: {
      required: true,
      type: String,
      enum: ['FSLC', 'WASSCE', 'OND', 'HND', 'Undergraduate', 'Masters', 'PHD']
    },
    teacherIsEmployed: { type: Boolean, default: false },
    teacherIsInNeedOfCareerChange: { type: Boolean, default: false },
    teacherStudentCapacity: {
      required: true,
      type: Number,
      min: 1
    },
    teacherSubjectsTaught: [
      {
        gradeLevels: [
          {
            type: String,
            enum: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12']
          }
        ],
        subjectName: String
      }
    ],
    title: { required: true, type: String }
  },
  {
    timestamps: true
  }
);

JobsSchema.methods.generateJWT = function d3() {
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

JobsSchema.methods.toAuthJSON = function d4() {
  return {
    id: this.id,
    owner: this.owner,
    title: this.title,
    details: this.details
  };
};

// Export Schema Model
module.exports = mongoose.model('Jobs', JobsSchema);

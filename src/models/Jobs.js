// Module imports
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Mongoose Schema
const { Schema } = mongoose;

// Mongoose Job Schema
const JobsSchema = new Schema(
  {
    details: String,
    isBlocked: {
      default: false,
      type: Boolean
    },
    isDeleted: {
      default: false,
      type: Boolean
    },
    isMixed: { type: Boolean, default: false },
    isVerified: {
      default: false,
      type: Boolean
    },
    owner: String,
    studentNumber: {
      type: Number,
      min: 1
    },
    teacherAge: { type: Number, min: 18, max: 65 },
    teacherCareerInterest: [
      {
        schoolNames: [{ type: String }],
        subjects: [
          {
            gradeLevels: [
              {
                type: String,
                enum: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12']
              }
            ],
            subjectName: { type: String }
          }
        ]
      }
    ],
    teacherDisabilitiesExperiencedWith: [{ type: String }],
    teacherGender: {
      type: String,
      enum: ['MALE', 'FEMALE']
    },
    teacherHighestCompletedEducationLevelName: {
      certificate: { type: String },
      name: {
        type: String,
        enum: ['FSLC', 'WASSCE', 'OND', 'HND', 'Undergraduate', 'Masters', 'PHD']
      }
    },
    teacherIsEmployed: Boolean,
    teacherIsInNeedOfCareerChange: Boolean,
    teacherStudentCapacity: {
      type: Number
    },
    teacherSubjectsTaught: [
      {
        gradeLevels: [
          {
            type: String,
            enum: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12']
          }
        ],
        subjectName: { type: String }
      }
    ]
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
    details: this.details
  };
};

// Export Schema Model
module.exports = mongoose.model('Jobs', JobsSchema);

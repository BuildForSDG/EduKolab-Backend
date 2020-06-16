// Module imports
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Mongoose Schema
const { Schema } = mongoose;

// Mongoose Job Schema
const OffersSchema = new Schema(
  {
    applicationID: String,
    duties: {
      subjects: [{
        gradeList: {
          required: true,
          type: [{
            type: String,
            enum: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12']

          }]
        },
        isStudentsMixed: { required: true, type: Boolean },
        school: {
          required: true,
          type: {
            isStudentsMixed: Boolean,
            isTeachersMixed: Boolean,
            isVerified: Boolean,
            schoolAddress: String,
            schoolEmail: {
              type: String,
              match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              unique: true,
              trim: true
            },
            schoolName: { required: true, type: String },
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
            }
          }
        },
        subjectName: { required: true, type: String },
        subjectStudentDisabilities: {
          required: true,
          type: [{
            type: String
          }]
        },
        subjectStudentNumber: { required: true, type: Number },
        subjectTeacher: { required: true, type: String }
      }],
      wards: [{
        age: { type: Number, min: 18, max: 65 },
        disabilities: [{ type: String }],
        gender: {
          type: String,
          enum: ['MALE', 'FEMALE']
        },
        gradeLevel: {
          type: String,
          enum: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12']
        },
        subjectList: [{
          type: String
        }]
      }]
    },
    isBlocked: {
      default: false,
      type: Boolean
    },
    isDeleted: {
      default: false,
      type: Boolean
    },
    message: String,
    owner: { required: true, type: String }
  },
  {
    timestamps: true
  }
);

OffersSchema.methods.generateJWT = function d3() {
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

OffersSchema.methods.toAuthJSON = function d4() {
  return {
    id: this.id,
    applicationID: this.applicationID,
    duties: this.duties,
    message: this.message,
    owner: this.owner
  };
};

// Export Schema Model
module.exports = mongoose.model('Offers', OffersSchema);

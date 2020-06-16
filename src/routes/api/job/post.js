// Mongoose model imports
const Jobs = require('../../../models/Jobs');
const Users = require('../../../models/Users');

// Module export
module.exports = (req, res) => {
  const job = req.body;
  const {
    teacherAge,
    teacherHighestCompletedEducationLevelName,
    teacherStudentCapacity,
    teacherSubjectsTaught,
    isMixed,
    details,
    owner,
    title
  } = job;

  if (
    !teacherAge
    || !teacherHighestCompletedEducationLevelName
    || !teacherStudentCapacity
    || !teacherSubjectsTaught
    || !isMixed
    || !details
    || !owner
    || !title
  ) {
    res.status(400).send({
      data: null,
      message: 'All fields are required',
      error: true
    });
  }

  // Email validation
  if (teacherAge < 18 || teacherAge > 65) {
    res.status(400).send({
      data: null,
      message: 'Age is supposed to be between 18 & 65',
      error: true
    });
  }

  // Mobile number validation
  if (
    !['FSLC', 'WASSCE', 'OND', 'HND', 'Undergraduate', 'Masters', 'PHD'].includes(
      teacherHighestCompletedEducationLevelName
    )
  ) {
    res.status(400).send({
      data: null,
      message:
        'Highest Completed Education Name is supposed to be either FSLC, WASSCE, OND, HND, Undergraduate, Masters or PHD',
      error: true
    });
  }

  // Password validation
  Users.findById(owner)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(404).send({
          data: null,
          message: 'Owner not found',
          error: true
        });
      }
    })
    .catch((err) => res.status(500).send({
      data: null,
      message: err,
      error: true
    }));

  // Check if user already exists
  Jobs.findOne({ isDeleted: false, owner, title })
    .then((found) => {
      if (found) {
        return res.status(409).send({
          data: null,
          message: 'Job already exists',
          error: true
        });
      }

      const finalJob = new Jobs(job);

      // Save user && return response
      return finalJob
        .save()
        .then(async () => res.status(201).send({
          data: null,
          message: 'Job created successfully',
          error: false
        }))
        .catch((err) => res.status(500).send({
          data: null,
          message: err,
          error: true
        }));
    })
    .catch((err) => res.status(500).send({
      data: null,
      message: err,
      error: true
    }));
};

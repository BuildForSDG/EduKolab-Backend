// Mongoose model imports
const Jobs = require('../../../models/Jobs');
const Users = require('../../../models/Users');

// Module export
module.exports = async (req, res) => {
  const teacher = await Users.findById(req.query.teacherID);

  const {
    age,
    disabilitiesExperiencedWith,
    gender,
    highestCompletedEducationLevel,
    isEmployed,
    isInNeedOfCareerChange,
    studentCapacity,
    currentEmployments
  } = teacher;

  const highestCompletedEducationLevelName = highestCompletedEducationLevel
  && highestCompletedEducationLevel.name;

  const { subjectsTaught } = currentEmployments;

  return Jobs.find({ isDeleted: false })
    .then((data) => {
      let jobs = data;

      if (age) {
        jobs = jobs.filter((job) => job.teacherAge >= age);
      }

      if (disabilitiesExperiencedWith) {
        jobs = jobs.filter((job) => disabilitiesExperiencedWith.map(
          (val) => (job.teacherDisabilitiesExperiencedWith.includes(val) ? val : null)
            .filter((item) => item !== null)
            .length > 0
        ));
      }

      if (gender) {
        jobs = jobs.filter((job) => job.teacherGender === gender);
      }

      if (highestCompletedEducationLevelName) {
        const array = ['FSLC', 'WASSCE', 'OND', 'HND', 'Undergraduate', 'Masters', 'PHD'];

        jobs = jobs.map((job) => {
          const index1 = array.indexOf(highestCompletedEducationLevelName);
          const index2 = array.indexOf(job.teacherHighestCompletedEducationLevelName);
          if (index1 >= index2) {
            return job;
          }
          return null;
        });
      }

      if (isEmployed) {
        jobs = jobs.filter((job) => job.teacherIsEmployed === isEmployed);
      }

      if (isInNeedOfCareerChange) {
        jobs = jobs.filter(
          (job) => job.teacherIsInNeedOfCareerChange === isInNeedOfCareerChange
        );
      }

      if (studentCapacity) {
        jobs = jobs.filter((job) => studentCapacity >= job.teacherStudentCapacity);
      }

      if (subjectsTaught) {
        jobs = jobs.filter(
          (job) => job.teacherSubjectsTaught.subjectName === subjectsTaught.subjectName
            && subjectsTaught.gradeLevels.map(
              (val) => (
                job.teacherSubjectsTaught.gradeLevels.includes(val) ? val : null)
                .filter((item) => item !== null)
                .length > 0
            )
        );
      }

      return jobs.length > 0
        ? res.status(200).send({
          data: jobs,
          message: 'Jobs fetched successfully',
          error: false
        })
        : res.status(404).send({
          data: null,
          message: 'No jobs found',
          error: true
        });
    })
    .catch((err) => res.status(500).send({
      data: null,
      message: err,
      error: true
    }));
};

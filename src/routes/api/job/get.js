// Mongoose model imports
const Jobs = require('../../../models/Jobs');

// Module export
module.exports = (req, res) => {
  const filters = req.query;

  const {
    teacherAge,
    teacherDisabilitiesExperiencedWith,
    teacherGender,
    teacherHighestCompletedEducationLevelName,
    teacherIsEmployed,
    teacherIsInNeedOfCareerChange,
    teacherStudentCapacity,
    teacherSubjectsTaught
  } = filters;

  return Jobs.find({ isDeleted: false })
    .then((data) => {
      let jobs = data;

      if (teacherAge) {
        jobs = jobs.filter((job) => job.teacherAge >= teacherAge);
      }

      if (teacherDisabilitiesExperiencedWith) {
        jobs = jobs.filter((job) => teacherDisabilitiesExperiencedWith.map(
          (val) => (job.teacherDisabilitiesExperiencedWith.includes(val) ? val : null)
            .filter((item) => item !== null)
            .length > 0
        ));
      }

      if (teacherGender) {
        jobs = jobs.filter((job) => job.teacherGender === teacherGender);
      }

      if (teacherHighestCompletedEducationLevelName) {
        const array = ['FSLC', 'WASSCE', 'OND', 'HND', 'Undergraduate', 'Masters', 'PHD'];

        jobs = jobs.map((job) => {
          const index1 = array.indexOf(teacherHighestCompletedEducationLevelName);
          const index2 = array.indexOf(job.teacherHighestCompletedEducationLevelName);
          if (index1 >= index2) {
            return job;
          }
          return null;
        });
      }

      if (teacherIsEmployed) {
        jobs = jobs.filter((job) => job.teacherIsEmployed === teacherIsEmployed);
      }

      if (teacherIsInNeedOfCareerChange) {
        jobs = jobs.filter(
          (job) => job.teacherIsInNeedOfCareerChange === teacherIsInNeedOfCareerChange
        );
      }

      if (teacherStudentCapacity) {
        jobs = jobs.filter((job) => teacherStudentCapacity >= job.teacherStudentCapacity);
      }

      if (teacherSubjectsTaught) {
        jobs = jobs.filter(
          (job) => job.teacherSubjectsTaught.subjectName === teacherSubjectsTaught.subjectName
            && teacherSubjectsTaught.gradeLevels.map(
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

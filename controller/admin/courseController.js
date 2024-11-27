const COURSE = require("../../model/courseModel");
const error = require("../../utils/error");

exports.getCourse = async (req, res) => {
  try {
      const courseId = req.params.id;
      const course = await COURSE.findOne({_id: courseId,publish:true})
          .populate('quizzes')
          .populate('assessments')
          .populate('modules')
          .populate('instructor');

      if (!course) {
          return res.status(error.status.NotFound).send({
              message: "Course not found",
              status: error.status.NotFound,
          });
      }

      return res.status(error.status.OK).send({
          message: "Course retrieved successfully",
          status: error.status.OK,
          data: course
      });
  } catch (e) {
      return res.status(error.status.InternalServerError).json({
          message: e.message,
          status: error.status.InternalServerError,
      });
  }
};



exports.addCourse = async (req, res) => {
  try {
      const {
        courseImage,
        title,
        description,
        price,
        courseDoc,
        jobRole,
        courseInclude,
        benefits,
      } = req.body;
      const courseData = {
        title,
        courseImage,
        description,
        price,
        courseDoc,
        jobRole,
        courseInclude,
        benefits,
      };
      const create = await COURSE.create(courseData);
      if (create) {
          return res.status(error.status.OK).send({
              message: "Course Created.",
              status: error.status.OK,
              data: create
          });
      }
  } catch (e) {
      return res.status(error.status.InternalServerError).json({
          message: e.message,
          status: error.status.InternalServerError,
      });
  }
};

exports.editCourse = async (req, res) => {
  try {
      const arrayOfEditKeys = [
        "quizzes",
        "assessments",
        "modules",
        "instructor",
        "title",
        "courseImage",
        "description",
        "price",
        "courseDoc",
        "publish",
        "jobRole",
        "courseInclude",
        "benefits",
      ];
    const objectUpdate = {};
        const isValidUpdate = Object.keys(req.body).every((key) =>
          arrayOfEditKeys.includes(key)
        );

        if (!isValidUpdate) {
          return res.status(400).json({
            status: 400,
          });
        }
      for (const key of arrayOfEditKeys) {
          if (req.body[key] != null) {
              objectUpdate[key] = req.body[key];
          }
      }
      const update = await COURSE.findByIdAndUpdate({ _id: req.params.id }, objectUpdate, { new: true });
      if (update) {
      let totalDuration = 0;
      let totalModules = update.modules.length;
      let totalQuestions = 0;

      update.modules.forEach(module => {
        module.videos.forEach(video => {
          totalDuration += video.duration;
        });
      });
      totalQuestions = update.assessments.length;

      update.courseDuration = totalDuration;
      update.totalMoudule = totalModules;
      update.totalQuestions = totalQuestions;

      await update.save();
          return res.status(error.status.OK).send({
              message: "Course Updated Successfully.",
              status: error.status.OK,
              data: update,
          });
      }
  } catch (e) {
      return res.status(error.status.InternalServerError).json({
          message: e.message,
          status: error.status.InternalServerError,
      });
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    const deleteResult = await COURSE.deleteOne({ _id: req.params.id });
    if (deleteResult) {
      return res.status(error.status.OK).json({
        message: "Deleted Successfully",
      });
    } 
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
    });
  }
};


exports.changeCourseStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { publish } = req.body; 
    if (typeof publish !== "boolean") {
      return res.status(400).json({
        message: "Invalid publish status. It must be a boolean value.",
        status: 400,
      });
    }

    const updatedCourse = await COURSE.findByIdAndUpdate(
      id,
      { publish },
      { new: true } 
    );

    if (!updatedCourse) {
      return res.status(404).json({
        message: "Course not found.",
        status: 404,
      });
    }
    const statusMessage = publish
      ? "Course is now public."
      : "Course is now private.";

    return res.status(200).json({
      message:statusMessage,
      status: 200,
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

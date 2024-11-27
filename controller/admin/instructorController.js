const INSTRUCTOR = require("../../model/instructorModel");
const error = require("../../utils/error");

exports.createInstructor = async (req, res) => {
  try {
    const { name, designation, number,photo,  email, official_email } = req.body;
    const refData = {
      name: name,
      designation: designation,
      number: number,
      email: email,
      official_email: official_email,
      photo:photo
    };
    const create = await INSTRUCTOR.create(refData);
    if (create) {
      return res.status(error.status.OK).send({
        message: "Instructor Added.",
        status: error.status.OK,
        data: create,
      });
    }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

exports.editInstructor = async (req, res) => {
  try {
    const arrayOfEditKeys = [
      "name",
      "designation",
      "number",
      "email",
      "official_email",
      "photo"
    ];
    const objectUpdate = {};
    for (const key of arrayOfEditKeys) {
      if (req.body[key] != null) {
        objectUpdate[key] = req.body[key];
      }
    }
    const update = await INSTRUCTOR.findByIdAndUpdate(
      { _id: req.params.id },
      objectUpdate,
      { new: true }
    );
    if (update) {
      return res.status(error.status.OK).send({
        message: "Updated Successfully.",
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
};

exports.deleteInstructor = async (req, res) => {
  try {
    const deleteResult = await INSTRUCTOR.deleteOne({ _id: req.params.id });
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

exports.getAllInstructor = async (req, res) => {
  try {
    const find = await INSTRUCTOR.find();

    if (!find.length > 0) {
      return res.status(error.status.NotFound).send({
        message: "not found",
        status: error.status.NotFound,
      });
    }

    return res.status(error.status.OK).send({
      message: "Success",
      status: error.status.OK,
      data: find,
    });
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

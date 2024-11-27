const USER = require("../../model/userModel");
const SESSION = require("../../model/sessionModel");
const error = require("../../utils/error");

exports.getAllUsers = async (req, res) => {
  try {
    const find = await USER.find();

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

exports.deleteUser = async (req, res) => {
  try {
    const deleteResult = await USER.deleteOne({ _id: req.params.id });
    console.log(deleteResult)
    if (deleteResult) {
      return res.status(error.status.OK).json({
        message: "User Deleted Successfully",
      });
    }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
    });
  }
};

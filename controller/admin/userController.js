const USER = require("../../model/userModel");
const SESSION = require("../../model/sessionModel");
const error = require("../../utils/error");


exports.getAllUsers = async (req, res) => {
    try {
     const find = await USER.find({ isVerified: true }).populate({
       path: "purchasedCourse",
       select: "title", 
     });
  
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
  
  exports.blockUnblockUser = async (req, res) => {
    try {
        const { isBlock } = req.body;
        if (typeof isBlock !== 'boolean') {
            return res.status(400).send({
                message: "Invalid request: 'isBlock' must be a boolean value.",
                status: 400,
            });
        }
        const updatedUser = await USER.findByIdAndUpdate(
            req.params.id,
            { isBlock },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).send({
                message: "User not found.",
                status: 404,
            });
      }
       if (isBlock) {
         await SESSION.deleteMany({ user_id: req.params.id });
       }
        const message = isBlock 
            ? "User has been blocked successfully." 
            : "User has been unblocked successfully.";

        return res.status(200).send({
            message,
            status: 200
        })
    } catch (e) {
        return res.status(error.status.InternalServerError).json({
            message: e.message,
            status: error.status.InternalServerError,
        });
    }
  }

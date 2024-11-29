const CATEGORY = require("../../model/categoryModel");
const error = require("../../utils/error");

exports.createCategory = async (req, res) => {
  try {
    const { name, description, catimage } = req.body;
    const refData = {
      name: name,
      description: description,
      catimage: catimage,
    };
    const create = await CATEGORY.create(refData);
    if (create) {
      return res.status(error.status.OK).send({
        message: "Category Created",
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

exports.getAllCategory = async (req, res) => {
  try {
    const find = await CATEGORY.find();

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

exports.editCategory = async (req, res) => {
  try {
    const arrayOfEditKeys = ["name", "description", "catimage"];
    const objectUpdate = {};
    for (const key of arrayOfEditKeys) {
      if (req.body[key] != null) {
        objectUpdate[key] = req.body[key];
      }
    }
    const update = await CATEGORY.findByIdAndUpdate(
      { _id: req.params.id },
      objectUpdate,
      { new: true }
    );
    if (update) {
      return res.status(error.status.OK).send({
        message: "Category Updated Successfully.",
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

exports.deleteCategory = async (req, res) => {
  try {
    const deleteResult = await CATEGORY.deleteOne({ _id: req.params.id });
    if (deleteResult) {
      return res.status(error.status.OK).json({
        message: "Category Deleted Successfully",
      });
    }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
    });
  }
};

const FEATURES = require("../../model/featuresModel");
const TESTIMONIAL = require("../../model/testimonialModel");
const BANNER = require("../../model/bannerModel");
const FAQ = require("../../model/faqModel");
const NEWS = require("../../model/newsModel");
const error = require("../../utils/error");

exports.createNews = async (req, res) => {
  try {
    const { time, date, department, title } = req.body;
    const refData = {
      department: department,
      title: title,
      time: time,
      date: date,
    };
    const create = await NEWS.create(refData);
    if (create) {
      return res.status(error.status.OK).send({
        message: "News Created",
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

exports.getAllNews = async (req, res) => {
  try {
    const find = await NEWS.find();

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

exports.editNews = async (req, res) => {
  try {
    const arrayOfEditKeys = ["time", "date", "department", "title"];
    const objectUpdate = {};
    for (const key of arrayOfEditKeys) {
      if (req.body[key] != null) {
        objectUpdate[key] = req.body[key];
      }
    }
    const update = await NEWS.findByIdAndUpdate(
      { _id: req.params.id },
      objectUpdate,
      { new: true }
    );
    if (update) {
      return res.status(error.status.OK).send({
        message: "News Updated Successfully.",
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

exports.deleteNews = async (req, res) => {
  try {
    const deleteResult = await NEWS.deleteOne({ _id: req.params.id });
    if (deleteResult) {
      return res.status(error.status.OK).json({
        message: "News Deleted Successfully",
      });
    }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
    });
  }
};

exports.createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const refData = {
      question: question,
      answer: answer,
    };
    const create = await FAQ.create(refData);
    if (create) {
      return res.status(error.status.OK).send({
        message: "Faq Created.",
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

exports.editFaq = async (req, res) => {
  try {
    const arrayOfEditKeys = ["question", "answer"];
    const objectUpdate = {};
    for (const key of arrayOfEditKeys) {
      if (req.body[key] != null) {
        objectUpdate[key] = req.body[key];
      }
    }
    const update = await FAQ.findByIdAndUpdate(
      { _id: req.params.id },
      objectUpdate,
      { new: true }
    );
    if (update) {
      return res.status(error.status.OK).send({
        message: "Faq Updated Successfully.",
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

exports.deleteFaq = async (req, res) => {
  try {
    const deleteResult = await FAQ.deleteOne({ _id: req.params.id });
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

exports.getFaq = async (req, res) => {
  try {
    const find = await FAQ.find();

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

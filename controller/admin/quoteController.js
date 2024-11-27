const quoteModel = require("../../model/quoteModel");
const WEB = require("../../model/webPageModel");
const error = require("../../utils/error");

// exports.createWebPage = async (req, res) => {
//   try {
//       const { pageName, title, html } = req.body;
//       const find = await WEB.findOne({ pageName: pageName })
//       if (find) {
//           return res.status(error.status.BadRequest).send({
//             message: "This page already Created.",
//             status: error.status.BadRequest,
//           });
//       }
//       const refData = {
//       pageName: pageName,
//       title: title,
//       html: html,
//     };
//     const create = await WEB.create(refData);
//     if (create) {
//       return res.status(error.status.OK).send({
//         message: "Created.",
//         status: error.status.OK,
//         data: create,
//       });
//     }
//   } catch (e) {
//     return res.status(error.status.InternalServerError).json({
//       message: e.message,
//       status: error.status.InternalServerError,
//     });
//   }
// };

// exports.editWebPage = async (req, res) => {
//   try {
//     const arrayOfEditKeys = ["pageName", "title", "html"];
//     const objectUpdate = {};
//     for (const key of arrayOfEditKeys) {
//       if (req.body[key] != null) {
//         objectUpdate[key] = req.body[key];
//       }
//     }
//     const update = await WEB.findByIdAndUpdate(
//       { _id: req.params.id },
//       objectUpdate,
//       { new: true }
//     );
//     if (update) {
//       return res.status(error.status.OK).send({
//         message: "Updated Successfully.",
//         status: error.status.OK,
//         data: update,
//       });
//     }
//   } catch (e) {
//     return res.status(error.status.InternalServerError).json({
//       message: e.message,
//       status: error.status.InternalServerError,
//     });
//   }
// };


exports.editOrCreateQuotePage = async (req, res) => {
  try {
    const { quote, author } = req.body;

    // Check if the document with the same author already exists
    let page = await quoteModel.findOne({ author });

    if (page) {
      // If found, update the existing document
      const objectUpdate = {};

      // Only update fields if they exist in the request
      if (quote != null) objectUpdate.quote = quote;
      if (author != null) objectUpdate.author = author;

      const updatedPage = await quoteModel.findByIdAndUpdate(
        page._id,
        objectUpdate,
        { new: true }
      );

      if (updatedPage) {
        return res.status(200).send({
          message: "Updated Successfully.",
          status: 200,
          data: updatedPage,
        });
      }
    } else {
      // If not found, create a new document
      const newQuoteData = { quote, author };
      const createdPage = await quoteModel.create(newQuoteData);

      if (createdPage) {
        return res.status(200).send({
          message: "Created.",
          status: 200,
          data: createdPage,
        });
      }
    }
  } catch (error) {
    // Handle any errors
    return res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};




exports.getAllQuote = async (req, res) => {
  try {
      const find = await quoteModel.find();
      console.log(find)
      if (!find) {
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

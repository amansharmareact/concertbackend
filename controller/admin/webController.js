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


exports.editOrCreateWebPage = async (req, res) => {
  try {
    const { title, html } = req.body;
    let page = await WEB.findOne({ title });
    if (page) {
      const arrayOfEditKeys = ["title", "html"];
      const objectUpdate = {};
      for (const key of arrayOfEditKeys) {
        if (req.body[key] != null) {
          objectUpdate[key] = req.body[key];
        }
      }
      const update = await WEB.findByIdAndUpdate(
        { _id: page._id },
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
    } else {
      const refData = {
        title: title,
        html: html,
      };
      const create = await WEB.create(refData);
      if (create) {
        return res.status(error.status.OK).send({
          message: "Created.",
          status: error.status.OK,
          data: create,
        });
      }
    }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};


exports.getWebPage = async (req, res) => {
  try {
      const find = await WEB.findOne({ title: req.params.title });
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

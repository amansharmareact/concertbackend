require("dotenv").config();
var AWS = require("aws-sdk");
const error = require("../../utils/error");
// const {
//   AWS_BUCKET_NAME,
//   AWS_ACCESS_KEY_ID,
//   AWS_SECRET_ACCESS_KEY,
//   AWS_REGION,
// } = require("../../utils/constants");

exports.fileUpload = async (req, res, next) => {
  try {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    const s3 = new AWS.S3();

    // Binary data base64
    const fileContent = Buffer.from(req.files.file.data, "binary");

    let params, fileName;

    // Setting up S3 upload parameters
    if (req.body.type == 1) {
      params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `img/${Date.now()}.jpg`,
        Body: fileContent,
        ContentType: "image/jpg",
      };
    } else if (req.body.type == 2) {
      params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `video/${Date.now()}.mp4`,
        Body: fileContent,
        ContentType: "video/mp4",
      };
    } else if (req.body.type == 3) {
      params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `audio/${Date.now()}.mp3`,
        Body: fileContent,
        ContentType: "audio/mp3",
      };
    } else if (req.body.type == 4) {
      // Use the original file name for PDF
      fileName = `${req.files.file.name}`;
      params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: fileContent,
        ContentType: "application/pdf",
      };
    } else if (req.body.type == 5) {
      params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `word/${Date.now()}.docx`,
        Body: fileContent,
        ContentType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      };
    }

    // Uploading files to the bucket
    var filepath = await s3.upload(params).promise();

    // Include the file name in the response
    const response = {
      status: error.status.OK,
      url: filepath.Location,
    };

    if (fileName) {
      response.fileName = fileName;
    }

    return res.status(error.status.OK).json(response);
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

exports.fileDeleteAws = async (req, res) => {
  try {
    const { fileKey } = req.params; // Get the file key from the request parameters

    if (!fileKey) {
      return res.status(400).json({
        status: 400,
        message: "File key is required",
      });
    }

    // Initialize AWS S3 with environment variables
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const s3 = new AWS.S3();

    // Set up S3 delete parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    };

    // Delete the file from S3
    await s3.deleteObject(params).promise();

    return res.status(error.status.OK).json({
      status: 200,
      message: "File deleted successfully",
    });
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};
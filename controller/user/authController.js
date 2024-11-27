require("dotenv").config();
const USER = require("../../model/userModel");
const SESSION = require("../../model/sessionModel");
const error = require("../../utils/error");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const salt = 10;
const JWT = require("jsonwebtoken");
// const { sendWelcomeEmail, sendOTPEmail } = require("../../utils/Mails");


exports.signUp = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
    } = req.body;
      const lowerCaseEmail = email.toLowerCase();
    const find = await USER.findOne({ email:lowerCaseEmail,isVerified:true });
    if (find) {
      return res.status(error.status.BadRequest).send({
        message: "User Already Exists! Please Login.",
        status: error.status.BadRequest,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const refData = {
      email: lowerCaseEmail,
      password: hashed,
      name: name,
      phone: phone,
    };
    const create = await USER.create(refData);
    if (create) {
      // const sendOtp = await sendOTPEmail(req.body.email);
      const otp = "1234";
      const otpTime = new Date();
      otpTime.setMinutes(otpTime.getMinutes() + 5); 
      // const update = await USER.findOneAndUpdate(
      //   { email: email },
      //   { $set: { otp: sendOtp.otp, otpTime: sendOtp.otpTime } },
      //   { new: true }
      // );
      const update = await USER.findOneAndUpdate(
        { email: lowerCaseEmail },
        { $set: {otp:otp, otpTime:otpTime } },
        { new: true }
      );
      return res.status(error.status.OK).send({
        message: "OTP Sent, Please verify your mail.",
        status: error.status.OK,
      });
    }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    const find = await USER.findOne({ email: lowerCaseEmail, isVerified: true });

    if (!find) {
      return res.status(error.status.NotFound).send({
        message: "No User found with this Email",
        status: error.status.UnprocessableEntity,
      });
    }


    const com_pass = await bcrypt.compare(password, find.password);
    if (!com_pass) {
      return res.status(error.status.UnprocessableEntity).send({
        message: "Password invalid.",
        status: error.status.UnprocessableEntity,
      });
    }

    const signToken = JWT.sign(
      { _id: find._id, email: find.email },
      process.env.SECRET_KEY
    );

    const createSession = await SESSION.updateOne(
      { user_id: find._id },
      { access_token: signToken }, 
      { upsert: true } 
    );
    return res.status(error.status.OK).send({
      message: "Login Successfully.",
      status: error.status.OK,
      data: find,
      access_Token: signToken,
      session: createSession,
    });
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};


exports.otpVerification = async (req, res) => {
  try {
    const { otp,email } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    const find = await USER.findOne({ email:lowerCaseEmail });
    if (find) {
      const otpData = find.otpTime;
      const currentTime = new Date();
      const otpCreationTime = new Date(otpData);
      const timeDifference = currentTime - otpCreationTime;
      const otpExpirationTime = 2 * 60 * 1000; 
      if (timeDifference <= otpExpirationTime) {
        if (otp === 1234) {
          const verified = await USER.updateOne(
            { email: lowerCaseEmail },
            { isVerified: true }
          );
          if (verified) {
            const signToken = JWT.sign(
              { _id: find._id, email: find.email },
              process.env.SECRET_KEY
            );
            const createSession = await SESSION.updateOne(
              { user_id: find._id }, 
              { access_token: signToken }, 
              { upsert: true } 
            );
            // await sendWelcomeEmail(email, find.name);
            return res.status(error.status.OK).send({
              message: "OTP verified",
              status: error.status.OK,
              data:{
                email:find.email,
                access_Token: signToken,
              }
            });
          }
        } else {
          return res.status(error.status.NotFound).send({
            message: "Invalid OTP",
            status:error.status.NotFound,
          });
        }
      } else {
        await USER.deleteOne({ email: lowerCaseEmail });
        return res.status(error.status.NotFound).send({
          message: "OTP expired",
          status: error.status.NotFound,
        });
      }
    } else {
      return res.status(error.status.NotFound).send({
        message: "No User Found With This Email.",
        status: error.status.NotFound,
      });
    }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { otp,email } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    const find = await USER.findOne({ email:lowerCaseEmail });
    if (find) {
      // const sendLink = await sendResetPasswordMail(req.body.email);
      const resetToken = crypto.randomBytes(32).toString('hex');
      // const resetTokenExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
      const resetTokenExpires = Date.now() + 2 * 60 * 1000;
      // find.resetPasswordToken = sendLink.resetToken;
      // find.resetPasswordExpires = sendLink.resetTokenExpires;
      find.resetPasswordToken = resetToken;
      find.resetPasswordExpires = resetTokenExpires;
      await find.save();
      return res.status(error.status.OK).send({
        message: "Password reset link has been sent to your email address",
        status: error.status.OK,
      });
    }
    return res.status(error.status.NotFound).send({
      message: "User not found with this email address.",
      status: error.status.NotFound,
    });
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};



exports.setNewPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const find = await USER.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (find) {
      const hashed = await bcrypt.hash(newPassword, salt);     
      const passwordUpdate = await USER.updateOne(
      { _id: find._id },
      {
        password: hashed,
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined,
      }
    );
      if (passwordUpdate) {
          return res.status(error.status.OK).send({
          message: "New password set successfully",
          status: error.status.OK,
        });
      }
      return res.status(error.status.BadRequest).send({
        message: "Unable to set password",
        status: error.status.BadRequest,
      });
    }
    return res.status(error.status.Unauthorized).send({
      message: "Password reset token is invalid or has expired",
      status:error.status.Unauthorized,
    });
  } catch (err) {
    return res.status(error.status.InternalServerError).json({
      message: err.message,
      status: error.status.InternalServerError,
    });
  }
};

// exports.contactUs = async (req, res) => {
//   try {
//     const { name, email, subject, message} = req.body;
//       const refData = {
//       name: name,
//       email: email.toLowerCase(),
//       subject: subject,
//       message: message,
//     };
//     const contactData = await CONTACT.create(refData);
//     return res.status(error.status.OK).send({
//       message: "Message Sent Successfully.",
//       status: error.status.OK,
//       data: contactData,
//     });
//   } catch (e) {
//     return res.status(error.status.InternalServerError).json({
//       message: e.message,
//       status: error.status.InternalServerError,
//     });
//   }
// };

// exports.editProfile = async (req, res) => {
//   try {
//     const  userId = req.user._id;
//     const { name, phone, countryCode, collegeName, collegeId, image,linkedIn } = req.body;
//     const updatedUser = await USER.findByIdAndUpdate(
//       userId,
//       {
//         $set: {
//           name,
//           phone,
//           countryCode,
//           collegeName,
//           collegeId,
//           image,
//           linkedIn,
//         },
//       },
//       { new: true }
//     );

//     if (updatedUser) {
//       return res.status(error.status.OK).send({
//         message: "Profile updated successfully.",
//         status: error.status.OK,
//         data: updatedUser,
//       });
//     } else {
//       return res.status(error.status.NotFound).send({
//         message: "Unable to update profile.",
//         status: error.status.NotFound,
//       });
//     }
//   } catch (e) {
//     return res.status(error.status.InternalServerError).json({
//       message: e.message,
//       status: error.status.InternalServerError,
//     });
//   }
// };


// exports.getProfile = async (req, res) => {
//   try {
//     const find = await USER.findOne({_id:req.user._id});
//     if (!find) {
//       return res.status(error.status.NotFound).send({
//         message: "not found",
//         status: error.status.NotFound,
//       });
//     }
//     return res.status(error.status.OK).send({
//       message: "Success",
//       status: error.status.OK,
//       data: find,
//     });
//   } catch (e) {
//     return res.status(error.status.InternalServerError).json({
//       message: e.message,
//       status: error.status.InternalServerError,
//     });
//   }
// };






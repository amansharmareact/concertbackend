require("dotenv").config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (receiver, otp) => {
  try {
    const response = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_EMAIL_ID}>`,
      to: receiver,
      subject: "Your OTP Code",
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
    });
    console.log(response, "OTP email sent successfully");
    return response;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return error;
  }
};

const sendWelcomeEmail = async (receiver, name) => {
  try {
    const response = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_EMAIL_ID}>`,
      to: receiver,
      subject: "Welcome to Our Service",
      html: `<p>Hello ${name},</p><p>Welcome to our platform! We're excited to have you on board.</p>`,
    });
    console.log(response, "Welcome email sent successfully");
    return response;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return error;
  }
};

const sendCodeBuyerEmail = async (receiver, name) => {
  try {
    const response = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_EMAIL_ID}>`,
      to: receiver,
      subject: "Your Purchase Code",
      html: `<p>Hello ${name},</p><p>Your purchase code is ready. Thank you for your business!</p>`,
    });
    console.log(response, "Code buyer email sent successfully");
    return response;
  } catch (error) {
    console.error("Error sending code buyer email:", error);
    return error;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendCodeBuyerEmail,
  sendOTPEmail,
};




// require("dotenv").config();
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const SendGrid_OTP_Mail = async (receiver, otp) => {
//   const msg = {
//     //extract the email details

//     to: receiver,
//     from: {
//       email: process.env.SENDGRID_EMAIL_ID,
//       name: process.env.SENDGRID_FROM_NAME,
//     },
//     templateId: "d-e184622eb75e49a59df398808c7b8e1c",
//     //extract the custom fields
//     dynamic_template_data: {
//       otp: otp,
//     },
//   };
//   try {
//     let info = await sgMail.send(msg);
//     return info;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// const SendGrid_Welcome_Mail = async (receiver, name) => {
//   const msg = {
//     //extract the email details
//     to: receiver,
//     from: {
//       email: process.env.SENDGRID_EMAIL_ID,
//       name: process.env.SENDGRID_FROM_NAME,
//     },
//     templateId: "d-60273a080bc14e18bd8890df9a24d06",
//     //extract the custom fields
//     dynamic_template_data: {
//       name: name,
//     },
//   };
//   console.log(msg, "msg");
//   try {
//     let info = await sgMail.send(msg);
//     return info;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// const SendGrid_Code_buyer = async (receiver, name) => {
//   const msg = {
//     //extract the email details
//     to: receiver,
//     from: {
//       email: process.env.SENDGRID_EMAIL_ID,
//       name: process.env.SENDGRID_FROM_NAME,
//     },
//     templateId: "d-1eb84d38fcee47f98c8a95661c19b1a",
//     //extract the custom fields
//     dynamic_template_data: {
//       name: name,
//     },
//   };
//   console.log(msg);
//   try {
//     let info = await sgMail.send(msg);
//     return info;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// module.exports = {
//   SendGrid_Welcome_Mail,
//   SendGrid_Code_buyer,
//   SendGrid_OTP_Mail,
// };
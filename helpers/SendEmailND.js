const nodemailer = require("nodemailer");

require("dotenv").config();

const { PASSWORD_META } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "poduzova@meta.ua",
    pass: PASSWORD_META,
  },
};

const transporter = nodemailer.createTransport(config);

// const emailOptions = {
//   from: "poduzova@meta.ua",
//   to: "e.a.poduzova@gmail.com",
//   subject: "Nodemailer test",
//   text: "Hello. We are testing sending emails!",
// };

const SendEmailND = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const email = { ...data, from: "poduzova@meta.ua" };
    await transporter.sendMail(email);
    console.log("Email send success");
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = SendEmailND;

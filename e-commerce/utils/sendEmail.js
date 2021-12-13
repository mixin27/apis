const nodemailer = require('nodemailer');

const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(nodemailerConfig);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Mixin Org" <mixinorg@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;

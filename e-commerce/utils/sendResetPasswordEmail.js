const sendEmail = require('./sendEmail');

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetUrl = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `
        <p>
            Please reset your password by clicking the following link : 
            <a href="${resetUrl}">Reset Password</a>
        </P>
      `;

  return sendEmail({
    to: email,
    subject: 'Reset Password',
    html: `
            <h4>Hello, ${name}</h4>
            ${message}
        `,
  });
};

module.exports = sendResetPasswordEmail;

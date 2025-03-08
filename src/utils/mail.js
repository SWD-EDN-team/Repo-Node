import dotenv from "dotenv";
import nodemailer from "nodemailer";
export const generateOpt = () => {
  let otp = "";
  for (let i = 0; i < 5; i++) {
    const randVal = Math.floor(Math.random() * 10);
    otp = otp + randVal;
  }
  return otp;
};

export const mailTransport = async ({ email, subject, html }) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });
  const msg = {
    from: "ADMIN XIN CHÀO",
    to: email,
    subject: subject,
    html: html,
  };
  return await transport.sendMail(msg);
};

export const generateEmailTemplate = (OTP, name) => {
  return `<html>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <tr>
        <td style="background-color: #4CAF50; padding: 20px; text-align: center; color: #ffffff; font-size: 24px; font-weight: bold;">
          Welcome to Our Service
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; color: #333333;">
          <p style="font-size: 18px; margin-bottom: 10px;">Hello ${name},</p>
          <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for registering. Your OTP code is:
          </p>
          <p style="font-size: 24px; font-weight: bold; text-align: center; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">
            ${OTP}
          </p>
          <p style="font-size: 16px; margin-top: 20px;">
            Please use this code to verify your account. If you did not request this, please ignore this email.
          </p>
          <p style="font-size: 16px; margin-top: 20px;">
            Regards, <br />
            The Support Team
          </p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f4f4f9; padding: 20px; text-align: center; font-size: 14px; color: #777;">
          © 2025 Our Service. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

import nodemailer, { Transporter } from "nodemailer";
import path from "path";
import ejs from "ejs";

require("dotenv").config();

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

const sendEmail = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    service: process.env.SMTP_SERVICE,
    secure: true, // Use true for port 465 (SSL)
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Skip certificate verification
    },
  });

  const { email, subject, template, data } = options;

  const templatePath = path.join(__dirname, "../mails", template);
  const html: string = await ejs.renderFile(templatePath, data);
  console.log(html);
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;

import Transpoter from "../config/mail.config";

interface IEmailProps {
  emailBody: string;
  toEmail: string;
  subject: string;
}

export const sendEmail = async ({ toEmail, subject, emailBody }: IEmailProps) => {
  try {
    const message = {
      from: "natureayure@gmail.com",
      to: toEmail,
      subject: subject,
      html: emailBody,
    };

    const result = await Transpoter.sendMail(message);

    if (result) {
      return true;
    }
  } catch (e: any) {
    throw new Error("Error in sending email");
  }
};

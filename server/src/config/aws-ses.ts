import { SendEmailCommand } from "@aws-sdk/client-sesv2";

const { SESV2Client } = require("@aws-sdk/client-sesv2");

const sesClient = new SESV2Client({ region: process.env.AWS_REGION });

export async function sendTemplatedEmail(toAddress: string, templateName: string, templateData: Record<string, unknown>) {
  const params = {
    Destination: {
      ToAddresses: [toAddress],
    },
    Content: {},
    EmailTemplate: {
      TemplateName: templateName,
      TemplateData: JSON.stringify(templateData),
    },
    FromEmailAddress: "sender@example.com", // replace with your email address
  };

  const command = new SendEmailCommand(params);

  try {
    const data = await sesClient.send(command);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
}

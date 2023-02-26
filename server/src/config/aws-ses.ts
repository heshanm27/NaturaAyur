// import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";

// console.log("process.env.AWS_REGION", process.env.AWS_REGION);
// const sesClient = new SESv2Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY ?? "",
//     secretAccessKey: process.env.AWS_SECREAT_KEY ?? "",
//   },
// });

// export async function sendEmail(toAddress: string, subject: string, templateData: string) {
//   console.log("toAddress", toAddress);
//   const params = {
//     FromEmailAddress: "natureayure@gmail.com",
//     Destination: {
//       ToAddresses: [toAddress],
//     },
//     Content: {
//       Simple: {
//         Subject: {
//           Data: subject, // Replace with your email subject
//         },
//         Body: {
//           Html: {
//             Data: templateData, // Replace with your email body
//           },
//         },
//       },
//     },
//   };

//   console.log("command", params);
//   const command = new SendEmailCommand(params);
//   try {
//     const data = await sesClient.send(command);
//     return data;
//   } catch (err: any) {
//     throw new Error(err);
//   }
// }

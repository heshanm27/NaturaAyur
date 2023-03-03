"use strict";
// import { sendEmail } from "../config/aws-ses";
// import { MagicLinkType } from "../schema/auth.schema";
// import JWT from "jsonwebtoken";
// export const generateMagicLink = async (email: string, type: MagicLinkType) => {
//   try {
//     if (type === MagicLinkType.VERIFY_EMAIL) {
//       const token = JWT.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "2m" });
//       const template = `
//         <html>
//         <head>
//           <title>Profile Verified</title>
//           <style>
//             /* Style your email as needed */
//             .button {
//               background-color: #4CAF50; /* Green */
//               border: none;
//               color: white;
//               padding: 15px 32px;
//               text-align: center;
//               text-decoration: none;
//               display: inline-block;
//               font-size: 16px;
//               margin: 4px 2px;
//               cursor: pointer;
//             }
//           </style>
//         </head>
//         <body>
//           <h1>Congratulations!</h1>
//           <p>Your profile has been successfully verified.</p>
//           <p>Thank you for using our service.</p>
//           <a href="http://localhost:8000/api/v1/auth/test${token}" class="button">Visit our website</a>
//         </body>
//       </html>
//         `;
//       await sendEmail(email, "Verify Email", template);
//     }
//   } catch (e: any) {
//     throw e;
//   }
// };
//# sourceMappingURL=generate-magic-link.js.map
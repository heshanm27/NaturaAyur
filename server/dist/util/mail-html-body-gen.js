"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductReviewEmailBody = exports.generateResetPasswordEmailBody = exports.generateVerifiedEmailBody = void 0;
const mailgen_1 = __importDefault(require("mailgen"));
const mailGenerator = new mailgen_1.default({
    theme: "default",
    product: {
        name: "NaturaAyur",
        link: "http://amazona.com/",
    },
});
const baseUrl = "http://localhost:3000";
function generateVerifiedEmailBody(userName, token) {
    return mailGenerator.generate({
        body: {
            name: `${userName}`,
            intro: "Welcome to NaturaAyur We're very excited to have you on board.",
            action: {
                instructions: "To get started with NaturaAyur, please click here:(This link will expire in 10 minutes)",
                button: {
                    color: "#22BC66",
                    text: "Confirm your account",
                    link: `${baseUrl}/api/v1/auth/verify-email?token=${token}`,
                },
            },
            outro: "Need help, contact us our support team ",
        },
    });
}
exports.generateVerifiedEmailBody = generateVerifiedEmailBody;
function generateResetPasswordEmailBody(userName, token) {
    return mailGenerator.generate({
        body: {
            name: `${userName}`,
            intro: "You have received this email because a password reset request for your account was received.",
            action: {
                instructions: "Click the button below to reset your password:(This link will expire in 10 minutes)",
                button: {
                    color: "#DC4D2F",
                    text: "Reset your password",
                    link: `
          http://localhost:8000/api/v1/auth/resetPassword/${token}`,
                },
            },
            outro: "If you did not request a password reset, no further action is required on your part.",
        },
    });
}
exports.generateResetPasswordEmailBody = generateResetPasswordEmailBody;
// export function generateForgotPasswordEmailBody(userName: string, token: string) {
//   return mailGenerator.generate({
//     body: {
//       name: `${userName}`,
//           intro: "You have received this email because a password reset request for your account was received.",
//       action: {
//           instructions: "Click the button below to reset your password:(This link will expire in 10 minutes)",
//         button: {
//           color: "#DC4D2F",
//           text: "Reset your password",
//           link: `${baseUrl}/api/v1/auth/verify-email?token=${token}`,
//         },
//       },
//       outro: "If you did not request a password reset, no further action is required on your part.",
//     },
//   });
// }
function generateProductReviewEmailBody(userName, productData) {
    return mailGenerator.generate({
        body: {
            name: "John Appleseed",
            intro: "Your order has been processed successfully.",
            table: {
                data: [
                    productData.map((item) => {
                        return {
                            item: item.name,
                            price: item.price,
                        };
                    }),
                ],
                columns: {
                    // Optionally, customize the column widths
                    customWidth: {
                        item: "20%",
                        price: "15%",
                    },
                    // Optionally, change column text alignment
                    customAlignment: {
                        price: "right",
                    },
                },
            },
            action: {
                instructions: "You can check the status of your order and more in your dashboard:",
                button: {
                    color: "#3869D4",
                    text: "Go to Dashboard",
                    link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
                },
            },
            outro: "We thank you for your purchase.",
        },
    });
}
exports.generateProductReviewEmailBody = generateProductReviewEmailBody;
//# sourceMappingURL=mail-html-body-gen.js.map
import Mailgen from "mailgen";

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "NaturaAyur",
    link: "http://amazona.com/",
  },
});

const baseUrl = process.env.FRONTEND || "http://localhost:3000";

export function generateVerifiedEmailBody(userName: string, token: string) {
  return mailGenerator.generate({
    body: {
      name: `${userName}`,
      intro: "Welcome to NaturaAyur We're very excited to have you on board.",
      action: {
        instructions: "To get started with NaturaAyur, please click here:(This link will expire in 10 minutes)",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: `${baseUrl}/verify/${token}`,
        },
      },
      outro: "Need help, contact us our support team ",
    },
  });
}

export function generateResetPasswordEmailBody(userName: string, token: string) {
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

export function generateOrderEmailBody(userName: string, recieptUrl: string, dashboardUrl: string) {
  return mailGenerator.generate({
    body: {
      name: userName,
      intro: "Your order has been paid successfully.",
      title: "Order Receipt",

      action: [
        {
          instructions: "You can check the order receipt ",
          button: {
            color: "#22BC66",
            text: "View Order Receipt",
            link: recieptUrl,
          },
        },
        {
          instructions: "You can check the status of your order and more in your dashboard:",
          button: {
            color: "#22BC66",
            text: "Go to Dashboard",
            link: dashboardUrl,
          },
        },
      ],
      outro: "We thank you for your purchase.",
    },
  });
}

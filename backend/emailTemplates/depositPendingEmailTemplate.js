const depositPendingEmailTemplate = (name, amount, method, dashboardLink) => {
  const email = {
    body: {
      greeting: false,

      intro: `
        <p><strong>${name}</strong></p>
        <p>Your deposit of <strong>${amount}</strong> has been initiated and is awaiting confirmation. You will be notified once it is confirmed.</p>
      `,
      table: {
        data: [
          {
            Amount: amount,
            Method: method,
          },
        ],
      },
      // action: {
      //   instructions: "Please kindly confirm your withdrawal with the button below:",
      //   button: {
      //     color: "#F3BA2F", // Binance yellow
      //     text: "Confirm Withdrawal",
      //     link: dashboardLink,
      //   },
      // },
      outro:
        "Don't recognize this activity? Reset your password immediately and contact support.",
      signature: "Best Regards",
    },
  };
  return email;
};

module.exports = {
  depositPendingEmailTemplate,
};

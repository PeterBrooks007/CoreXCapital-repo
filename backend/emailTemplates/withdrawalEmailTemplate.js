const withdrawalEmailTemplate = (name, amount, method, walletAddress, dashboardLink) => {
  const email = {
    body: {
      greeting: false,

      intro: `
        <p><strong>${name}</strong></p>
      `,
      table: {
        data: [
          {
            Amount: amount,
            Method: method,
            WalletAddress: walletAddress,
          },
        ],
      },
      action: {
        instructions: "Please kindly confirm your withdrawal with the button below:",
        button: {
          color: "#F3BA2F", // Binance yellow
          text: "Confirm Withdrawal",
          link: dashboardLink,
        },
      },
       outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.',
       signature: 'Best Regards'
    },
  };
  return email;
};

module.exports = {
  withdrawalEmailTemplate,
};

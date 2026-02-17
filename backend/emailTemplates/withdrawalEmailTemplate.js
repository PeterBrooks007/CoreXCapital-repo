const withdrawalEmailTemplate = (name, amount, method, walletAddress, dashboardLink) => {
  const email = {
    body: {
      greeting: false,

      intro: `
        <p><strong>${name}</strong></p>
        <p>You have initiated a request to withdraw Wallet Type: <strong>${method}</strong> to the following payment details</p>
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
      outro:
        "Don't recognize this activity? Reset your password immediately and contact support.",
      signature: "Best Regards",
    },
  };
  return email;
};

module.exports = {
  withdrawalEmailTemplate,
};

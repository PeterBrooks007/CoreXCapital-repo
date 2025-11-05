const depositEmailTemplate = (name, amount, method, txid, dashboardLink) => {
  const email = {
    body: {
      // name,
      intro: [
        `${name},`,
        `You have successfully deposited ${amount} to your account.`,
      ],
      table: {
        data: [
          {
            Amount: amount,
            Method: method,
            Ref: txid,
          },
        ],
      },
      action: {
        instructions: "You can view your transaction details here:",
        button: {
          color: "#F3BA2F", // Binance yellow
          text: "Check Balance",
          link: dashboardLink,
        },
      },
      outro: `Don't recognize this activity? Reset your password immediately and contact support.`,
      signature: "Best Regards",
    },
  };
  return email;
};

module.exports = {
  depositEmailTemplate,
};

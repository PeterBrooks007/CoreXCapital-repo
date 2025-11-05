const depositEmailTemplate = (name, amount, method, txid, dashboardLink) => {
  const email = {
    body: {
      name,
      intro: `You have successfully Deposited ${amount} to your account.`,
       html: `
        <div style="
          background:#F9FAFB;
          border:1px solid #E5E7EB;
          padding:14px 18px;
          border-radius:8px;
          margin:18px 0;
          font-size:14px;
        ">
          <p><strong>Amount:</strong> ${amount}</p>
          <p><strong>Method:</strong> ${method}</p>
          <p><strong>Reference:</strong> ${txid}</p>
        </div>
      `,
      action: {
        instructions: "You can view your transaction details here:",
        button: {
          color: "#F3BA2F", // Binance yellow
          text: "Check Balance",
          link: dashboardLink,
        },
      },
      outro: `Don't recognize this activity? Reset your password immediately and contact support.`,
      signature: false,
    },
  };
  return email;
};

module.exports = {
  depositEmailTemplate,
};

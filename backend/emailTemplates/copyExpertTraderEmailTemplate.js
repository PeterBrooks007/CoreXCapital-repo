const copyExpertTraderEmailTemplate = (
  name,
  introMessage,
  expertTraderExists,
) => {
  const traderFullName = `${expertTraderExists.firstname} ${expertTraderExists.lastname}`;

  const email = {
    body: {
      name,
      intro: [
        introMessage,
        `<div style="text-align: center; margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 8px;">
          <p style="margin: 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Copy Status</p>
          <p style="margin: 5px 0; font-size: 20px; font-weight: bold; color: #00C853;">✔ Active</p>
          <p style="margin: 0; font-size: 13px; color: #666;">Copying ${traderFullName}</p>
        </div>`
      ],
      table: {
        data: [
          {
            Parameter: "Trader",
            Details: traderFullName,
          },
          {
            Parameter: "Level",
            Details: "Elite",
          },
          {
            Parameter: "Win Rate",
            Details: expertTraderExists.winRate || "88.9%",
          },
          {
            Parameter: "Monthly Return",
            Details: expertTraderExists.monthlyReturn || "13.5%",
          },
          {
            Parameter: "Risk Score",
            Details: expertTraderExists.riskScore || "5/10",
          },
          {
            Parameter: "Copy Fee",
            Details: expertTraderExists.copyFee || expertTraderExists.profitShare || "11%",
          },
        ],
      },
      signature: "Best Regards",
    },
  };
  return email;
};

module.exports = {
  copyExpertTraderEmailTemplate,
};
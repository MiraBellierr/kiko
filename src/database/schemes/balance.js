const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: console.log,
  storage: "database.sqlite",
});

const Balance = function () {
  const BalanceScheme = sequelize.define("balance", {
    userid: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    balance: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });

  BalanceScheme.sync();

  return BalanceScheme;
};

module.exports = { Balance };

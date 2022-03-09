const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: console.log,
	storage: "database.sqlite",
});

const Cooldown = function () {
	const CooldownScheme = sequelize.define("cooldown", {
		userid: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		work: {
			type: Sequelize.DATE,
		},
	});

	CooldownScheme.sync();

	return CooldownScheme;
};

module.exports = { Cooldown };

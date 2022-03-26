const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: console.log,
	storage: "database.sqlite",
});

const Hangman = function () {
	const HangmanScheme = sequelize.define("Hangman", {
		userid: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		point: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
		},
	});

	HangmanScheme.sync();

	return HangmanScheme;
};

module.exports = { Hangman };

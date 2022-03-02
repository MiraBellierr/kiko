const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: console.log,
	storage: "database.sqlite",
});

const Quiz = function() {
	const quizScheme = sequelize.define("Quiz", {
		userid: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		point: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		}
	});

	quizScheme.sync();

	return quizScheme;
};

module.exports = { Quiz };
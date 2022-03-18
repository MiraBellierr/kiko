const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: console.log,
	storage: "database.sqlite",
});

const Streak = function () {
	const StreakScheme = sequelize.define("streak", {
		userid: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		streak: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		elapse: {
			type: Sequelize.BIGINT,
		}
	});

	StreakScheme.sync();

	return StreakScheme;
};

module.exports = { Streak };

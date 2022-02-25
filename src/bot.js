const Discord = require("discord.js");
const { Sequelize } = require("sequelize");

const client = new Discord.Client({
	allowedMentions: {
		parse: ["users"],
	},
	intents: [
		Discord.Intents.FLAGS.GUILDS,
	],
});

const sequelize = new Sequelize("database", "user", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: console.log,
	storage: "./src/database/database.sqlite",
});

(async function() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
})();

client.commands = new Discord.Collection();

["command", "event"].forEach(event => require(`./handlers/${event}`)(client));

// eslint-disable-next-line no-undef
client.login(process.env.BOT_TOKEN);
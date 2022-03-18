const Discord = require("discord.js");
const { Sequelize } = require("sequelize");

const client = new Discord.Client({
	allowedMentions: {
		parse: ["users"],
	},
	intents: [
		"DIRECT_MESSAGES",
		"DIRECT_MESSAGE_REACTIONS",
		"DIRECT_MESSAGE_TYPING",
		"GUILDS",
		"GUILD_BANS",
		"GUILD_EMOJIS_AND_STICKERS",
		"GUILD_INTEGRATIONS",
		"GUILD_INVITES",
		"GUILD_MEMBERS",
		"GUILD_MESSAGES",
		"GUILD_MESSAGE_REACTIONS",
		"GUILD_MESSAGE_TYPING",
		"GUILD_VOICE_STATES",
		"GUILD_WEBHOOKS",
	],
});

const sequelize = new Sequelize("database", "user", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: console.log,
	storage: "database.sqlite",
});

(async function () {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
})();

client.commands = new Discord.Collection();

["command", "event"].forEach((event) => require(`./handlers/${event}`)(client));
["Quiz", "Balance", "Cooldown", "Streak"].forEach((database) =>
	require(`./database/schemes/${database.toLowerCase()}`)[database]()
);

// eslint-disable-next-line no-undef
client.login(process.env.BOT_TOKEN);

const Discord = require("discord.js");

const client = new Discord.Client({
	allowedMentions: {
		parse: ["users"],
	},
	intents: [
		Discord.Intents.FLAGS.GUILDS,
	],
});

client.commands = new Discord.Collection();

["command", "event"].forEach(event => require(`./handlers/${event}`)(client));

// eslint-disable-next-line no-undef
client.login(process.env.BOT_TOKEN);
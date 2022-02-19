// const registerInteraction = require("../handlers/registerCommand");
const registerGuildCommand = require("../handlers/registerGuildCommand");
const registerCommand = require("../handlers/registerCommand");

module.exports = async client => {
	client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size.toLocaleString()} servers ✨ | Slash command!`, type: "WATCHING" }], status: "idle" });
	console.log(`Hi, ${client.user.username} is now online!`);

	// registerInteraction(client);
	registerGuildCommand(client, "873441703330185247");
	registerCommand(client);
};
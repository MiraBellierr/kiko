// const registerInteraction = require("../handlers/registerCommand");
const registerGuildCommand = require("../handlers/registerGuildCommand");

module.exports = async client => {
	client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size.toLocaleString()} servers ✨ | Slash command!`, type: "WATCHING" }], status: "idle" });
	console.log(`Hi, ${client.user.username} is now online!`);

	// registerInteraction(client);
	registerGuildCommand(client, "873441703330185247");

	const channel = client.channels.cache.get("865525377458634762");
	const errorChannel = client.channels.cache.get("879702885670211595");

	if (!channel || !errorChannel) return;

	channel.send(`${client.user.username} has been restarted. Maybe there was an error.`);
	errorChannel.send({ content: "error.log", files: ["./error.log"] });
};
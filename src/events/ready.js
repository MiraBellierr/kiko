const registerCommand = require("../handlers/registerCommand");
const registerGuildCommand = require("../handlers/registerGuildCommand");

module.exports = async (client) => {
	client.user.setPresence({
		activities: [
			{
				name: `${client.guilds.cache.size.toLocaleString()} servers ✨ | Slash command!`,
				type: "WATCHING",
			},
		],
		status: "idle",
	});
	console.log(`Hi, ${client.user.username} is now online!`);

	if (client.user.id === "938774709762408490") registerCommand(client);
	else registerGuildCommand(client, "873441703330185247");
};

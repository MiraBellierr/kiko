const Discord = require("discord.js");

module.exports = {
	name: "daily",
	description: "claim paws daily",
	category: "💰 : economy",
	run: async (client, interaction) => {
		interaction.reply("You claimed :paw: 100");
	}
};
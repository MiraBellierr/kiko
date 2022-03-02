const Discord = require("discord.js");
const { Balance } = require("../../database/schemes/balance");
const functions = require("../../util/functions");

module.exports = {
	name: "balance",
	description: "check user balance",
	category: "💰 : economy",
	options: [{
		name: "user",
		description: "choose a user",
		type: 6
	}],
	run: async (client, interaction) => {
		const user = interaction.options.getUser("user") || interaction.user;
		const balance  = await functions.getUserData(Balance(), user);
		const paws = balance.get("balance");

		const embed = new Discord.MessageEmbed()
			.setAuthor({ name: `${user.username}'s balance`})
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.setDescription(`**Balance:** :paw: ${paws}`)
			.setColor("#CD1C6C")
			.setFooter({ text: "*insert patreon link here*", iconURL: client.user.displayAvatarURL() });

		interaction.reply({ embeds: [embed] });
	}
};
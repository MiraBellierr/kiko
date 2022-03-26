const Discord = require("discord.js");
const { Balance } = require("../../database/schemes");
const functions = require("../../util/functions");
const constants = require("../../../constant.js");

module.exports = {
	name: "balance",
	description: "check user balance",
	category: "💰 : economy",
	options: [
		{
			name: "user",
			description: "choose a user",
			type: 6,
		},
	],
	run: async (client, interaction) => {
		const user = interaction.options.getUser("user") || interaction.user;
		const balance = await functions.getUserData(Balance(), user);
		const paws = balance.get("balance");

		const embed = new Discord.MessageEmbed()
			.setAuthor({ name: `${user.username}'s balance` })
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.setDescription(`**Balance:** :paw: ${paws}`)
			.setColor(constants.color)
			.setFooter({
				text: "*insert patreon link here*",
				iconURL: client.user.displayAvatarURL(),
			});

		interaction.reply({ embeds: [embed] });
	},
};

const Discord = require("discord.js");
const catNames = require("../../database/json/catNames.json");
const constants = require("../../../constant");

module.exports = {
	name: "pet",
	description: "visit your pet!",
	category: "🐈 : cats",
	options: [
		{
			name: "user",
			description: "view this user pet",
			type: 6
		}
	],
	run: async (client, interaction) => {
		const user = interaction.options.getUser("user", false);

		if (!user) {
			const cat = catNames[Math.floor(Math.random() * catNames.length)];

			const embed = new Discord.MessageEmbed()
				.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
				.setDescription(`Your cat is ${cat}`)
				.setColor(constants.color)
				.setTimestamp()
				.setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });

			interaction.reply({ embeds: [embed] });
		}
		else {
			interaction.reply("Error: Work in Progress!");
		}
	}
};
const Discord = require("discord.js");
const commonTags = require("common-tags");
const fs = require("fs");

module.exports = {
	name: "help",
	category: "[✨] utility",
	description: "Returns all commands",
	run: async (client, interaction) => {
		return getAll(client, interaction);
	},
};

function getAll(client, interaction) {
	const embed = new Discord.MessageEmbed()
		.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
		.setColor("#CD1C6C")
		.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
		.setTimestamp()
		.setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
		.setTitle(`${client.user.username} Help Command`);

	const commands = (category) => {
		return client.commands
			.filter(cmd => cmd.category === category)
			.map(cmd => " " + `\`${cmd.name}\``);
	};

	const info = fs.readdirSync("./src/commands")
		.map(cat => commonTags.stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
		.reduce((string, category) => string + "\n\n" + category);

	interaction.reply({ embeds: [embed.setDescription(`<:discord:885340297733746798> [Invite Kiko](https://discord.com/api/oauth2/authorize?client_id=938774709762408490&permissions=0&scope=bot%20applications.commands)\n<:kanna:885340978834198608> [Kanna's Kawaii Klubhouse](https://discord.gg/NcPeGuNEdc)\n\n${info}`)] });
}
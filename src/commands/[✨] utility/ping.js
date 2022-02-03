const Discord = require("discord.js");

module.exports = {
	name: "ping",
	description: "Returns latency and API ping",
	category: "[✨] utility",
	run: async (client, interaction) => {
		const msg = await interaction.channel.send("🏓 Pinging....");

		const embed = new Discord.MessageEmbed()
			.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setColor("#CD1C6C")
			.setTitle("🏓 Pong")
			.addField("Latency", `${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)}ms`)
			.addField("API Latency", `${Math.round(client.ws.ping)}ms`)
			.setTimestamp()
			.setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true }) });

		interaction.editReply({ embeds: [embed] }).then(msg.delete());
	},
};
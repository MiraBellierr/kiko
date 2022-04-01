/**
 *    Copyright 2022 MiraBellierr

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

const Discord = require("discord.js");
const constants = require("../../../constant");

module.exports = {
	name: "ping",
	description: "Returns latency and API ping",
	category: "✨ : utility",
	run: async (client, interaction) => {
		const msg = await interaction.channel.send("🏓 Pinging....");

		const embed = new Discord.MessageEmbed()
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setColor(constants.color)
			.setTitle("🏓 Pong")
			.addField(
				"Latency",
				`${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)}ms`
			)
			.addField("API Latency", `${Math.round(client.ws.ping)}ms`)
			.setTimestamp()
			.setFooter({
				text: client.user.tag,
				iconURL: client.user.displayAvatarURL({ dynamic: true }),
			});

		interaction.reply({ embeds: [embed] }).then(msg.delete());
	},
};

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
const { Balance } = require("../../database/schemes");
const functions = require("../../util/functions");
const constants = require("../../../constant");

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

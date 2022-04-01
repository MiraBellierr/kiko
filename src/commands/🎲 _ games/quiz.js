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
const { Quiz } = require("../../database/schemes");
const functions = require("../../util/functions.js");
const axios = require("axios").default;
const { decode } = require("html-entities");
const constants = require("../../../constant");

module.exports = {
	name: "quiz",
	description: "A quiz about animals",
	category: "🎲 _ games",
	run: async (client, interaction) => {
		const quizData = await functions.getUserData(Quiz(), interaction.user);
		const point = quizData.get("point");

		const fetch = await axios.get(
			"https://opentdb.com/api.php?amount=1&category=27"
		);
		const quiz = fetch.data.results[0];
		const question = decode(quiz.question);
		const row = new Discord.MessageActionRow();
		const embed = new Discord.MessageEmbed();
		const replyEmbed = new Discord.MessageEmbed();

		if (quiz.type !== "boolean") {
			quiz.incorrect_answers.push(quiz.correct_answer);
			functions.shuffleArray(quiz.incorrect_answers);

			row.addComponents([
				new Discord.MessageButton()
					.setCustomId(quiz.incorrect_answers[0])
					.setLabel("A")
					.setStyle("PRIMARY"),
				new Discord.MessageButton()
					.setCustomId(quiz.incorrect_answers[1])
					.setLabel("B")
					.setStyle("PRIMARY"),
				new Discord.MessageButton()
					.setCustomId(quiz.incorrect_answers[2])
					.setLabel("C")
					.setStyle("PRIMARY"),
				new Discord.MessageButton()
					.setCustomId(quiz.incorrect_answers[3])
					.setLabel("D")
					.setStyle("PRIMARY"),
			]);

			embed.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			});
			embed.setTitle(quiz.category);
			embed.setDescription(
				`${question}\n\nA. ${decode(quiz.incorrect_answers[0])}\nB. ${decode(
					quiz.incorrect_answers[1]
				)}\nC. ${decode(quiz.incorrect_answers[2])}\nD. ${decode(
					quiz.incorrect_answers[3]
				)}`
			);
			embed.setColor(constants.color);
			embed.setTimestamp();
		} else {
			row.addComponents([
				new Discord.MessageButton()
					.setCustomId("True")
					.setLabel("True")
					.setStyle("PRIMARY"),
				new Discord.MessageButton()
					.setCustomId("False")
					.setLabel("False")
					.setStyle("PRIMARY"),
			]);

			embed.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			});
			embed.setTitle(quiz.category);
			embed.setDescription(`${question}\n\nTrue or False?`);
			embed.setColor(constants.color);
			embed.setTimestamp();
		}

		const message = await interaction.reply({
			embeds: [embed],
			components: [row],
			fetchReply: true,
		});
		const filter = (i) => i.user.id === interaction.user.id;
		const i = await message.awaitMessageComponent({ filter, time: 15000 });

		if (i.customId === quiz.correct_answer) {
			Quiz().update(
				{ point: point + 1 },
				{ where: { userid: interaction.user.id } }
			);

			replyEmbed.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			});
			replyEmbed.setTitle(quiz.category);
			replyEmbed.setDescription(
				`${question}\n\nCorrect, the answer is ${decode(quiz.correct_answer)}`
			);
			replyEmbed.setColor(constants.color);
			replyEmbed.setFooter({
				text: `You get 1 point. Your current point is ${point + 1}`,
			});
			replyEmbed.setTimestamp();

			interaction.editReply({ embeds: [replyEmbed], components: [] });
		} else {
			Quiz().update(
				{ point: point - 1 },
				{ where: { userid: interaction.user.id } }
			);

			replyEmbed.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			});
			replyEmbed.setTitle(quiz.category);
			replyEmbed.setDescription(
				`${question}\n\nWrong, the correct answer is ${decode(
					quiz.correct_answer
				)}`
			);
			replyEmbed.setColor(constants.color);
			replyEmbed.setFooter({
				text: `-1 point penalty. Your current point is ${point - 1}`,
			});
			replyEmbed.setTimestamp();

			interaction.editReply({ embeds: [replyEmbed], components: [] });
		}
	},
};

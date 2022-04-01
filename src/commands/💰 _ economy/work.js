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

const functions = require("../../util/functions");
const { Balance, Cooldown } = require("../../database/schemes");
const words = ["I'm working for money.", "Today, I want to find a job.", "Time to go working!", "Let me take a break for a while", "Oh no, I'm late for work!", "Boss, I'm done."];

module.exports = {
	name: "work",
	description: "earn paws",
	category: "💰 _ economy",
	run: async (client, interaction) => {
		const timer = await functions.cooldown("work", interaction.user, 3600000);

		if (timer.bool) return interaction.reply(`Please wait **${timer.timeObj.minutes}m ${timer.timeObj.seconds}s** until you can work again!`);

		const word = words[Math.floor(Math.random() * words.length)];

		interaction.reply(`**${interaction.user.username}**\nRetype this following phrase:\n\`${word}\``);

		const filter = m => m.author.id === interaction.user.id;

		const input = await interaction.channel.awaitMessages({
			filter,
			max: 1,
			time: 30000,
		});

		if (!input.size) {
			interaction.followUp("Time is up! You lost the job.");
			return;
		}
		if (input.first().content.toLowerCase() === word.toLowerCase()) {
			const balance = await functions.getUserData(Balance(), interaction.user);
			const earn = Math.floor(Math.random() * 40);
			const earned = balance.get("balance") + earn;

			Balance().update(
				{ balance: earned },
				{ where: { userid: interaction.user.id } }
			);

			Cooldown().update(
				{ work: Date.now() },
				{ where: { userid: interaction.user.id } }
			);

			interaction.followUp(`${functions.getWork(`:paw: ${earn}`)}`);
		}
		else {
			interaction.followUp(`Poor effort ${interaction.user.username}, you lost the job.`);
		}

	},
};

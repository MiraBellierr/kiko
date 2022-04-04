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
const { Balance, Cooldown, Streak } = require("../../database/schemes");

module.exports = {
	name: "daily",
	description: "claim paws daily",
	category: "💰 _ economy",
	run: async (client, interaction) => {
		const timer = await functions.cooldown("daily", interaction.user, 8.64e7);
		const initialTime = performance.now();

		if (timer.bool)
			return interaction.reply(
				`Please wait **${timer.timeObj.hours}h ${timer.timeObj.minutes}m ${timer.timeObj.seconds}s** until you can claim daily again!`
			);

		Cooldown().update(
			{ daily: Date.now() },
			{ where: { userid: interaction.user.id } }
		);

		const balance = await functions.getUserData(Balance(), interaction.user);
		let streak = await functions.getUserData(Streak(), interaction.user);

		if (initialTime - streak.get("elapse") > 8.64e7) {
			Streak().update(
				{ streak: 0 },
				{ where: { userid: interaction.user.id } }
			);

			streak = await functions.getUserData(Streak(), interaction.user);
		}

		let earn = 100;
		const currentStreak = streak.get("streak");

		if (currentStreak % 5 === 0) {
			earn = 500;
			const earned = balance.get("balance") + earn;

			Balance().update(
				{ balance: earned },
				{ where: { userid: interaction.user.id } }
			);
		} else {
			const earned = balance.get("balance") + earn;

			Balance().update(
				{ balance: earned },
				{ where: { userid: interaction.user.id } }
			);
		}

		Streak().update(
			{ streak: currentStreak + 1 },
			{ where: { userid: interaction.user.id } }
		);

		interaction.reply(
			`**${
				interaction.user.username
			}**, here is your :paw: 100. Please come back again tomorrow! You have ${
				streak.get("streak") + 1
			} streak!`
		);
	},
};

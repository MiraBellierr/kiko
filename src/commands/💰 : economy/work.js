const functions = require("../../util/functions");
const { Balance, Cooldown } = require("../../database/schemes");
const words = ["I'm working for money.", "Today, I want to find a job.", "Time to go working!", "Let me take a break for a while", "Oh no, I'm late for work!", "Boss, I'm done."];

module.exports = {
	name: "work",
	description: "earn paws",
	category: "💰 : economy",
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

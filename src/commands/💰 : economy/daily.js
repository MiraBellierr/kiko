const Discord = require("discord.js");
const functions = require("../../util/functions");
const { Balance } = require("../../database/schemes/balance");
const { Cooldown } = require("../../database/schemes/cooldown");

module.exports = {
	name: "daily",
	description: "claim paws daily",
	category: "💰 : economy",
	run: async (client, interaction) => {
		const timer = await functions.cooldown("daily", interaction.user, 8.64e+7);

		if (timer.bool) return interaction.reply(`Please wait **${timer.timeObj.hours}h ${timer.timeObj.minutes}m ${timer.timeObj.seconds}s** until you can claim daily again!`);

		const balance = await functions.getUserData(Balance(), interaction.user);
		const earned = balance.get("balance") + 100;

		Balance().update(
			{ balance: earned },
			{ where: { userid: interaction.user.id } }
		);

		Cooldown().update(
			{ daily: Date.now() },
			{ where: { userid: interaction.user.id } }
		);

		interaction.reply(`**${interaction.user.username}**, here is your :paw: 100. Please come back again tomorrow!`);
	}
};
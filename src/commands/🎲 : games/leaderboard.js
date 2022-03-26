const Discord = require("discord.js");
const { Quiz, Hangman } = require("../../database/schemes");
const constants = require("../../../constant");

module.exports = {
	name: "leaderboard",
	description: "display the game leaderboard",
	category: "🎲 : games",
	options: [
		{
			name: "game",
			description: "game leaderboard to be displayed",
			type: 3,
			required: true,
			choices: [
				{
					name: "quiz",
					value: "Quiz"
				},
				{
					name: "hangman",
					value: "Hangman"
				}
			],
		},
	],
	run: async (client, interaction) => {
		const choice = interaction.options.getString("game");
		const embed = new Discord.MessageEmbed()
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setTitle(`${interaction.options.getString("game")} Leaderboard`)
			.setColor(constants.color)
			.setTimestamp();

		if (choice.toLowerCase() === "quiz") {
			const findAllUser = await Quiz().findAll({
				order: [["point", "DESC"]],
				limit: 10,
			});
			const leaderboard = [];

			await findAllUser.forEach(async (quiz, index) => {
				const user = await client.users.fetch(quiz.dataValues.userid);
				console.log(user.id);

				leaderboard.push(
					`**[${index + 1}]** - ${user.toString()}: ${
						quiz.dataValues.point
					} points`
				);
			});

			console.log(leaderboard);

			embed.setDescription(leaderboard.join("\n"));
		}
		else if (choice.toLowerCase() === "hangman") {
			const findAllUser = await Hangman().findAll({
				order: [["point", "DESC"]],
				limit: 10,
			});
			const leaderboard = [];

			await findAllUser.forEach(async (hangman, index) => {
				const user = await client.users.fetch(hangman.dataValues.userid);
				console.log(user.id);

				leaderboard.push(
					`**[${index + 1}]** - ${user.toString()}: ${
						hangman.dataValues.point
					} points`
				);
			});

			console.log(leaderboard);

			embed.setDescription(leaderboard.join("\n"));
		}

		interaction.reply({ embeds: [embed] });
	},
};

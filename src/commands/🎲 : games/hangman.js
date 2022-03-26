const { stripIndents } = require("common-tags");
const Discord = require("discord.js");
const playing = new Set();
const animals = require("../../database/json/animals.json");
const functions = require("../../util/functions");
const { Balance, Cooldown, Hangman } = require("../../database/schemes");
const Constants = require("../../../constant");

module.exports = {
	name: "hangman",
	description: "Guess a word game",
	category: "🎲 : games",
	run: async (client, interaction) => {
		const user = interaction.user;

		const balance = await functions.getUserData(Balance(), user);
		const hangman = await functions.getUserData(Hangman(), user);
		const timer = await functions.cooldown("hangman", user, 15000);

		if (timer.bool) {
			return interaction.reply(`**${interaction.user.username}**, please wait **${timer.timeObj.seconds}s** till you can play again!`);
		}

		Cooldown().update(
			{ hangman: Date.now() },
			{ where: { userid: user.id } }
		);

		const category = "Animal";

		if (playing.has(interaction.channel.id)) return interaction.reply("Only one game may be occuring per channel.");

		playing.add(interaction.channel.id);

		try {
			const word = animals.animals[Math.floor(Math.random() * animals.animals.length)];
			let points = 0;
			let displayText = null;
			let guessed = false;
			const confirmation = [];
			const incorrect = [];
			const display = new Array(word.length).fill("_");
            
			interaction.reply("-");

			for (let i = 0; i < word.length; i++) {
				if (word.charAt(i) === " " || word.charAt(i) === "-" || word.charAt(i) === "'" || word.charAt(i) === "," || word.charAt(i) === ".") {
					display[i] = word.charAt(i);

					confirmation.push(word.charAt(i));
				}
			}

			while (word.length !== confirmation.length && points < 6) {
				const embed = new Discord.MessageEmbed()
					.setColor(Constants.color)
					.setTitle(`Hangman game - Theme: ${category}`)
					.setDescription(stripIndents`
                    ${displayText === null ? "Here we go!" : displayText ? "Good job!" : "Nope!"}
                    \`${display.join(" ")}\`. Which letter do you choose?
                    Incorrect Tries: ${incorrect.join(", ") || "None"}
                    \`\`\`
                    . ┌─────┐
                    . ┃      ┋
                    . ┃      ${points > 0 ? "O" : ""}
                    . ┃     ${points > 2 ? "/" : " "}${points > 1 ? "|" : ""}${points > 3 ? "\\" : ""}
                    . ┃     ${points > 4 ? "/" : ""}${points > 5 ? "\\" : ""}
                     =============
                       \`\`\`
                    `);

				const m = await interaction.channel.send({ embeds: [embed] });

				const filter = m => {
					const choice = m.content.toLowerCase();

					return m.author.id === user.id && !confirmation.includes(choice) && !incorrect.includes(choice);
				};

				const guess = await interaction.channel.awaitMessages({
					filter,
					max: 1,
					time: 30000
				});

				if (!guess.size) {
					playing.delete(interaction.channel.id);

					return interaction.channel.send(`Sorry. time is up! The answer was **${word}**!`);
				}

				m.delete();

				const choice = guess.first().content.toLowerCase();

				if (choice === "end") break;
				if (choice.length > 1 && choice == word) {
					guessed = true;
					break;
				}
				else if (word.includes(choice)) {
					displayText = true;

					for (let i = 0; i < word.length; i++) {
						if (word.charAt(i) !== choice) continue;

						confirmation.push(word.charAt(i));
                        
						display[i] = word.charAt(i);
					}
				}
				else {
					displayText = false;

					if (choice.length == 1) incorrect.push(choice);

					points++;
				}
			}

			playing.delete(interaction.channel.id);

			if (word.length === confirmation.length || guessed) {
				Balance().update(
					{ balance: balance.get("balance") + 20 },
					{ where: { userid: user.id } }
				);

				Hangman().update(
					{ point: hangman.get("point") + 1 },
					{ where: { userid: user.id } }
				);

				return interaction.channel.send(`You are correct! It was **${word}**. You won :paw: **20**!`);
			}

			Hangman().update(
				{ point: hangman.get("point") - 1 },
				{ where: { userid: user.id } }
			);

			interaction.channel.send(`You could not guess it. The answer was **${word}**!`);

		} catch (e) {
			playing.delete(interaction.channel.id);

			console.log(e);

			interaction.channel.send(`Oh no, an error ocurred: (\`${e.message}\`)`);
		}
	}
};

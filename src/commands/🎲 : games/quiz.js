const Discord = require("discord.js");
const { Quiz } = require("../../database/schemes/quiz.js");
const functions = require("../../util/functions.js");
const axios = require("axios").default;
const { decode } = require("html-entities");

module.exports = {
  name: "quiz",
  description: "A quiz about animals",
  category: "🎲 : games",
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
      embed.setColor("#CD1C6C");
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
      embed.setColor("#CD1C6C");
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
      replyEmbed.setColor("#CD1C6C");
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
      replyEmbed.setColor("#CD1C6C");
      replyEmbed.setFooter({
        text: `-1 point penalty. Your current point is ${point - 1}`,
      });
      replyEmbed.setTimestamp();

      interaction.editReply({ embeds: [replyEmbed], components: [] });
    }
  },
};

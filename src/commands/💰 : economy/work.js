const Discord = require("discord.js");
const { Balance } = require("../../database/schemes/balance");
const functions = require("../../util/functions");
const { Cooldown } = require("../../database/schemes/cooldown");

module.exports = {
  name: "work",
  description: "earn paws",
  category: "💰 : economy",
  run: async (client, interaction) => {
    const timer = await functions.cooldown("work", interaction.user, 3600000);

    const timeoutEmbed = new Discord.MessageEmbed()
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("#CD1C6C")
      .setTimestamp()
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    if (timer.bool) {
      timeoutEmbed.setDescription(
        `Please wait **${timer.timeObj.minutes} minutes ${timer.timeObj.seconds} seconds** to work again!`
      );

      interaction.reply({ embeds: [timeoutEmbed] });

      return;
    }

    const balance = await functions.getUserData(Balance(), interaction.user);
    const random = Math.floor(Math.random() * 100);
    const earned = balance.get("balance") + random;

    Balance().update(
      { balance: earned },
      { where: { userid: interaction.user.id } }
    );

    Cooldown().update(
      { work: Date.now() },
      { where: { userid: interaction.user.id } }
    );

    const embed = new Discord.MessageEmbed()
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(`You earned :paw: ${random}`)
      .setColor("#CD1C6C")
      .setTimestamp()
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    interaction.reply({ embeds: [embed] });
  },
};

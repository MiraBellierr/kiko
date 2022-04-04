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
const catNames = require("../../database/json/catNames.json");
const constants = require("../../../constant");

module.exports = {
  name: "pet",
  description: "visit your pet!",
  category: "🐈 _ cats",
  options: [
    {
      name: "user",
      description: "view this user pet",
      type: 6,
    },
  ],
  run: async (client, interaction) => {
    const user = interaction.options.getUser("user", false);

    if (!user) {
      const cat = catNames[Math.floor(Math.random() * catNames.length)];

      const embed = new Discord.MessageEmbed()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(`Your cat is ${cat}`)
        .setColor(constants.color)
        .setTimestamp()
        .setFooter({
          text: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      interaction.reply({ embeds: [embed] });
    } else {
      interaction.reply("Error: Work in Progress!");
    }
  },
};

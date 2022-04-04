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
const commonTags = require("common-tags");
const fs = require("fs");
const constants = require("../../../constant");

module.exports = {
  name: "help",
  category: "✨ _ utility",
  description: "Returns all commands",
  run: async (client, interaction) => {
    return getAll(client, interaction);
  },
};

function getAll(client, interaction) {
  const embed = new Discord.MessageEmbed()
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
    })
    .setColor(constants.color)
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter({
      text: client.user.tag,
      iconURL: client.user.displayAvatarURL({ dynamic: true }),
    })
    .setTitle(`${client.user.username} Help Command`);

  const commands = (category) => {
    return client.commands
      .filter((cmd) => cmd.category === category)
      .map((cmd) => " " + `\`${cmd.name}\``);
  };

  const info = fs
    .readdirSync("./src/commands")
    .map(
      (cat) =>
        commonTags.stripIndents`ʚ₊ **${cat}** ᓚᘏᗢ ₊˚*!!* \n${commands(cat)}`
    )
    .reduce((string, category) => string + "\n\n" + category);

  interaction.reply({
    embeds: [
      embed.setDescription(
        `<:discord:885340297733746798> [Invite Kiko](https://discord.com/api/oauth2/authorize?client_id=938774709762408490&permissions=0&scope=bot%20applications.commands)\n<:kanna:885340978834198608> [Kanna's Kawaii Klubhouse](https://discord.gg/NcPeGuNEdc)\n\n${info}`
      ),
    ],
  });
}

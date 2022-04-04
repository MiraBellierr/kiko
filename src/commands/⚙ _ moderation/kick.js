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

module.exports = {
  name: "kick",
  category: "⚙ _ moderation",
  description: "Kick a member",
  options: [
    {
      name: "member",
      description: "a member to kick",
      type: 6,
      required: true,
    },
    {
      name: "reason",
      description: "a reason for kick",
      type: 3,
    },
  ],
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has("KICK_MEMBERS"))
      return interaction.reply(
        "Sorry, you don't have `KICK_MEMBERS` permission to use this command."
      );
    if (!interaction.guild.me.permissions.has("KICK_MEMBERS"))
      return interaction.reply(
        "I don't have `KICK_MEMBERS` permission to continue this command."
      );

    const member = interaction.options.getMember("member");

    if (!member.kickable)
      return interaction.reply(
        "I can't kick this member. Please make sure my role is higher than a member role."
      );
    if (
      member.roles.highest.position >
        interaction.member.roles.highest.position &&
      interaction.guild.ownerId !== interaction.user.id
    )
      return interaction.reply(
        "Please make sure your role is higher than a member you want to kick."
      );

    let reason = interaction.options.getString("reason");

    if (!reason) reason = "No reason";

    member.send(
      `Hi there, you have been kicked from ${interaction.guild.name} for ${reason}.`
    );
    member.kick(reason);

    interaction.reply(
      `Successfully kicked ${member.user.tag} for ${reason}, by ${interaction.user.username}`
    );
  },
};

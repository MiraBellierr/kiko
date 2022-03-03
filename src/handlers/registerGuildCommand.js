const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = async function (client, guildId) {
  // eslint-disable-next-line no-unused-vars
  const commands = client.commands.map(({ run, category, ...data }) => data);

  // eslint-disable-next-line no-undef
  const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

  (async () => {
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationGuildCommands(client.user.id, guildId), {
        body: commands,
      });

      console.log(
        `Successfully reloaded application (/) commands for ${
          client.guilds.cache.get(guildId).name
        }`
      );
    } catch (error) {
      console.log(error);
    }
  })();
};

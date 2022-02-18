module.exports = async (client, interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	if (!client.commands.has(interaction.commandName)) return;

	if (command) {
		command.run(client, interaction);
	}	
};
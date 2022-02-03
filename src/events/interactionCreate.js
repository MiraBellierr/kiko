module.exports = async (client, interaction) => {
	if (!interaction.isCommand()) return;

	await interaction.deferReply();

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	if (!client.commands.has(interaction.commandName)) return;

	if (command) {
		command.run(client, interaction);
	}	
};
const Discord = require("discord.js");
const functions = require("../../util/functions.js");
const Pagination = require("../../util/pagination");
const constants = require("../../../constant.js");


module.exports = {
	name: "whois",
	description: "Returns information about a user.",
	category: "📚 : info",
	options: [
		{
			name: "user",
			description: "The user to get information about.",
			type: 6,
			required: true,
		},
	],
	run: async (client, interaction) => {
		const user = await client.users.fetch(
			interaction.options.getUser("user", true),
			{ force: true }
		);

		const pages = [];

		const created = functions.formatDate(user.createdTimestamp);
		const flags =
      user.flags.toArray().length > 0 ? user.flags.toArray().map(flag => `${flag.toLowerCase().split("_").map(str => `${str.replace(/(\s+[^a-z0-9]+|[^a-z0-9']+\s+|[\s&\\/]|^)+(\w)/g, str.charAt(0).toUpperCase())}`).join(" ")}`).join(", ") : "None";

		const memberEmbed = new Discord.MessageEmbed();

		const userEmbed = new Discord.MessageEmbed()
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.setTitle("User Information")
			.setColor(constants.color)
			.setImage(user.bannerURL({ size: 4096, dynamic: true }))
			.setDescription(
				`**• ID:** ${user.id}\n**• Discriminator:** ${
					user.discriminator
				}\n**• Username**: ${user.username}\n**• Tag:** ${
					user.tag
				}\n**• Mention:** ${user.toString()}\n**• Account Type:** ${
					user.bot ? "Bot" : "Human"
				}\n**• Account created at**: ${created}\n**• Flags**: ${flags}`
			);

		pages.push(userEmbed);

		const userAvatar = new Discord.MessageEmbed()
			.setTitle("User Avatar")
			.setColor(constants.color)
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }));

		if (await interaction.guild.members.fetch(user)) {
			const member = await interaction.guild.members.fetch(user);

			const premiumSince = functions.formatDate(member.premiumSince);
			const joined = functions.formatDate(member.joinedAt);
			const roles =
        member.roles.cache.map((r) => r.toString()).join(", ") || "None";

			memberEmbed.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			});
			memberEmbed.setThumbnail(member.displayAvatarURL({ dynamic: true }));
			memberEmbed.setTitle("Member Information");
			memberEmbed.setColor(constants.color);
			memberEmbed.setDescription(
				`**• Nickname:** ${
					member.nickname === null ? "None" : member.nickname
				}\n**• Display Name:** ${
					member.displayName
				}\n**• Display Hex Color:** ${member.displayHexColor.toUpperCase()}\n**• Manageable by this bot:** ${
					member.manageable ? "Yes" : "No"
				}\n**• bannable by this bot:** ${
					member.bannable ? "Yes" : "No"
				}\n**• Kickable by this bot:** ${
					member.kickable ? "Yes" : "No"
				}\n**• Nitro Booster Since:** ${
					member.premiumSince === null ? "Not a Nitro Booster" : premiumSince
				}\n**• Joined At:** ${joined}`
			);
			memberEmbed.addField("Roles", roles);

			pages.push(memberEmbed);

			const memberAvatar = new Discord.MessageEmbed()
				.setTitle("Member Avatar")
				.setColor(constants.color)
				.setAuthor({
					name: interaction.user.username,
					iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
				})
				.setImage(member.displayAvatarURL({ dynamic: true, size: 4096 }));

			pages.push(userAvatar);
			pages.push(memberAvatar);
		} else {
			pages.push(userAvatar);
		}

		pages.map((embed, index) =>
			embed.setFooter({
				text: `Page ${index + 1}/${pages.length} | ${client.user.username}`,
				iconURL: client.user.displayAvatarURL(),
			})
		);

		const paginated = new Pagination.InteractionPaginate(
			client,
			interaction,
			pages
		);
		paginated.init();
	},
};

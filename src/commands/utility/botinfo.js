const Discord = require("discord.js");
const functions = require("../../util/functions.js");
const osu = require("node-os-utils");
const si = require("systeminformation");
const process = require("process");

module.exports = {
	name: "botinfo",
	description: "sends info about the bot",
	category: "utility",
	run: async (client, interaction) => {
		const clientApplication = await client.application.fetch();
		const owner = `${clientApplication.owner.username}#${clientApplication.owner.discriminator}`;

		const cpu = osu.cpu;
		const drive = osu.drive;
		const mem = osu.mem;
		const os = osu.os;

		const cpuCount = cpu.count();
		let cpuUsagePercentage;
		let driveInfo;
		let memInfo;
		let osInfo;
		let processor;

		await cpu.usage().then(cpuPercentage => {
			cpuUsagePercentage = cpuPercentage;
		});

		await drive.info().then(info => {
			driveInfo = info;
		});

		await mem.info().then(info => {
			memInfo = info;
		});

		await os.oos().then(info => {
			osInfo = info;
		});

		await si.cpu()
			.then(data => processor = data)
			.catch(error => console.error(error));

		let totalSeconds = (client.uptime / 1000);
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		const minutes = Math.floor(totalSeconds / 60);
		const uptime = `${days} days, ${hours} hours, ${minutes} minutes`;

		const embed = new Discord.MessageEmbed()
			.setAuthor({ name: "Bot Information" })
			.setThumbnail(client.user.avatarURL())
			.setColor("#CD1C6C")
			.setDescription(`**• Developer:** ${owner}\n**• Tag:** ${client.user.tag}\n**• Cached Members:** ${client.users.cache.size.toLocaleString()}\n**• Total Members:** ${client.guilds.cache.map(guild => guild.memberCount).reduce((accumulator, currentValue) => accumulator + currentValue).toLocaleString()}\n**• Total Servers:** ${client.guilds.cache.size.toLocaleString()}\n**• Total Shards:** ${client.shard.count.toLocaleString()}\n**• Total Channels:** ${client.channels.cache.size.toLocaleString()}\n**• Total Emojis:** ${client.emojis.cache.size.toLocaleString()}\n**• Created At:** ${functions.formatDate(client.user.createdAt)}\n**• Library:** Discord.js v${Discord.version}\n**• JRE:** Node ${process.version}\n**• Websocket Status:** ${client.ws.status}\n**• Websocket Ping:** ${client.ws.ping.toLocaleString()}ms\n**• CPU Count:** ${cpuCount}\n**• CPU Usage:** ${cpuUsagePercentage.toFixed(2)}%\n**• Drive Usage:** ${driveInfo.usedGb}GB (${driveInfo.usedPercentage}%)\n**• Memory Usage:** ${(memInfo.usedMemMb / 1000).toFixed(2)}GB (${(100 - memInfo.freeMemPercentage).toFixed(2)}%)\n**• Operating System:** ${osInfo}\n**• Processor:** ${processor.manufacturer} ${processor.brand}\n**• Ready At:** ${functions.formatDate(client.readyAt)}\n**• Uptime:** ${uptime}`);

		interaction.reply({ embeds: [embed] });
	}
};
require("dotenv").config();
const { ShardingManager } = require("discord.js");

// eslint-disable-next-line no-undef
const manager = new ShardingManager("./src/bot.js", { token: process.env.BOT_TOKEN });

manager.on("shardCreate", (shard) => console.log(`Launched shard ${shard.id}`));

manager.spawn();
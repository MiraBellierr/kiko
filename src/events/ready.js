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

const registerCommand = require("../handlers/registerCommand");
const registerGuildCommand = require("../handlers/registerGuildCommand");

module.exports = async (client) => {
	client.user.setPresence({
		activities: [
			{
				name: `${client.guilds.cache.size.toLocaleString()} servers ✨ | Slash command!`,
				type: "WATCHING",
			},
		],
		status: "idle",
	});
	console.log(`Hi, ${client.user.username} is now online!`);

	if (client.user.id === "938774709762408490") registerCommand(client);
	else registerGuildCommand(client, "873441703330185247");
};

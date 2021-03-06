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

const { readdirSync } = require("fs");
const Ascii = require("ascii-table");

const table = new Ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
	readdirSync("./src/commands/").forEach((dir) => {
		const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
			file.endsWith(".js")
		);

		for (const file of commands) {
			const pull = require(`../commands/${dir}/${file}`);

			if (pull.name) {
				client.commands.set(pull.name, pull);
				table.addRow(file, "✅");
			} else {
				table.addRow(
					file,
					"❎ -> missing a help.name, or help.name is not a string."
				);
				continue;
			}
		}
	});

	console.log(table.toString());
};

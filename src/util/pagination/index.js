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

const InteractionPaginate = require("./InteractionPaginate");
const { Interaction } = require("discord.js");

Interaction.prototype.paginate = async function (pages, options, emojis) {
	const paginated = new InteractionPaginate(
		this.client,
		this,
		pages,
		options,
		emojis
	);
	await paginated.init();
};

module.exports = { InteractionPaginate };

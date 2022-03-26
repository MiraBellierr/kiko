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

require("colors");
const { MessageActionRow, MessageButton } = require("discord.js");

function Paginate(
	client,
	interaction,
	pages,
	options = {
		time: 1000 * 60 * 3,
	},
	emojis = {
		backward: "869052152331509781",
		stop: "869052152260214794",
		forward: "869052152012746783",
	}
) {
	this.client = client;
	this.interaction = interaction;
	this.pages = pages;
	this.options = options;
	this.emojis = emojis;

	if (!this.interaction)
		throw new TypeError("Specify the message to be processed on.");
	if (!this.pages) throw new TypeError("Specify pages to be shown");
	if (!this.options.time) throw new TypeError("Specify a reaction time.");
	if (!this.emojis.backward || !this.emojis.stop || !this.emojis.forward)
		throw new TypeError(
			"Specify emojis to skip the page, return to previous page and stop the process."
		);

	this.addPage = function (page) {
		if (!page) throw new TypeError("Specify the page to be added");
		try {
			if (Array.isArray(page)) {
				this.pages = this.pages.concat(page);
			} else {
				this.pages.push(page);
			}
			return { pages: this.pages };
		} catch (err) {
			throw new TypeError(err);
		}
	};

	this.editEmoji = function (name, value) {
		if (!name) throw new TypeError("Specify the emoji name to be edited");
		if (!value) throw new TypeError("Specify an emoji.");
		switch (name) {
		case "backward":
			this.emojis[name] = value;
			break;
		case "stop":
			this.emojis[name] = value;
			break;
		case "forward":
			this.emojis[name] = value;
			break;
		default:
			throw new TypeError("Specify a valid emoji name to be edited.");
		}
	};

	this.init = async function () {
		let page = 1;
		const row = new MessageActionRow().addComponents([
			new MessageButton()
				.setCustomId("backward")
				.setLabel("Back")
				.setStyle("PRIMARY")
				.setEmoji(this.emojis.backward),
			new MessageButton()
				.setCustomId("stop")
				.setLabel("Stop")
				.setStyle("DANGER")
				.setEmoji(this.emojis.stop),
			new MessageButton()
				.setCustomId("forward")
				.setLabel("Next")
				.setStyle("PRIMARY")
				.setEmoji(this.emojis.forward),
		]);

		const disabledForward = new MessageActionRow().addComponents([
			new MessageButton()
				.setCustomId("backward")
				.setLabel("Back")
				.setStyle("PRIMARY")
				.setEmoji(this.emojis.backward),
			new MessageButton()
				.setCustomId("stop")
				.setLabel("Stop")
				.setStyle("DANGER")
				.setEmoji(this.emojis.stop),
			new MessageButton()
				.setCustomId("forward")
				.setLabel("Next")
				.setStyle("PRIMARY")
				.setDisabled(true)
				.setEmoji(this.emojis.forward),
		]);

		const disabledBackward = new MessageActionRow().addComponents([
			new MessageButton()
				.setCustomId("backward")
				.setLabel("Back")
				.setStyle("PRIMARY")
				.setDisabled(true)
				.setEmoji(this.emojis.backward),
			new MessageButton()
				.setCustomId("stop")
				.setLabel("Stop")
				.setStyle("DANGER")
				.setEmoji(this.emojis.stop),
			new MessageButton()
				.setCustomId("forward")
				.setLabel("Next")
				.setStyle("PRIMARY")
				.setEmoji(this.emojis.forward),
		]);

		let message;

		if (typeof this.pages[page - 1] == "object") {
			message = await this.interaction.reply({
				embeds: [this.pages[page - 1]],
				components: [disabledBackward],
				fetchReply: true,
			});
		} else {
			message = await this.interaction.reply({
				content: `${[this.pages[page - 1]]}`,
				components: [disabledBackward],
				fetchReply: true,
			});
		}

		const backwardFilter = (inter) =>
			inter.customId === "backward" &&
      inter.user.id === this.interaction.user.id;
		const stopFilter = (inter) =>
			inter.customId === "stop" && inter.user.id === this.interaction.user.id;
		const forwardFilter = (inter) =>
			inter.customId === "forward" &&
      inter.user.id === this.interaction.user.id;

		const backward = message.createMessageComponentCollector({
			filter: backwardFilter,
			time: this.options.time,
			componenttype: "BUTTON",
		});

		const stop = message.createMessageComponentCollector({
			filter: stopFilter,
			time: this.options.time,
			componentType: "BUTTON",
		});

		const forward = message.createMessageComponentCollector({
			filter: forwardFilter,
			time: this.options.time,
			componentType: "BUTTON",
		});

		backward.on("collect", async (i) => {
			page--;

			if (page === 1) {
				if (typeof this.pages[page - 1] == "object") {
					await i.update({
						embeds: [this.pages[page - 1]],
						components: [disabledBackward],
					});
				} else {
					await i.update({
						content: this.pages[page - 1],
						components: [disabledBackward],
					});
				}
			} else {
				if (typeof this.pages[page - 1] == "object") {
					await i.update({
						embeds: [this.pages[page - 1]],
						components: [row],
					});
				} else {
					await i.update({
						content: this.pages[page - 1],
						components: [row],
					});
				}
			}
		});

		stop.on("collect", async () => {
			await interaction.deleteReply();

			backward.stop("ENDED");
			forward.stop("ENDED");
			stop.stop("ENDED");
		});

		forward.on("collect", async (i) => {
			page++;

			if (page === this.pages.length) {
				if (typeof this.pages[page - 1] == "object") {
					await i.update({
						embeds: [this.pages[page - 1]],
						components: [disabledForward],
					});
				} else {
					await i.update({
						content: this.pages[page - 1],
						components: [disabledForward],
					});
				}
			} else {
				if (typeof this.pages[page - 1] == "object") {
					await i.update({
						embeds: [this.pages[page - 1]],
						components: [row],
					});
				} else {
					await i.update({
						content: this.pages[page - 1],
						components: [row],
					});
				}
			}
		});

		backward.on("end", (collected, reason) => {
			if (reason != "time" && reason != "ENDED") throw new TypeError(reason);
		});

		stop.on("end", (collected, reason) => {
			if (reason != "time" && reason != "ENDED") throw new Error(reason);
		});

		forward.on("end", (collected, reason) => {
			if (reason != "time" && reason != "ENDED") throw new Error(reason);
		});

		return {
			backwardCollector: backward,
			stopCollector: stop,
			forwardCollector: forward,
		};
	};
}

module.exports = Paginate;

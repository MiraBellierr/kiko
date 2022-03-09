const { Cooldown } = require("../database/schemes/cooldown");

module.exports = {
	formatDate: function (date) {
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC",
		};

		return new Intl.DateTimeFormat("en-US", options).format(date);
	},
	formatTime: function (date) {
		const options = {
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
		};

		return new Intl.DateTimeFormat("en-US", options).format(date);
	},
	getUserData: async (Model, user) => {
		if (!(await Model.findOne({ where: { userid: user.id } }))) {
			await Model.create({
				userid: user.id,
			});
		}

		return await Model.findOne({ where: { userid: user.id } });
	},
	shuffleArray: function (array) {
		let currentIndex = array.length,
			randomIndex;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	},

	cooldown: async (prop, user, time) => {
		const ms = await import("parse-ms");
		const cooldown = await module.exports.getUserData(Cooldown(), user);
		const timer = cooldown.get(prop);

		if (timer !== null && time - (Date.now() - timer) > 0) {
			const timeObj = ms.default(time - (Date.now() - timer));
			return {
				bool: true,
				timeObj,
			};
		} else {
			return {
				bool: false,
				timeObj: null,
			};
		}
	},
};

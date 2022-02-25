module.exports = {
	formatDate: function(date) {
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC"
		};

		return new Intl.DateTimeFormat("en-US", options).format(date);
	},
	formatTime: function(date) {
		const options = {
			hour: "numeric",
			minute: "numeric",
			second: "numeric"
		};

		return new Intl.DateTimeFormat("en-US", options).format(date);
	},
	getUserData: async (Model, user) => {
		if (!await Model.findOne({ where: { userid: user.id } })) {
			await Model.create({
				userid: user.id
			});
		}

		return await Model.findOne({ where: { userid: user.id } });
	},
	shuffleArray: function(array) {
		let currentIndex = array.length, randomIndex;

		while(currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

		return array;
	},
};
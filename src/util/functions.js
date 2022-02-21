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
	}
};
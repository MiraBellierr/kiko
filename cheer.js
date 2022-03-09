const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const cats = require("./src/database/json/cats.json");
const catNames = require("./src/database/json/catNames.json");

function scrapeWebpages() {
	console.log("Scraping the webpages...");
	setTimeout(function () {}, 1000);
	catNames.forEach(async (e) => {
		const url = `https://allaboutcats.com/cat-breeds/${e
			.toLowerCase()
			.replace(" ", "-")}`;

		console.log(`Checking ${url}`);
		axios
			.get(url)
			.then((res) => {
				console.log(`${res.status}`);
			})
			.catch(() => {
				return console.log("Couldn't find the webpage");
			});

		console.log(`Scraping ${url} ...`);

		try {
			const { data } = await axios.get(url);
			const $ = cheerio.load(data);

			const datas = [];
			$(".breed-data-item-value").each(function () {
				datas.push($(this).text());
			});

			const characteristics = [];
			datas
				.splice(9)
				.forEach((e) =>
					characteristics.push(e.trim().split(" ")[1].split("%")[1] + "%")
				);

			const name = $(".breed-title").text().split(" ").slice(0, -1).join(" ");

			let about = [];
			$(".breed-about-left p").each(function () {
				about.push($(this).text());
			});
			about = about.join("\n\n");

			let nutrition = [];
			$(".breed-tab-content-nutrition p").each(function () {
				nutrition.push($(this).text());
			});
			nutrition = nutrition.join("\n\n");

			let grooming = [];
			$(".breed-tab-content-grooming p").each(function () {
				grooming.push($(this).text());
			});
			grooming = grooming.join("\n\n");

			let exercise = [];
			$(".breed-tab-content-exercise p").each(function () {
				exercise.push($(this).text());
			});
			exercise = exercise.join("\n\n");

			let health = [];
			$(".breed-tab-content-health p").each(function () {
				health.push($(this).text());
			});
			health = health.join("\n\n");

			let history = [];
			$(".breed-history-left p").each(function () {
				history.push($(this).text());
			});
			history = history.join("\n\n");

			let didYouKnow = [];
			$(".breed-fact p").each(function () {
				didYouKnow.push($(this).text());
			});

			const value = [];
			const theBreedStandard = {};
			$(".breed-standard-item-title").each(function () {
				value.push($(this).text().toLowerCase());
			});

			$(".breed-standard-item-value").each(function (i) {
				theBreedStandard[value[i]] = $(this).text();
			});

			const images = [];
			$(".breed-image").each(function () {
				if (images.find((e) => e === $(this).attr("data-src"))) return;
				images.push($(this).attr("data-src"));
			});

			cats[name] = {
				name: $(".breed-title").text(),
				temperament: datas[0],
				origin: datas[1],
				other_names: datas[2],
				group: datas[3],
				height: datas[4],
				bodyLength: datas[5],
				weight: datas[6],
				lifeExpectancy: datas[7],
				price: datas[8],
				characteristics: {
					affectionLevel: characteristics[0],
					activityLevel: characteristics[1],
					petFriendly: characteristics[2],
					kidFriendly: characteristics[3],
					sociability: characteristics[4],
					intelligence: characteristics[5],
					playfulness: characteristics[6],
					independence: characteristics[7],
					vocality: characteristics[8],
					grooming: characteristics[9],
				},
				about,
				care: {
					nutrition,
					grooming,
					exercise,
					health,
				},
				history,
				didYouKnow,
				theBreedStandard: {
					body: theBreedStandard.body,
					head: theBreedStandard.head,
					eyes: theBreedStandard.eyes,
					ears: theBreedStandard.ears,
					legsAndPaws: theBreedStandard["legs & paws"],
					coat: theBreedStandard.coat,
					tail: theBreedStandard.tail,
					color: theBreedStandard.color,
				},
				images,
			};

			fs.writeFile(
				"./src/database/json/cats.json",
				JSON.stringify(cats, null, 2),
				(err) => {
					if (err) {
						console.error(err);
						return;
					}
					console.log(`Successfully written ${name} to file`);
				}
			);
		} catch (err) {
			console.error(err);
		}
	});
}

scrapeWebpages();

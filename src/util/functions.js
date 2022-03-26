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
	
	getWork: function(coins) {
		const works = [
			`You work as a fortune cookie writer and earn ${coins}`,
			`You mow the lawn of your friend Stacy's mother. She's a nice lady, who pays ${coins} for your services.`,
			`You take a nice stroll around the park, looking down and finding ${coins}. Congrats!`,
			`You see someone struggling to lift a box into their car, you rush over to help them before they hurt themselves. After helping them, they graciously give you ${coins}`,
			`You work as a smarties expert and earn ${coins}`,
			`You get a commission request, the payment is ${coins}.`,
			`You deliver 1,000 pizzas for a YouTube video, and make ${coins}!`,
			`You work as a professional cat-petter and earn ${coins}`,
			`You work as a beaver expert and earn ${coins}`,
			`You clean off the tables and get paid ${coins}`,
			`You work for a private military company, earning ${coins}`,
			`You worked in the cafeteria and have earned ${coins}`,
			`You work as a human statue and earn ${coins}`,
			`You worked your very best at a printing press which was hiring and earned your well deserved ${coins}!`,
			`Somehow you managed to get a job. Milking space cows. Here's ${coins}.`,
			`You take an hour to patch a broken water pipe in the yard and earn ${coins}`,
			`You are hired by the Mojave Express to deliver a package to The King in Freeside. You are paid ${coins}`,
			`A good day's work as an apprentice at the local clinic earns you ${coins}.`,
			`You dabbed so hard that even your mother is proud! You make ${coins} off of donations.`,
			`You carefully clean the spring lock suits and receive ${coins}`,
			`You work as an extra for Avengers 4. You didn't feel so good, but you got ${coins}.`,
			`You work as a professional Minecraft hacker. You manage to rake in ${coins}`,
			`You take part in a Civil War battle and earn ${coins} for your team winning!`,
			`You work as a janitor and earn ${coins}`,
			`You did absolutely nothing and still managed to get paid ${coins}.`,
			`You clean off the animatronics and get paid ${coins}`,
			`You work as a voice actor for SpongeBob and managed to gain ${coins}`,
			`You fail at work, but your boss pays you ${coins} out of pity.`,
			`You sell your crab for ${coins}, you monster`,
			`You save a survivor from a group of zombies. He gives you ${coins}.`,
			`You work as the namer of clouds and earn ${coins}`,
			`You went to work and gained ${coins}`,
			`You receive a check of ${coins} after having done some clever business with a friend in the markets.`,
			`A drunk man pays you ${coins} to walk backwards.`,
			`You are hired as a whiteboard marker salesperson and earn ${coins}`,
			`You work as a wine taster and earn ${coins}`,
			`You work as a dog food taster and earn ${coins}`,
			`You work at a lamp store and earn ${coins}`,
			`You helped people at the retirement home with their bingo game. They paid you ${coins} for the hard work`,
			`The demand for mobile games has increased so you create a new game full of micro-transactions. You earn a total of ${coins} off your new game.`,
			`You cleaned 200 toilets in the prison. The lazy janitor thanked you and gave you ${coins}.`,
			`You work as a professional cleaner. After hiding the body you're handed ${coins}.`,
			`You work as a body pillow factory salesman on the internet for real weebs, the weebs gave you ${coins}`,
			`You worked overtime for ${coins}`,
			`You work as a pilot and earn ${coins}`,
			`You work from 9 to 5 in a law firm as an accountant, going through profits and expenditure accounts. At the end of the day, the papers earns you ${coins}`,
			`Your work at a market selling apples with a shop clerk for a day. They pay you ${coins} for helping them out.`,
			`You work as a Discord bot developer and earn ${coins}`,
			`You go through your bag, and decide to sell some useless items you don't need. It turns out all that junk was worth ${coins}.`,
			`You did a 30 minute workout. While jogging you found ${coins} on the floor.`,
			`You serve the customers and receive ${coins}`,
			`You got hired as a stripper! You work that pole and make ${coins}`,
			`You work as a child birth educator and earn ${coins}`,
			`Somehow you managed to get a job. Milking space cows. Here's ${coins}.`,
			`You work as an elementary school teacher and earn ${coins}`,
			`You get fired for sleeping on the job, but found ${coins} on the way back home!`,
			`You worked as a substitute teacher in a school and earned ${coins}. The students loved you!`,
			`You've worked on a farm cultivating wheat from dawn to dusk. The land lord pays you ${coins} for your struggles.`,
			`You got featured and won ${coins}`,
			`You work 10 minutes at a local Pizza Hut. You earned ${coins}.`,
			`Instead of going to work, you decided to look for money on the ground. Fortunately enough, you found ${coins}`,
			`You work as a cookie cutter and earn ${coins}.`,
			`You work as an Irish dancer and earn ${coins}`,
			`Taxes collected! You have gained ${coins}`,
			`You come home full of sweat after a hard day of boxing, the sponsors give you ${coins}`,
			`You worked as a Bride Kidnapping Expert, for that you were paid ${coins}!`,
			`You worked for the Police and earned ${coins}`,
			`You work as a plumber to fix a blonde housewife's broken pipes and earn ${coins}`,
			`You did some social work for a good cause ! You received ${coins} for your contributions !`,
			`You bought and sold items and profited ${coins}`,
			`You press some buttons on a keyboard, gaining ${coins}`,
			`You sign up for a DJ job and you play Country Road. You make ${coins} just for playing that song, so nice pick!`,
			`You work as a meerkat behaviour consultant and earn ${coins}`,
			`You work as a director of sand bags and earn ${coins}`,
			`Admins are being nice (for once) and grant you ${coins}.`,
			`You work as an iceberg mover and earn ${coins}`,
			`You work as a police officer and earn ${coins}`,
			`You found ${coins} lying on the floor in General Chat!`,
			`You create and launch a game on Roblox, it becomes a hit! You get money from people buying early access, in game passes and currency in game, you convert the Robux you earn into server money you got ${coins}!`,
			`You work as a beefeater and earn ${coins}`,
			`Great job! You work as a professional professional and got ${coins}`,
			`You clean poop off the stalls at Walmart and get ${coins}`,
			`You work as an egg and earn ${coins}`,
			`You work as a professional apologiser and earn ${coins}`,
			`You baked some nice cookies for all, here is ${coins}`,
			`You spend all day creating graphic designs for YouTube channels and Twitter accounts just for a measly ${coins}.`,
			`A sudden gust of wind blows ${coins} in your direction.`,
			`You got more than 1,000 subscribers on YouTube, your last video made you really famous, and then comes the YouTube money ${coins}`,
			`You work as a zombie for The Walking Dead AMC show and earn ${coins}`,
			`You drove new recruits to the base and you got paid ${coins} for doing it`,
			`You got out of bed. Have ${coins}`,
			`You work as a head receiver and earn ${coins}`,
			`You work as a snake milker and earn ${coins}`,
			`You are kidnapped and taken to an underground coliseum where you fought off monsters with people you've never met before. You earn ${coins}, albeit reluctantly.`,
			`You work at a winery and crush grapes for awhile. You are paid ${coins} and given a bottle of wine.`,
			`You worked for a game studio as their program team member. A measly ${coins} was earned.`,
			`You found ${coins} on the floor.`,
			`You help clean up a local bar, the bar owner pays you ${coins} for your work.`,
			`You work as an experienced bra fitter and earn ${coins}`,
			`You clean off the chairs and get paid ${coins}`,
			`You actually finished the plate of vegetables that your parents made you eat! You were awarded ${coins}.`,
			`You work as an actor for the Emoji Movie, and get paid ${coins}.`,
			`You help herd cows for a farmer. For your help he pays you ${coins}.`,
			`You and your mariachi band play music at a wedding for ${coins}`,
			`You gave yourself ${coins} that you didn't even have! What is this wizardry...`,
			`You run a relatively popular Tumblr blog and make ${coins} from ad revenue.`,
			`You work as a DJ in Ibiza and earn ${coins}`,
			`You work as a dumpster diver and earn ${coins}`,
			`You worked as a human windshield wiper in India for ${coins}`,
			`You got cloned for science. You earned ${coins}`,
			`You drive women to the store for ${coins}`,
			`You put on a spring lock suit and entertain the customers. You receive ${coins}`,
			`You begin to code a game you have been thinking about for a while, and your friends give you ${coins} to help fund the project!`,
			`Work at the ice-cream shop of your childhood dreams and earn ${coins}`,
			`You work as an experienced boner and earn ${coins}`,
			`You eat bananas for a living and get ${coins}`,
			`You shine people's shoes in class and they give you ${coins}.`,
			`You take your dog for a walk and gain ${coins}`,
			`You have a successful YouTube channel and make ${coins} for that sweet, sweet AD revenue`,
			`You work as a window cleaner for the Gherkin in London and earn ${coins}`,
			`You try to find out how many licks it takes to get to the center of a Tootsie Pop. Turns out it's 3 and a crunch. The research team pays you ${coins}.`,
			`You work as a breath odour evaluator and earn ${coins}`,
			`You worked at the office overtime for ${coins}`,
			`Your job as a fart collector is very interesting and earns you ${coins}.`,
			`You work as the head of potatoes and earn ${coins}`,
			`You sell Girl Scout Cookies and earn ${coins}.`,
			`You work as a body double for Shakira. And your hips really don’t lie. You earn ${coins}.`,
			`You work as an ostrich baby sitter and earn ${coins}`,
			`You work as a professional cock fighter and earn ${coins}`,
			`You work as a circus clown and earn ${coins}.`,
			`You paint a lovely watercolor Moon and sell it at a local art fair for ${coins}.`,
			`You sweep the floor and get paid ${coins}`,
			`You battled and gained ${coins}.`,
			`You work as a children's toy tester and earn ${coins}`,
			`You do some work around the house for ${coins}`,
			`You did some odd jobs in the city and earned ${coins}. Good job!`,
			`You work as a space lawyer and earn ${coins}`,
			`You spent an 8 hour shift walking around in 10 inch heels and a nice dress handing out flyers to rude customers. Your feet are killing you, and you can't wait to get that dress off. At least you got paid ${coins} for it.`,
			`You work as a cleaner for the Royal Palace and earn ${coins}`,
			`You hastily wipe down the Café counters. Your boss pays you ${coins}.`,
			`You work as a plus sized model and earn ${coins}`,
			`You work as a bush pruner for Donald Trump and earn ${coins}`,
			`You solved the mystery of the Cholera Outbreak and have been rewarded by the government with a sum of ${coins}.`,
			`You work as a flatulence smell reduction underwear maker and earn ${coins}`,
			`Someone adopted a puppy from your shelter and got ${coins} for it!`,
			`You work as a Kanna bot developer and earn ${coins}`,
			`You work as a comedian and earn ${coins}`,
			`You work as a sandcastle builder and earn ${coins}`,
			`You work as a professional worker and earn ${coins}.`,
			`You posted something to the subreddit! You’ve earned ${coins}!`,
			`You work as a pumpkin painter and are surprised to find ${coins} stashed inside one of them.`,
			`You complete a daily quest that takes you about 3 hours and you gain ${coins}! Even though you lost half of your ammo, broke all of your guns, and your spirit is all but crushed`,
			`You work as a toy manufacturer and sell toys to kids for ${coins}`,
			`You work as a taxi driver and earn ${coins}`,
			`Somebody once told me the world was gonna roll me, I ain't the sharpest tool in the sh- oh, uh- you did something good and got ${coins} I think...`,
			`While you were searching for Pokémon in the tall grass, you found ${coins}!`,
			`You find ${coins} randomly lying in the gutter`,
			`You walk dogs for ${coins}.`,
			`You become a game developer and raised ${coins} for charity.`,
			`You work as an IMAX screen cleaner and earn ${coins}`,
			`Your shift at the Kwik-E mart got you a total of ${coins}`,
			`You work as a part time game programmer. You rake in ${coins}`,
			`You work as a bounty hunter and earn ${coins}`,
			`You defended an old lady from robbers. You got a smooch on the cheek and earned ${coins}`,
			`You work as a help desk technician and earn ${coins}`,
			`You work as the president and earn ${coins}`,
			`You sell V-bucks and make ${coins}!`,
			`You clean off the counters and get paid ${coins}`,
			`You bake cupcakes and receive ${coins}`,
			`After a long day of tolerating your annoying co-workers, your boss pays you extra and you earn ${coins}!`,
			`You start up a very small company that made near no money before you sold it for ${coins}.`,
			`You work as an eel ecologist and earn ${coins}`,
			`You overslept and miss work, but a buddy clocked you in so you got paid ${coins}.`,
			`You drive a bus and give free rides. Heres your tip ${coins}.`,
			`You dig around in your yard and gain ${coins}`,
			`You made a great pun! Take this ${coins}.`,
			`You work as a dog breath sniffer and earn ${coins}`,
			`You enter a fidget spinner spinning contest and out-spin the other fidget spinner spinners. You make ${coins}.`,
			`You milk a cow for ${coins}`,
			`You worked hard at Burger King and earned ${coins}`,
			`You work as a personal shopper and earn ${coins}`,
		];

		const work = works[Math.floor(Math.random() * works.length)];

		return work;
	},
};

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

const Discord = require("discord.js");
const cats = require("../../database/json/cats.json");
const { InteractionPaginate } = require("../../util/pagination");
const constants = require("../../../constant");

module.exports = {
  name: "breedinfo",
  description: "Returns information about cat breed",
  category: "🐈 _ cats",
  options: [
    {
      name: "breed",
      description: "The breed of cat you want to know about",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const name = interaction.options.getString("breed");
    const search = [];

    Object.keys(cats).forEach((cat) => {
      if (cat.toLowerCase().includes(name.toLowerCase())) {
        search.push(cat);
      }
    });

    if (search.length > 1) {
      const searchEmbed = new Discord.MessageEmbed()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle(`Search: ${name}`)
        .setDescription(
          `Found ${search.length} results\n\n- ${search.join("\n- ")}`
        )
        .setColor(constants.color)
        .setFooter({
          text: client.user.tag,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      interaction.reply({ embeds: [searchEmbed] });

      return;
    } else if (search.length === 1) {
      const cat = cats[search[0]];

      const page1 = new Discord.MessageEmbed()
        .setAuthor({
          name: "Cat Breed Info",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle(`${cat.name} | Overview`)
        .setDescription(
          `**• Temperament:** ${cat.temperament}\n**• Origin:** ${cat.origin}\n**• Other Names:** ${cat.other_names}\n**• Group:** ${cat.group}\n**• Height:** ${cat.height}\n**• Body Length:** ${cat.bodyLength}\n**• Weight:** ${cat.weight}\n**• Life Expectancy:** ${cat.lifeExpectancy}\n**• Price:** ${cat.price}`
        )
        .setColor(constants.color)
        .setTimestamp()
        .setImage(cat.images[0])
        .setFooter({
          text: "Page 1/7 | allaboutcats.com",
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });

      const page2 = new Discord.MessageEmbed()
        .setAuthor({
          name: "Cat Breed Info",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle(`${cat.name} | Characteristics`)
        .addFields([
          {
            name: "Affection Level",
            value: `${getProgbar(
              Number.parseInt(cat.characteristics.affectionLevel.split("%")[0])
            )}`,
          },
          {
            name: "Activity Level",
            value: `${getProgbar(
              Number.parseInt(cat.characteristics.activityLevel.split("%")[0])
            )}`,
          },
          {
            name: "Pet-Friendly",
            value: `${getProgbar(
              Number.parseInt(cat.characteristics.petFriendly.split("%")[0])
            )}`,
          },
          {
            name: "Kid-Friendly",
            value: `${getProgbar(
              Number.parseInt(cat.characteristics.affectionLevel.split("%")[0])
            )}`,
          },
          {
            name: "Sociability",
            value: `${getProgbar(
              Number.parseInt(cat.characteristics.sociability.split("%")[0])
            )}`,
          },
          {
            name: "Intelligence",
            value: `${getProgbar(
              Number.parseInt(cat.characteristics.intelligence.split("%")[0])
            )}`,
          },
          {
            name: "Playfulness",
            value: `${getProgbar(
              Number.parseInt(cat.characteristics.playfulness.split("%")[0])
            )}`,
          },
          {
            name: "Independence",
            value: `${getProgbar(
              Number.parseInt(cat.characteristics.independence.split("%")[0])
            )}`,
          },
          {
            name: "Vocality",
            value: `${getProgbar(
              Number.parseInt(cat.characteristics.vocality.split("%")[0])
            )}`,
          },
          {
            name: "Grooming",
            value: `${getProgbar(
              Number.parseInt(cat.characteristics.grooming.split("%")[0])
            )}`,
          },
        ])
        .setColor(constants.color)
        .setTimestamp()
        .setImage(cat.images[0])
        .setFooter({
          text: "Page 2/7 | allaboutcats.com",
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });

      const page3 = new Discord.MessageEmbed()
        .setAuthor({
          name: "Cat Breed Info",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle(`${cat.name} | About`)
        .setDescription(`${cat.about}`)
        .setColor(constants.color)
        .setTimestamp()
        .setImage(cat.images[1])
        .setFooter({
          text: "Page 3/7 | allaboutcats.com",
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });

      const page4 = new Discord.MessageEmbed()
        .setAuthor({
          name: "Cat Breed Info",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle(`${cat.name} | Care`)
        .setDescription(
          `**__Nutrition__**\n${cat.care.nutrition}\n\n**__Grooming__**\n${cat.care.grooming}\n\n**__Exercise__**\n${cat.care.exercise}\n\n**__Health__**\n${cat.care.health}`
        )
        .setColor(constants.color)
        .setTimestamp()
        .setImage(cat.images[2])
        .setFooter({
          text: "Page 4/7 | allaboutcats.com",
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });

      const page5 = new Discord.MessageEmbed()
        .setAuthor({
          name: "Cat Breed Info",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle(`${cat.name} | History`)
        .setDescription(`${cat.history}`)
        .setColor(constants.color)
        .setTimestamp()
        .setImage(cat.images[3])
        .setFooter({
          text: "Page 5/7 | allaboutcats.com",
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });

      const page6 = new Discord.MessageEmbed()
        .setAuthor({
          name: "Cat Breed Info",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle(`${cat.name} | Did You Know?`)
        .setDescription(
          `${cat.didYouKnow
            .map((item, index) => `${index + 1}. ${item}`)
            .join("\n\n")}`
        )
        .setColor(constants.color)
        .setTimestamp()
        .setFooter({
          text: "Page 6/7 | allaboutcats.com",
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });

      const page7 = new Discord.MessageEmbed()
        .setAuthor({
          name: "Cat Breed Info",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle(`${cat.name} | The Breed Standard`)
        .setDescription(
          `**__Body__**\n${cat.theBreedStandard.body}\n\n**__Head__**\n${cat.theBreedStandard.head}\n\n**__Ears__**\n${cat.theBreedStandard.ears}\n\n**__Eyes__**\n${cat.theBreedStandard.eyes}\n\n**__Legs & Paws__**\n${cat.theBreedStandard.legsAndPaws}\n\n**__Tail__**\n${cat.theBreedStandard.tail}\n\n**__Coat__**\n${cat.theBreedStandard.coat}\n\n**__Color__**\n${cat.theBreedStandard.color}`
        )
        .setColor(constants.color)
        .setImage(cat.images[4])
        .setTimestamp()
        .setFooter({
          text: "Page 7/7 | allaboutcats.com",
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });

      const pages = [page1, page2, page3, page4, page5, page6, page7];

      const paginated = new InteractionPaginate(client, interaction, pages);
      paginated.init();
    } else {
      const noResultEmbed = new Discord.MessageEmbed()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTitle(`No results found for ${name}`)
        .setDescription("Try: American, Persian, Siamese, or Maine")
        .setColor(constants.color)
        .setFooter({
          text: client.user.tag,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      interaction.reply({ embeds: [noResultEmbed] });

      return;
    }
  },
};

function getProgbar(current) {
  const curBer = Math.floor((current / 100) * 10);
  let str = "";
  for (let i = 0; i < 22; i++) {
    str += i < curBer ? "💙" : " ";
  }
  return str;
}

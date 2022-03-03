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

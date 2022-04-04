# Contributing to kiko

The following is a set of guidelines for contributing to Kannabotto repo. The bot is written in **Javascript**

## Table of contents

- [How can you contribute?](#how-can-you-contribute)
- [Style guides](#style-guides)
- [Running the bot locally](#running-the-bot-locally)
- [How does the bot work?](#how-does-the-bot-work)

## How can you contribute?

### Reporting bugs and sharing your ideas

If you have an idea or you have found a bug in the bot, you can [open an issue](https://github.com/MiraBellierr/kiko/issues) on GitHub. Make sure it's not already on the list.

### Contributing code

First create a fork of the [MiraBellierr/kiko](https://github.com/MiraBellierr/kiko). If you are just getting started please see [How does the bot work](#how-does-the-bot-work). This will give you basic understanding of the code of the bot. To test the bot locally see [Running the bot locally](#running-the-bot-locally).
When pushing commits and creating pull requests please follow the [Style guides](#style-guides).

Please also use a formatter to make sure the code is correctly formatted:

```shell
npm install --save-dev --save-exact prettier
```

to format all files with Prettier:

```shell
npx prettier --write .
```

## Style guides

### Git commit messages

- Use the present tense. (`Use toilet paper` not `Used toilet paper`)
- Use the imperative mood. (`Flush the toilet` not `Flushes the toilet`)
- Use this format in pull request merge commits: `Name (#Pull)`. (example: `Wash hands (#16)`)

- Use `kebab-case` (aka. `hyphen-case`, `dash-case`)
  - Separate words with hyphens. (`branch-name` not `BranchName` or `branch_name`)
  - Don't include characters other than letters, numbers and hyphens.
  - Use lowercase letters. (`cool-branch` not `Cool-Branch`)
- Make them descriptive. (`fix-windows-install` not `fix-bugs`)
- Keep them short. (`install-lint` not `install-eslinter-to-keep-code-clean`)

## Running the bot locally

To run the bot on your machine first install all the required dependencies using:

```shell
npm install
```

Then, you will have to set up a bot on [Discord Developers Portal](https://discordapp.com/developers) and add it on your Discord server.

Then, create `.env` file in your repo folder.

`.env` file should contain your bot token:

```
BOT_TOKEN=your-bot-token-here
```

## How does the bot work?

`bot.js` is the main file in the bot. It handles connecting to the Discord API via **Discord.js** using `BOT_TOKEN` as the bot token (see [Running the bot locally](#running-the-bot-locally)). It also loads all the commands end events.

### Events

All client instance events are stored in the `events` folder. They are js modules exporting function that is triggered from an event. The parameters are `client` and event callback parameters. (Example: The `message` callback takes `(client, message)`).

### Commands

All commands are stored in `commands`. They export (using `module.exports`) a `run` **function** taking three arguments:

- `client` - Discord client (same as in events)
- `interaction` - Instance of Discord `CommandInteraction` class - slash command

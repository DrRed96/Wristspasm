const hypixelRebornAPI = require("../../contracts/API/HypixelRebornAPI.js");
const { getUsername } = require("../../contracts/API/PlayerDBAPI.js");
const { writeAt } = require("../../contracts/helperFunctions.js");
const WristSpasmError = require("../../contracts/errorHandler.js");
// eslint-disable-next-line no-unused-vars
const { EmbedBuilder, CommandInteraction } = require("discord.js");
const fs = require("fs");
const config = require("../../../config.json");
const Logger = require("../.././Logger.js");
const { ErrorEmbed, Embed, SuccessEmbed } = require("../../contracts/embedHandler.js");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);
        if (command === undefined) {
          return;
        }

        if ((command.name == "inactivity") === false) {
          await interaction.deferReply({ ephemeral: false }).catch(() => {});
        }

        if (command.moderatorOnly === true && isModerator(interaction) === false) {
          throw new WristSpasmError("You don't have permission to use this command.");
        }

        if (command.requiresBot === true && isBotOnline() === false) {
          throw new WristSpasmError("Bot doesn't seem to be connected to Hypixel. Please try again.");
        }

        Logger.discordMessage(`${interaction.user.username} - [${interaction.commandName}]`);
        await command.execute(interaction);
      }

      if (interaction.isButton()) {
        await interaction.deferReply({ ephemeral: true });

        // ? Apply Button
        if (interaction.customId.includes("guild.apply_button")) {
          const applyCommand = interaction.client.commands.get("apply");

          if (applyCommand === undefined) {
            throw new WristSpasmError("Could not find apply command! Please contact an administrator.");
          }

          await applyCommand.execute(interaction);
        } else if (interaction.customId.startsWith("TICKET_CLOSE_")) {
          const ticketCloseCommand = interaction.client.commands.get("close-ticket");

          if (ticketCloseCommand === undefined) {
            throw new WristSpasmError("Could not find close-ticket command! Please contact an administrator.");
          }

          await ticketCloseCommand.execute(interaction);
        } else if (interaction.customId.startsWith("TICKET_OPEN_")) {
          const ticketOpenCommand = interaction.client.commands.get("open-ticket");

          if (ticketOpenCommand === undefined) {
            throw new WristSpasmError("Could not find open-ticket command! Please contact an administrator.");
          }

          await ticketOpenCommand.execute(interaction, interaction.customId.split("TICKET_OPEN_")[1]);
        }
      }

      // ? Inactivity Form
      if (interaction.customId === "inactivityform") {
        const time = interaction.fields.getTextInputValue("inactivitytime");
        const reason = interaction.fields.getTextInputValue("inactivityreason") || "None";

        const linked = JSON.parse(fs.readFileSync("data/linked.json", "utf8"));
        if (linked === undefined) {
          throw new WristSpasmError("No verification data found. Please contact an administrator.");
        }

        const uuid = linked.find((x) => x.id === interaction.user.id)?.uuid;
        if (uuid === undefined) {
          throw new WristSpasmError("You are no verified. Please verify using /verify.");
        }

        const [guild, username] = await Promise.all([
          hypixelRebornAPI.getGuild("name", "WristSpasm"),
          getUsername(linked[interaction.user.id]),
        ]);

        if (guild === undefined) {
          throw new WristSpasmError("Guild data not found. Please contact an administrator.");
        }

        if (isNaN(time) || time < 1) {
          throw new WristSpasmError("Please enter a valid number.");
        }

        const formattedTime = time * 86400;
        if (formattedTime > 21 * 86400) {
          throw new WristSpasmError(
            "You can only request inactivity for 21 days or less. Please contact an administrator if you need more time."
          );
        }

        const expiration = (new Date().getTime() / 1000 + formattedTime).toFixed(0);
        const date = (new Date().getTime() / 1000).toFixed(0);
        const inactivityEmbed = new Embed(
          5763719,
          "Inactivity Request",
          `\`Username:\` ${username}\n\`Requested:\` <t:${date}>\n\`Expiration:\` <t:${expiration}:R>\n\`Reason:\` ${reason}`
        );
        inactivityEmbed.setThumbnail(`https://www.mc-heads.net/avatar/${username}`);

        const channel = interaction.client.channels.cache.get(config.discord.channels.inactivity);
        if (channel === undefined) {
          throw new WristSpasmError("Inactivity channel not found. Please contact an administrator.");
        }

        await channel.send({ embeds: [inactivityEmbed] });

        writeAt("data/inactivity.json", uuid, {
          username: username,
          uuid: uuid,
          discord: interaction.user.tag,
          discord_id: interaction.user.id,
          requested: (new Date().getTime() / 1000).toFixed(0),
          requested_formatted: new Date().toLocaleString(),
          expiration: expiration,
          expiration_formatted: new Date(expiration * 1000).toLocaleString(),
          reason: reason,
        });

        const inactivityResponse = new SuccessEmbed(
          `Inactivity request has been successfully sent to the guild staff.`
        );

        await interaction.reply({ embeds: [inactivityResponse], ephemeral: true });
      }
    } catch (error) {
      console.log(error);

      const errrorMessage =
        error instanceof WristSpasmError
          ? ""
          : "Please try again later. The error has been sent to the Developers.\n\n";

      const errorEmbed = new ErrorEmbed(`${errrorMessage}\`\`\`${error}\`\`\``);

      await interaction.editReply({ embeds: [errorEmbed] });

      if (error instanceof WristSpasmError === false) {
        const username = interaction.user.username ?? interaction.user.tag ?? "Unknown";
        const commandOptions = JSON.stringify(interaction.options.data) ?? "Unknown";
        const commandName = interaction.commandName ?? "Unknown";
        const errorStack = error.stack ?? error ?? "Unknown";
        const userID = interaction.user.id ?? "Unknown";

        const errorLog = new ErrorEmbed(
          `Command: \`${commandName}\`\nOptions: \`${commandOptions}\`\nUser ID: \`${userID}\`\nUser: \`${username}\`\n\`\`\`${errorStack}\`\`\``
        );
        interaction.client.channels.cache.get(config.discord.channels.loggingChannel).send({
          content: `<@&987936050649391194>`,
          embeds: [errorLog],
        });
      }
    }
  },
};

function isBotOnline() {
  if (bot === undefined && bot._client.chat === undefined) {
    return;
  }

  return true;
}

function isModerator(interaction) {
  const user = interaction.member;
  const userRoles = user.roles.cache.map((role) => role.id);

  if (
    config.discord.commands.checkPerms === true &&
    !(userRoles.includes(config.discord.commands.commandRole) || config.discord.commands.users.includes(user.id))
  ) {
    return false;
  }

  return true;
}

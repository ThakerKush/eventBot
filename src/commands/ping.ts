import { Client, CommandInteraction } from "discord.js";

export const name = "ping";
export const aliases = ["p"];
export const showHelp = false;
export const description = "Ping command";
export const options = [];

export const slashExecute = async (
  client: Client,
  interaction: CommandInteraction
) => {
  console.log("HEREEEE!");

  return interaction.reply(
    `🏓Latency is ${Date.now() - interaction.createdTimestamp}ms`
  );
};

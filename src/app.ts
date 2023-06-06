import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { DC_TOKEN } from "./config/index";
import fs from "fs";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});
declare module "discord.js" {
  export interface Client {
    commands: Collection<unknown, any>;
    config: {
      prefix: string;
      playing: string;
    };
  }
}

client.config = {
  prefix: "/",
  playing: "In development",
};

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
async function loadCommands() {
  client.commands = new Collection();

  const commandFiles = fs.readdirSync(`${__dirname}/commands`);

  for (const file of commandFiles) {
    try {
      console.log("does this run first?");
      const command: any = await import(`${__dirname}/commands/${file}`); //Change now
      client.commands.set(command.name, command);
    } catch (error) {
      console.log(error);
    }
  }
}
loadCommands();
client.on("message", function (messages) {
  if (messages.content.toLocaleLowerCase() === "hello")
    messages.channel.send("hello" + " " + messages.author.username); //reply hello word message with senders name
});

const color = {
  white: "\x1B[0m",
  grey: "\x1B[2m",
  green: "\x1B[32m",
  FgRed: "\x1b[31m",
};
client.login(DC_TOKEN);

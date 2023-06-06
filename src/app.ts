import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { DC_TOKEN } from "./config/index";
import fs from "fs";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
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

const color = {
  white: "\x1B[0m",
  grey: "\x1B[2m",
  green: "\x1B[32m",
  FgRed: "\x1b[31m",
};

client.config = {
  prefix: "/",
  playing: "In development",
};

client.commands = new Collection();

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, (interaction) => {
  
  console.log("INTERACTATION HIT!");
  console.log(interaction.isChatInputCommand());

  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
});


const loadEvents = () => {
  console.log(`-> loading Events ......`);
  return new Promise<void>(async (resolve, reject) => {
    const events = fs.readdirSync(`${__dirname}/events/`);

    console.log(`+--------------------------------+`);
    for (const file of events) {
      try {
        const event = await import(`${__dirname}/events/${file}`);

        // Take everything before the dot,
        // So if the filename is `testFile.ts`, the variable will be `testFile`
        const eventName = file.split(".")[0];

        client.on(eventName, event.default.bind(null, client));

        //padEnd just adds 17 chars of empty space so it looks good
        console.log(`| Loaded event ${eventName.padEnd(17, " ")} |`);
      } catch (error) {
        reject(error);
      }
    }
    console.log(`+--------------------------------+`);
    console.log(`${color.grey}-- loading Events finished --${color.white}`);

    resolve();
  });
};

const loadCommands = () => {
  console.log(`-> loading Commands ......`);
  return new Promise<void>(async (resolve, reject) => {
    const jsFiles = fs.readdirSync(`${__dirname}/commands/`);

    console.log(`+---------------------------+`);
    for (const file of jsFiles) {
      try {
        const command = await import(`${__dirname}/commands/${file}`);
        client.commands.set(command.name.toLowerCase(), command);
        console.log(
          `| Loaded Command ${command.name.toLowerCase().padEnd(10, " ")} |`
        );
      } catch (error) {
        reject(error);
      }
    }
    console.log(`+---------------------------+`);
    console.log(`${color.grey}-- loading Commands finished --${color.white}`);

    resolve();
  });
};

Promise.resolve()
  .then(() => loadEvents())
  .then(() => loadCommands())
  .then(() => {
    console.log(`${color.green}*** All loaded successfully ***${color.white}`);
    client.login(DC_TOKEN);
  });

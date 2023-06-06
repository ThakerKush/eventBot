export const name = "ping";
export const description = "Replies With Pong!";
export const execute = async (interaction) => {
  await interaction.reply(
    `🏓Latency is ${Date.now() - interaction.createdTimestamp}ms`
  );
};

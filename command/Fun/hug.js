const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "hug",
  description: "Hug someone",
  category: "Fun",
  usage: "(User)",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to hug",
      required: true,
    },
    {
      type: 3,
      name: "words",
      description: "The words you want to say",
      required: false,
    },
  ],
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    const user = interaction.guild.members.cache.get(args[0]);
    words = args[1];
    if (user.id === interaction.user.id) {
      return await interaction.followUp("You can't hug yourself");
    }
    const embed = new MessageEmbed()
      .setDescription(`${interaction.user} **hugs** ${user}`)
      .setImage(
        `https://media.tenor.com/images/ca88f916b116711c60bb23b8eb608694/tenor.gif`
      )
      .setColor(client.color)
      .setTimestamp()
      .setFooter(`Made by ${client.author}`);
    if (words) {
      embed.addField("Words:", reason);
    }
    await interaction
      .followUp({ embeds: [embed] })
      .then(msg => msg.react("💕"));
  },
};
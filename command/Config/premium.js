const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "premiumserver",
  category: "Config",
  description: "Add premium to a server",
  Premium: true,
  options: [
    {
      type: 5,
      name: "choice",
      description: "Whether add or remove premium server",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    try {
      console.log(interaction.options.getBoolean("choice"));
      const user = await client.data.getUser(interaction.user.id);
      const guild = await client.data.getGuild(interaction.guild.id);
      if (interaction.options.getBoolean("choice") == true) {
        if (guild.Premium == true) {
          return client.serr(interaction, "Config", "premium", 506);
        }
        if (
          (user.Tier == 1 && user.PremiumServers.length >= 5) ||
          (user.Tier == 2 && user.PremiumServers.length >= 2) ||
          (user.Tier == 3 && user.PremiumServers.length >= 0)
        ) {
          return client.serr(interaction, "Config", "premium", 505);
        } else {
          await client.data.setPremium(interaction.guild.id, "true");
          await client.data.pushGuild(
            interaction.user.id,
            interaction.guild.id,
            "push"
          );
          interaction.followUp({
            embeds: [
              new MessageEmbed()
                .setTitle("Success!")
                .setDescription(
                  `Premium added to **${interaction.guild.name}**! \n`
                )
                .setFooter("Thank you for supporting Cath!")
                .setColor("GREEN")
                .setTimestamp()
                .setAuthor(
                  interaction.user.tag,
                  interaction.user.displayAvatarURL({ dynamic: true })
                ),
            ],
          });
          client.channels.cache.get(client.ServerLog).send({
            embeds: [
              new MessageEmbed()
                .setTitle("New Premium Server")
                .addField(
                  "Server Info",
                  `**>Server Name**: \n${interaction.guild.name}
                  **>Server ID**: \n${interaction.guild.id}
                  **>Server Member Count**: \n${interaction.guild.memberCount}`
                )
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setColor("GREEN"),
            ],
          });
        }
      } else {
        if (guild.Premium == false) {
          return client.serr(interaction, "Config", "premium", 507);
        }
        if (!user.PremiumServers.includes(interaction.guild.id))
          return client.serr(interaction, "Config", "premium", 509);
        else {
          await client.data.setPremium(interaction.guild.id, "false");
          await client.data.pushGuild(
            interaction.user.id,
            interaction.guild.id,
            "splice"
          );
          interaction.followUp({
            embeds: [
              new MessageEmbed()
                .setTitle("Removed!")
                .setDescription(
                  `Premium removed from **${interaction.guild.name}**! \n`
                )
                .setColor("RED")
                .setTimestamp()
                .setAuthor(
                  interaction.user.tag,
                  interaction.user.displayAvatarURL({ dynamic: true })
                ),
            ],
          });
          client.channels.cache.get(client.ServerLog).send({
            embeds: [
              new MessageEmbed()
                .setTitle("Premium Server Removed")
                .addField(
                  "Server Info",
                  `**>Server Name**: \n${interaction.guild.name}
                  **>Server ID**: \n${interaction.guild.id}
                  **>Server Member Count**: \n${interaction.guild.memberCount}`
                )
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setColor("RED"),
            ],
          });
        }
      }
    } catch (e) {
      console.log(e);
      return client.serr(interaction, "Config", "premium", 999);
    }
  },
};

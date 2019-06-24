const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    // !report @user <reason for reporting>

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let reason = args.join(" ").slice(22); // 22 is the number of chars in a userID

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel) 
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

    let reportschannel = message.guild.channels.find(`name`, "rsp2irit"); //rename the reports in quotes to the name of the report channel of your server.
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.")

    message.delete().catch(O_o=>{}); // i need to find out what this line means
    reportschannel.send(reportEmbed);
}

module.exports.help = {
    name: "report",
    aliases: []
}
const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    // !ban @user <reason for ban>

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do buddy.");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person cant be banned!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason, bReason");

    let incidentChannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    incidentChannel.send(banEmbed);

    return;
}

module.exports.help = {
    name: "ban",
    aliases: []
}
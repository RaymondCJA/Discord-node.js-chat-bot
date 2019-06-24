const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const serverCreatedDate = new Date(message.guild.createdTimestamp);
    serverCreatedDate1 = serverCreatedDate.toDateString();

    //member count stuff
    var userCount = message.guild.memberCount;
    var onlineCount1 = message.guild.members.filter(m => m.presence.status === 'online').size
    var onlineCount2 = message.guild.members.filter(m => m.presence.status === 'idle').size
    var onlineCount3 = message.guild.members.filter(m => m.presence.status === 'dnd').size

    var totalOnlineCount = String(onlineCount1 + onlineCount2 + onlineCount3);
    var totalCount = String(message.guild.memberCount);

    //roles count stuff
    var roleCount = message.guild.roles.size

    var totalMembers = totalOnlineCount + "/" + totalCount;

    //emoji stuff

    var emojiArray = []
    message.guild.emojis.forEach(element => {
        emojiArray.push(element);
    });

    emojiString = emojiArray.join(" ");
    trimmedEmojiString = emojiString.substring(0,1020);

    //richembed

    let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name, true)
        .addField("Created On", serverCreatedDate1, true) 
        .addField("Total Members", totalMembers, true)
        .addField("Total roles", roleCount, true)
        if(message.guild.emojis.size != 0){
        serverembed.addField("Emojis", trimmedEmojiString, true)};

        return message.channel.send(serverembed);
}

module.exports.help = {
    name: "serverinfo",
    aliases: ["sinfo", "si"]
}
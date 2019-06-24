const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    //NEEDS A REMIND SOMEONE/me
    // !remind @user(/@role?/me) 1s/m/h/d
    //arg 4[3] will be for the message in the reminder
    let toremind = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!toremind) return message.reply("Couldn't find user.");

    /*if(args[0] == "me") {
        toremind = message.guild.member.id;
        console.log("worked");
    }*/

    let remindtime = args[1];
    if(!remindtime) return message.reply("Please specify a reminder duration");

    message.reply(`<@${toremind.id}>'s reminder has been set for ${ms(ms(remindtime))}`);

    setTimeout(function(){
        message.channel.send(`<@${toremind.id}> wake up!`);
    }, ms(remindtime));
}


module.exports.help = {
    name: "remind",
    aliases: ["remindme", "reminder"]
}
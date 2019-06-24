const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    //!warn @user <reason>
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("you do not have sufficient permissions");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("specified user not found");

    message.reply(`<@${wUser.id}> has ${warnlevel} warnings.`)

}

module.exports.help = {
    name: "warnlevel"
}

const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    message.channel.send("Hello!");

}

module.exports.help = {
    name: "hello",
    aliases: []
}
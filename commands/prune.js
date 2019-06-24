const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.");
  if(!args[0]) return message.channel.send("please specify the number of messages to be pruned");
  messagesHeld = Number(args[0]);
  messagesToBeDeleted = String(messagesHeld + 1); // messagesHeld is a STRING
  message.channel.bulkDelete(messagesToBeDeleted).then(() => {
  message.channel.send(`${args[0]} messages have been pruned.`).then(msg => msg.delete(1000));
});

}

module.exports.help = {
  name: "prune",
  aliases: []
}
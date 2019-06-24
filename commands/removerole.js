const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // !removerole @user <role name>            <<< case sensitive

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("you do not have sufficient permissions to do that."); //change to manage role or equiv later
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("specified user not found");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("please specify a role");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("specified role not found");

    if(!rMember.roles.has(gRole.id)) return message.reply("they do not have that role");
    await(rMember.removeRole(gRole.id));

    try{
      await rMember.send(`you have lost the ${gRole.name} role`);
    }catch(e){
      message.channel.send(`Hey <@${rMember.id}>, you have lost the ${gRole.name} role, said here as dms are closed.`);
    }
}

module.exports.help = {
    name: "removerole",
    aliases: []
}
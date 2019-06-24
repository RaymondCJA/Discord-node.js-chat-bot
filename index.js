const botconfig = require("./botconfig.json");
//const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name) 
        });
        
        ///props.help.aliases.forEach(alias => {
        ///   bot.commands.set(alias, props.help.name);
        });
    });
///});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    //bot.user.setGame("some random game!");
    bot.user.setActivity(`over my ${bot.guilds.size} servers`, {type: "WATCHING"});
});

//GLOBAL LOGS (edit) starts here
bot.on("messageUpdate", async(oldMessage, newMessage) =>{
    if(oldMessage.content === newMessage.content){
        return;
    }
        var globalLogChannel = bot.channels.get("592741746740559898");

        let globalLogEmbed = new Discord.RichEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setThumbnail(oldMessage.author.avatarURL)
        .setColor("RED")
        .setDescription("A message from a user was edited")
        .addField("Before", oldMessage.content, true)
        .addField("After", newMessage.content, true)
        .setTimestamp()
        .setFooter("This is a global embed for edited messages")

        globalLogChannel.send(globalLogEmbed)
})
//GLOBAL LOGS (edit) ends here

//logs (edit) starts here
bot.on("messageUpdate", async(oldMessage, newMessage) =>{
    if(oldMessage.content === newMessage.content){
        return;
    }

        let logEmbed = new Discord.RichEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setThumbnail(oldMessage.author.avatarURL)
        .setColor("RANDOM")
        .setDescription("A message from a user was edited")
        .addField("Before", oldMessage.content, true)
        .addField("After", newMessage.content, true)
        .setTimestamp()
        .setFooter("This is an embed for edited messages")

        let loggingChannel = newMessage.guild.channels.find(ch => ch.name === "spicylogs")
        if(!loggingChannel) return;

        loggingChannel.send(logEmbed);
})
//logs (edit) ends here

bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} has joined the server.`);

    let welcomechannel = member.guild.channels.find(`name`, "welcome_leave"); //change the 2nd argument to the name of the channel that the welcome message should be sent
    welcomechannel.send(`<@${member.id}> has joined the server.`);
});

bot.on("guildMemberRemove", async member => {
    console.log(`${member.id} has left the server.`);

    let welcomechannel = member.guild.channels.find(`name`, "welcome_leave"); //change the 2nd argument to the name of the channel that the leave message should be sent
    welcomechannel.send(`<@${member.id}> has left the server.`);
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return; //ignores all dms

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix 
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;

    //let prefix = botconfig.prefix; 
    if(!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" "); //splits "!command <do> <something>" into 3 elements
    let cmd = messageArray[0];
    let args = messageArray.slice(1); // slices out array element 1 till end and puts it into args

    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
   /// let alias = bot.aliases.get(cmd.slice(prefix.length));

    if(commandfile) commandfile.run(bot,message,args);
   /// if(alias) alias.run(bot,message,args);

});

bot.login(botconfig.token);
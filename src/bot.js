require("dotenv").config();

const { Client } = require("discord.js");

const bot = new Client({
  partials: ['MESSAGE','REACTION']
});

const PREFIX = "-";

bot.on("ready", () => {
  console.log(`${bot.user.tag} has logged in`);
});

bot.on('message', (message) => {
  if (message.author.bot) return;
  if(message.content === 'hello'){
    message.reply('Hello there!');
  }
  if(message.content === 'help'){
    message.channel.send('Commands for Bot :-\n1.Kick : -kick <user ID>\n2.Ban : -ban <user ID>\n3.For roles react on get-roles channel');
  }

  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === 'kick') {
      if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply('You do not have permissions to use that command');
      if (args.length === 0)
        return message.reply('Please provide an ID');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) => message.channel.send('You do not have permissions to kick that user :('));
      } else {
        message.channel.send('That member was not found');
      }
    } 
    
    else if (CMD_NAME === 'ban') {
      if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
      message.guild.members
        .ban(args[0])
        .then((member) =>message.channel.send('User was banned successfully'))
        .catch ((err) =>message.channel.send('An error occured. Either I do not have permissions or the user was not found'));
    }
  }
});

bot.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '1202899711531417671') {
      switch (name) {
        case '🍏':
          member.roles.add('1202889203977822258');
          break;
        case '🥕':
          member.roles.add('1202889266393522186');
          break;
        case '🌶️':
          member.roles.add('1202889321477316630');
          break;
        case '🌽':
          member.roles.add('1202889366469607434');
          break;
      }
    }
});
  
bot.on("messageReactionRemove", (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === "1202899711531417671") {
        switch (name) {
        case '🍏':
            member.roles.remove("1202889203977822258");
            break;
        case '🥕':
            member.roles.remove("1202889266393522186");
            break;
        case '🌶️':
            member.roles.remove("1202889321477316630");
            break;
        case '🌽':
            member.roles.remove("1202889366469607434");
            break;
        }
    }
});
  

bot.login(process.env.NexusBot_Token);

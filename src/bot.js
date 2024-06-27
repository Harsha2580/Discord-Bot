require("dotenv").config();
const { Client } = require("discord.js");
const bot = new Client({
  partials: ['MESSAGE','REACTION']
});

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const PREFIX = "-";

bot.on("ready", () => {
  console.log(`${bot.user.tag} has logged in`);
});

bot.on('message', async (message) => {
  if (message.author.bot) return;

  const checkProfanity = async (text) => {
    try {
      const response = await fetch(`https://www.purgomalum.com/service/containsprofanity?text=${text}`);
      const result = await response.text();
      return result === 'true';
    } catch (err) {
      console.error('Error checking profanity:', err);
      return false;
    }
  };
  if (await checkProfanity(message.content)) {
    const member = message.guild.members.cache.get(message.author.id);
    if (member) {
      if (member.kickable) {
        member.send('You have been kicked for using inappropriate language.')
          .then(() => {
            member.kick();
            message.reply('was kicked for using inappropriate language.');
            setTimeout(()=> message.delete(), 3000);
          })
      } else {
        setTimeout(()=> message.delete(), 3000);
        message.reply('I do not have permissions to kick you.');
      }
    }
    return;
  }

  const getresponse = async (prompt) => {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  }
  
  if(message.content === 'hello'){
    return message.reply('Hello there!');
  }
  if(message.content === 'help'){
    return message.channel.send('Commands for Bot :-\n1.Kick : -kick <user ID>\n2.Ban : -ban <user ID>\n3.For roles react on get-roles channel');
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
        .then((member) =>message.channel.send(`${member} was banned successfully`))
        .catch ((err) =>message.channel.send('An error occured. Either I do not have permissions or the user was not found'));
    }

   else if (CMD_NAME === "askai") {
      let prompt = args.join(' ');
      prompt += '\nGenerate less than 100 words';
      message.channel.startTyping();
      let result = await getresponse(prompt);
      message.channel.stopTyping();
      if(result.length > 1000) result = result.substring(0,1000);
      return message.reply(result);
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

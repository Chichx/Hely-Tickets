const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();
const log = require(`leekslazylogger`);
module.exports = {
  name: 'add',
  description: 'Add a member to a ticket channel',
  usage: '<@member>',
  aliases: ['adduser'],
  example: 'add @exampleUser',
  args: true,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    // Empieza el comado aca
    message.delete();
    if(!message.channel.name.startsWith('ticket-')) {
      if(config.useEmbeds) {
        const notTicket = new Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(`:x: **This command can only be used within a ticket channel**`)
        return message.channel.send(notTicket);
      } else {
        return message.channel.send(`:x: **This command can only be used within a ticket channel**`)
      }
    }
    let member = message.mentions.members.first()
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can only use it in ticket channels.`);
    if (!member) return message.channel.send("Can't find user!")
    const channel = client.channels.cache.get('807737771317919744');
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Hely / Ticket Log`)
      .setTitle("User Added")
      .setColor("GREEN")
      .addField("Username", member, true)
      .addField("Added by", message.author, true)
      .addField("Channel", message.channel, true)
  .setThumbnail('https://i.imgur.com/ThUnm8a.png')
  .setFooter(`Hely Development`, 'https://i.imgur.com/ThUnm8a.png')
    .setTimestamp();
    channel.send(embed)  

    let channelsend = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setTitle(`Added User`)
    .setDescription(`${message.author} Has Added ${message.mentions.members.first()} To This Ticket`)
    .setTimestamp()
    .setThumbnail('https://i.imgur.com/ThUnm8a.png')
    .setFooter(`Hely Development`, 'https://i.imgur.com/ThUnm8a.png')
    message.channel.send(channelsend)

    try {
      message.channel.updateOverwrite(member, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          READ_MESSAGES: true,
          READ_MESSAGE_HISTORY: true
      }); 
        } catch(error) {
  }
}}   

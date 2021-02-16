const Discord = require('discord.js');
const config = require('../config.json');
const log = require(`leekslazylogger`);
module.exports = {
  name: 'remove',
  description: 'Remove a member from a ticket',
  usage: '<@member>',
  aliases: ['kick'],
  example: 'remove @exampleUser',
  args: true,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    // Empieza el comado aca
    message.delete();
    if(!message.channel.name.startsWith('ticket-')) {
      if(config.useEmbeds) {
        const notTicket = new Discord.RichEmbed()
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
    .setTitle("User Remove")
    .setColor("RED")
    .addField("Username", member, true)
    .addField("Removed by", message.author, true)
    .addField("Channel", message.channel, true)
.setThumbnail('https://i.imgur.com/ThUnm8a.png')
.setFooter(`Hely Development`, 'https://i.imgur.com/ThUnm8a.png')
    .setTimestamp();
    channel.send(embed)  

    let channelsend = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setTitle(`Removed User`)
    .setDescription(`${message.author} Has Removed ${message.mentions.members.first()} To This Ticket`)
    .setTimestamp()
    .setThumbnail('https://i.imgur.com/ThUnm8a.png')
    .setFooter(`Hely Development`, 'https://i.imgur.com/ThUnm8a.png')
    message.channel.send(channelsend)

    try {
      message.channel.updateOverwrite(member, {
          VIEW_CHANNEL: false,
          SEND_MESSAGES: false,
          READ_MESSAGES: false,
          READ_MESSAGE_HISTORY: false
      }); 
        } catch(error) {
  }
}}   

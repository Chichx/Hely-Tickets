const Discord = require('discord.js');
const config = require('../config.json');
const log = require(`leekslazylogger`);
module.exports = {
  name: 'close',
  description: 'Close a ticket of User',
  usage: '@user',
  aliases: ['Done'],
  example: 'add @exampleUser',
  args: false,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    // Empieza el comado aca
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
    const embed9 = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("Hely Tickets")
    .setDescription('Are you sure? Once confirmed, you cannot reverse this action!\nTo close ticket, type \`!confirm\`. This will time out in 10 seconds and be cancelled.')
    .setFooter(`${config.name}`)
    .setTimestamp();
    message.channel.send({ embed: embed9 })
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '!confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
              m2.delete();
          }, 3000);
        });
  	    if(config.useEmbeds) {
  	      const embed = new Discord.MessageEmbed()
  	        .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
  	        .setTitle("Ticket Closed")
  					.setColor(config.colour)
  	        .addField("Username", message.author, true)
  	        .addField("Channel", message.channel.name, true)
            .setTimestamp()
            .setFooter(`${config.name}`);
  	      client.channels.cache.get(config.logChannel).send({embed})
  	    } else {
  	      client.channels.cache.get(config.logChannel).send(`Ticket closed by **${message.author.tag} (${message.author.id})**`);
  	    }
  			log.info(`${message.author.tag} closed a ticket (#${message.channel.name})`)
      });
    }
  };
let db = require('quick.db');
let Discord = require('discord.js')

module.exports = {
  name: "help",
  run: async function(client, message, args) {
    
    const embed = new Discord.RichEmbed()
    .addField('help', 'if you need help, use the command and have ``?`` at the end of it. example: ``e!claim ?``')    
    .addField('commands', 'balance, claim, daily, help, laws, profile, work, name, oil, pump')
    .setColor('#94e067')
    
    message.channel.send(embed)
  }
  }

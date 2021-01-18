const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "clear",
  run: async function(client, message, args) {
    
if(message.member.hasPermission("ADMINISTRATOR")) {
  db.set(`oilTimeAmt_${message.author.id}`, 0)
  db.set(`cooldown_${message.author.id}`, 0)
  db.set(`drill_${message.author.id}`, 0)
  db.set(`oil_${message.author.id}`, 0)
  return;
}
    message.channel.send('u no have privileges dum dum')
    
  }
}
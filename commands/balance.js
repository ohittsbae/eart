let db = require('quick.db');
let Discord = require('discord.js')

module.exports = {
  name: "bal",
  run: async function(client, message, args) {
    let user = message.mentions.users.first() || message.author;
    
    let balance = db.fetch(`balance_${user.id}`) || 0;
    
    if(args == '?'){
       message.channel.send('this command allow you to see your own balance. if you mention a user, you can view their balance instead.')
      return;
    }
    message.channel.send(`${user} has ${balance} manney`)
    console.log(message.author.username + ` requested to view ${user.username}'s manney' | ${user.username} has ${balance} manney`)
  }
}
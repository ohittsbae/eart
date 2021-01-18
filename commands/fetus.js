let db = require('quick.db');
let moment = require('moment')
require('moment-duration-format');
let Discord = require('discord.js');

module.exports = {
name: "fetus",
run: async function(client, message, args) {

  let cooldown = 8.64e+7
  let timeout = db.fetch(`fetus_${message.author.id}`)
  
    if(timeout !== null && cooldown - (Date.now() - timeout) > 0) {
      return;
  } else {
    message.channel.send('https://cdn.discordapp.com/attachments/689184576719028226/691464374254305393/The_Golden_Space_Fetus.mp4')
    db.add(`balance_${335824999212515338}`, 500);
    db.set(`fetus_${message.author.id}`, Date.now())
  }

}
}
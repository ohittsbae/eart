const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "laws",
  run: async function(client, message, args) {
    
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear()
    console.log(datetime)
    
    if(args == '?') {
    message.channel.send('shows the laws of the land')
    return;
  }

    
   let embed = new Discord.RichEmbed()
   .setTitle(`the laws of the eart, as of ${datetime}`)
   
  client.law.forEach(a => {
    embed.addField(a.name, `${a.desc}`,)
  })
    
  message.channel.send(embed);
    
  }
}
let db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "profile",
  run: async function(client, message, args) {
    let user = message.author;
    let balance = db.fetch(`balance_${user.id}`) || 0;
    
    if(args == '?') {
    message.channel.send('shows your own profile, detailing your manney and owned territories as well as your clan')
    return;
  }

    let embed = new Discord.RichEmbed()
      .setAuthor(user.username + "'s profile'")
      .setThumbnail(user.avatarURL)
      .addField(`balance`, balance + ` manney`)
      .setColor('#94e067')
      .setImage("https://cdn.glitch.com/f56c5867-e80a-4b5b-8c08-a9611deef40f%2Ftransparent.png?v=1584121626199");
    
    if(db.fetch(`owned_${user.id}`) !== null) {
      embed.addField(`owned territories`, db.fetch(`owned_${user.id}`))
    }
    
    let name = db.fetch('name') || []
    
    let yes = name.some(a => a.id == user.id)
      
    
    if(db.fetch(`name_${user.id}`) !== null) {
      let id = user.id
      embed.addField(`clan information`, db.fetch(`name_${user.id}`) + `\n\n` + '``(id: ' + id + ')``')
    
    }

    message.channel.send(embed);
    console.log(user.username + ` requested to view their profile`);
    
    }
};

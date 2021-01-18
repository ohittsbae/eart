let db = require('quick.db');
let Discord = require('discord.js');

module.exports = {
  name: "claim",
  run: async function(client, message, args) {
    let user = message.author;
    
    let userbal = db.fetch(`balance_${user.id}`) || 0;
    
    let channel = `<#` + args + `>`;
    
    const blacklisted = [
      '695321633090568276',
      '695325308215361646',
      '695326392514248835',
      '695324149949661235',
      '695331193528254474',
      '695347167711330446',
      '695347447827923015',
      '695336920099586069'
        
    ]
    
    //message.channel.send(channel)
    
    const territories = []
    
    client.value.forEach(a => {
    territories.push(a.id)
  })
    
    if(args == '?'){
       message.channel.send('this command allow you to claim land by entering the channel id that you wish to claim.')
      return;
    }
    
    console.log(territories)
    
    if(!args || blacklisted.some(word => message.content.includes(word) == true)) {
      message.channel.send('nonono. not in my house.')
      console.log(blacklisted.some(word => message.content.includes(word)))
      return;
    }else if(territories.some(a => args == a) == false) {
      message.channel.send('nonono. not in my house.')
      return;
    }
      
    let value = parseInt(args, 10);
    let terr = client.value.get(value);
      
    if(db.get('territoryinfo.id').some(a => a == value)) {
      message.channel.send('territory is already taken')
      message.react('😢')
      return;
    }
    
    
    
    if(terr.cost > userbal){
      message.channel.send("you don't have enough money to claim " + channel + ", get more and try again. (cost : " + terr.cost + " manneys)")
      console.log(terr.cost)
      return;
    }else {
      let bal = userbal - terr.cost;
      message.channel.send('successfully claimed ' + channel + ' for ' + terr.cost + ' manneys. (current bal: ' + bal + ')')
      
      db.subtract(`balance_${user.id}`, terr.cost)
      db.push('territoryinfo.id', terr.id)
      
      db.push(`owned_${user.id}`, channel)
      
      console.log(message.guild.name)
      console.log(terr)
  }
  }
}
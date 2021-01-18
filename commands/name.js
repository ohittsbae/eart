let db = require('quick.db');
let Discord = require('discord.js')

module.exports = {
  name: "name",
  run: async function(client, message, args) {
    let owned = db.fetch(`owned_${message.author.id}`) || []
    
    if(args == '?'){
       message.channel.send('this command allow you to name and rename your clan. requires at least one territory owned')
      return;
    }
    
    if(owned.length < 1) {
      message.channel.send('short! need territory!')
      console.log('short.')
      return;
       }
    if(db.fetch(`name_${message.author.id}`) !== null) {
      let old = db.fetch(`name_${message.author.id}`)
      let name = args.join('-');
      db.delete('name', old)
      db.delete('name.id', old.id)
      db.set(`name_${message.author.id}`, name)
      db.push('name', {
        name: name,
        id: message.author.id})
      message.channel.send('successfully renamed clan from ' + old + ' to ' + name)
  }else {
      let name = args.slice(1).join('-');
      db.set(`name_${message.author.id}`, name)
      db.push('name', {
        name: name,
        id: message.author.id})
      message.channel.send('successfully created clan ' + name)
  }
  }
}
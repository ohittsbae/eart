let db = require('quick.db');
let moment = require('moment')
require('moment-duration-format');

module.exports = {
name: "init",
run: async function(client, message, args) {
  
  if(args == '?') {
    message.channel.send('whenever the bot resets, you need to use this command')
    return;
  }
  if (message.member.hasPermission("ADMINISTRATOR")){
  db.push('territoryinfo.id', 0)
  db.push('name', {
    name: 'Lacinia ut consequat adipiscing senectus.',
    id: 2});
    message.channel.send('successfully initialized')
  console.log(db.get('territoryinfo.id'))
  }else {
    message.channel.send('you no have correct perms')
  }
}
}
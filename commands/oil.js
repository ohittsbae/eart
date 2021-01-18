let db = require('quick.db');
let moment = require('moment')
require('moment-duration-format');

module.exports = {
name: "oil",
run: async function(client, message, args) {
  
  let amt = db.fetch(`owned_${message.author.id}`).length || 0;
  
  let cooldown = 3.6e+6;
  let timeout = db.fetch(`drill_${message.author.id}`);
  
  if(args == '?') {
    message.channel.send('allows for """"passive"""" collection of manney. each territory you have adds an hour needed to pump the oil. do ``e!pump`` to check how much time is left as well as to collect manney.')
    console.log(amt)
    return;
  }
  
  if(amt === 0) {
    message.channel.send('u no have territories')
    console.log(amt)
    return;
  }
  
  if(timeout !== null && cooldown - (Date.now() - timeout) > 0) {
    message.channel.send('you are already drilling for oil!');
    console.log(amt)
    return;
  }
  
    let time = cooldown * amt;
    db.add(`oilTimeAmt_${message.author.id}`, amt)
    db.set(`oil_${message.author.id}`, time);    
    db.set(`drill_${message.author.id}`, Date.now());
    db.set(`cooldown_${message.author.id}`, db.fetch(`oil_${message.author.id}`))
    message.channel.send(`successfully started drilling for ${amt} hours`)
  
    console.log(amt)

}
}
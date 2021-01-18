let db = require('quick.db');
let moment = require('moment')
require('moment-duration-format');

module.exports = {
name: "pump",
run: async function(client, message, args) {

  let cooldown = db.fetch(`cooldown_${message.author.id}`)
  let timeout = db.fetch(`drill_${message.author.id}`)
  
  let amt = db.fetch(`oilTimeAmt_${message.author.id}`) || 0;
  
  if(args == '?') {
    message.channel.send('allows for oil to be pumped once a specific amount of time passes. can also check the time needed. only works if the ``e!oil`` command has been triggered before')
    return;
  }
  
  if(amt == 0) {
    message.channel.send('no oil bruv')
    return;
  }
  
  if(timeout !== null && cooldown - (Date.now() - timeout) > 0) {
    message.channel.send(`your ${amt} hours worth of oil is still being pumped, please wait ${moment.duration(cooldown - (Date.now() - timeout)).format("H[h] m[m] s[s]")}`)
  } else {
    let mult = parseInt(Math.floor(Math.random() * 81)) + 248;
    let man = mult * amt;
    db.add(`balance_${message.author.id}`, man)
    db.subtract(`oilTimeAmt_${message.author.id}`, amt)
    message.channel.send(`you successfully pumped ${amt} hours worth of oil, gaining ${man} manney.`)
    console.log(amt)
    console.log(mult)
  }

}
}
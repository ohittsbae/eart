let db = require('quick.db');
let moment = require('moment')
require('moment-duration-format');

module.exports = {
name: "work",
run: async function(client, message, args) {
  
  const multiplier = [
    1,
    1,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    7,
    7,
    7,
    7,
    7,
    10,
    10,
    15,
    15,
    15,
    15,
    15,
    25,
    25,
    25,
    25,
    25,
    50,
    50,
    50,
    100,
    100
  ]
  
  const work = [
    'You went to work in the mines and recieved ',
    'You went to the local club to... ||you know...|| and recieved ',
    'You travelled around the world to review food and recieved ',
    'You worked for a few hours at the local Walmart and recieved ',
    'You hand-crafted some marvelous soap for the masses and recieved '
  ]
  
  if(args == '?') {
    message.channel.send('allows for working people to gain access to manney aside from the daily')
    return;
  }
  
  let cooldown = 1.8e+6;
  let timeout = db.fetch(`work_${message.author.id}`);
  
  if(timeout !== null && cooldown - (Date.now() - timeout) > 0) {
return message.channel.send(`You are on cooldown, please wait ${moment.duration(cooldown - (Date.now() - timeout)).format("H[h] m[m] s[s]")}`)
  } else {
    const mult = Number(multiplier[Math.floor(Math.random() * multiplier.length)]);
    
    const randWork = work[Math.floor(Math.random() * work.length)];
    
    let workAmt = parseInt((mult * 2) + 12, 10)
    message.channel.send(randWork + workAmt + " manney for your services")
    db.add(`balance_${message.author.id}`, workAmt);
    db.set(`work_${message.author.id}`, Date.now())
  }

}
}
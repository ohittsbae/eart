var Discord = require('discord.js');
var client = new Discord.Client();
var fs = require('fs');
client.commands = new Discord.Collection();
client.law = new Map();
let laws = require('./laws.json');
client.territory = new Map();
let territories = require('./territories.json');
client.value = new Map();
let values = require('./values.json');


const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


var prefix = "e!";

const files = fs.readdirSync('./commands').filter(f => f.endsWith('js'));

for(const file of files) {
  let command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

laws.forEach(a => {
  client.law.set(a.id, a)
  console.log(`Loaded law ${a.name}!`)
})

territories.forEach(a => {
  client.territory.set(a.id, a)
  console.log(`Loaded territory ${a.name}!`)
})

values.forEach(a => {
  client.value.set(a.id, a)
  console.log(`Loaded value of ${a.name}!`)
})

client.on('ready', function() { 
  console.log("I am ready!");
});

client.on('message', async message => {
    if (message.channel.type == 'dm' && message.content == 'hello') {
        message.reply("hello");
    }
});

client.on('message', async function(message) {  
  if(!message.content.startsWith(prefix)) return;
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let commandName = args.shift().toLowerCase();
  if(!client.commands.has(commandName)) return;
  let command = client.commands.get(commandName)
  
  try {
    command.run(client, message, args);
  } catch (e) {
   return message.channel.send("oh no, an error!!!")
   console.log(e)
  }
  
});

client.on("ready", () => {
  console.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
    client.user.setActivity(`le clair de lune`, { type: 'WATCHING' });
});

client.login(process.env.TOKEN);
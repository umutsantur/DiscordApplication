const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');
var obj = [];
var http = require('http');

var myServer = http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type" : "application/json"});
    var whitelistJson = require('./whitelist.json')
    response.write(JSON.stringify(whitelistJson))
    response.end();
});

myServer.listen(6969);


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.author.bot) return;
  if (msg.channel.id === 'yourchannelidhere' && msg.content.search('/addwhitelist')) {
      var command = msg.content.split(' ')
      if(command[1] === undefined || command[2]) {
        msg.reply('Wrong use. Please try "!add steamid64"!');
      } else {
        fs.readFile('whitelist.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        var author = '"'+msg.member.user.tag+'"'
        var authorid = '"'+msg.author+'"'
        var steamid = '"'+command[1]+'"'
        var exist =  obj.filter(
           (it) => {
             return it.authorid === authorid;
           }
        );
        console.log(exist);
        if(exist.length > 0) {
          msg.reply('You are already registered with another account.');
        } else {
          obj.push({author: author, steamid: steamid, authorid: authorid}); //add some data
          json = JSON.stringify(obj); //convert it back to json
          fs.writeFile('whitelist.json', json, 'utf8', console.log); // write it back
          msg.reply('Whiteliste kayıt edildi:' + command[1]);
        }
    }});
      }
  } else if (msg.channel.id === 'channelkey' && msg.content.search('/removewhitelist')){
    msg.reply('This command appears to be invalid at this time.');
  }
});

client.login('botkey');

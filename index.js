const Discord = require('discord.js');
const bot = new Discord.Client();

const command = require("./command")
const shit = './shitpost/img/';
const fs = require('fs');

    var qtf = 0;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'Alterar host',
  user     : 'Alterar user',
  password : 'Alterar password',
  database : 'Alterar database'
});
connection.connect();

bot.login(process.env.BOT_TOKEN);
//bot.login('token');

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
fs.readdir(shit, (err, files) => {
  qtf = files.length;
});

bot.on('ready', () => {
  //bot.channels.get('513538657462910988').bulkDelete(2);
    //bot.channels.get('513538657462910988').send('\n🔧 **Reiniciando... **🔧');
  });

bot.on("message", message => {
  if(message.author.bot)return;
  if (message.content.length>0){
  command.commands(message, qtf, shit,connection);}
});

standard_input.on('data', function(data) {
    bot.channels.get('513538657462910988').send(data);
});

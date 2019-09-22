module.exports = {
    Roleplay: function (message, neguin, command, args) 
    {
        var msg = message.content.toLowerCase();
        var start = message.content;

    if (message.author != neguin)
    {

    if (msg == "flw"||msg == "falo"||msg == "falou"||msg == "falow"||msg == "fuis"||msg == "fuiz"){
        message.channel.send("**Boa noite mestre** :heart:").then(function (message) {
            return channel.send(embed).then(sentEmbed => {
                sentEmbed.react("❤")
            })
          }).catch(function() {
            //Something
           });
    }
    else if (msg == "te amo")
    {
        var as = Math.floor(Math.random() * 10)+1;
        if (as == 1){message.reply("AH, VOCÊ ESTRAGOU TUDO... **EU TE ODEIO !** 😡");}
        else if (as<=3){message.reply("Desculpa mestre, eu te vejo como amigo...  ☹");}
        else if (as<10)
        {
            return message.reply("Ahh mestre... Obrigado, mas eu sou um robô 🤖");
        }
        else{
            return message.reply("Ownnt ~:heart:");
        }
    }
    else if (msg == "pega neguin")
    {
        return message.channel.send(neguin+",** PEGA NEGUINHO ! :rage:**");
    }
    else if (message.content == "shrug")
    message.reply("¯\\_(ツ)_/¯");
    else if (message.content == "praise the sun")
    message.channel.send("~~   ~~\\\\\\[T]/~~ `~~~~º~~~~´ ~~\\\\\\[T]/~~   ~~");

    }
    else
    {
    return message.reply("🚨 **VOCÊ É O NEGUINHO **🚨");
    }

    },

    neguin: function (message, neguin, command, args)
    {
        if (command == "neguin"||command == "neguinho"){
            if (message.author != neguin)
            {
                neguin = args[0];
                if (neguin.replace(/!/g, "") == "<@498577710134722570>")
                {
                    message.channel.send("**Neguin agora é VOCÊ**");
                    neguin = "<@"+message.author.id+">";
                }
                else{
                message.channel.send("Neguin agora é " + neguin);
                //console.log(neguin);
        
                neguin = neguin.replace(/!/g, "");}
                return neguin;
            }
            else{
                return message.reply("🚨 **VOCÊ É O NEGUINHO **🚨");
            }
        }
    }
}
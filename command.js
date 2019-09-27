module.exports = {
    commands: function (message, qtf, shit,connection) {

        var Prefix = ".";

        const role = require('./roleplay');
        const help = require("./help");
        const list = require('./list');
        const char = require('./char');
        const who = message.author.id.replace(/!/g, "");
        const args = message.content.slice(Prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        let neguin = "<@621553739014078475>";

        function XpCalc(lvl, xp, loot) {
            {
                var Exp = {
                    lvl: 0,
                    xp: 0,
                    loot: 0,
                    nec: 0,
                    totalxp: 0,
                    points: 0
                }

                Exp.lvl = lvl;
                Exp.xp = xp;
                Exp.loot = loot;
                Exp.totalxp = Exp.loot + Exp.xp;

                Exp.nec = (Exp.lvl + 1) * 25;
                while (Exp.totalxp >= Exp.nec) {
                    Exp.points += parseInt(((Exp.lvl + 5) / 5));
                    Exp.lvl++;
                    Exp.totalxp -= Exp.nec;
                    Exp.nec = (Exp.lvl + 1) * 25;
                }
                return Exp;
            }
        }
        function shitp(ar, args, message, vale) {
            if (ar == "img" || ar == "imgs" || ar == "imagem" || ar == "imagens") {
                if (typeof args[1] == 'undefined') {
                    vale = Math.floor(Math.random() * qtf);
                }

                return message.channel.send("ID: " + vale + ", Type = Img", { file: shit + vale + ".png" });
            }
            else if (ar == "vid" || ar == "vids" || ar == "video" || ar == "videos") {
                var vid = require("./shitpost/video");

                if (typeof args[1] == 'undefined')
                    vale = Math.floor(Math.random() * vid.shitpost.length);
                return message.channel.send("ID: " + vale + ", Type = Vid" + "\n" + vid.shitpost[vale]);
            }
        }
        function dice(re) {
            return Math.floor(Math.random() * re) + 1
        }
        role.Roleplay(message, neguin, command, args);
        if (message.author.bot || message.content.indexOf(Prefix) !== 0) return;

        neguin = role.neguin(message, neguin, command, args);

        if (command == "help") {
            var index = [];
            var res = "```css\n"
            for (var x in help) {
                index.push(x);
                res += x + ": " + help[x] + "\n";
            }
            res += "```";
            message.reply(res);
        }
        else if (command == "playlist") {
            message.reply("\nMorri de tédio: https://open.spotify.com/playlist/2b6fIXT9vrIj90EI91i2do?si=zrx6-KW3Txq6NiK18mU5iw" +
                "\nMeta afeta a mina: https://www.youtube.com/playlist?list=PL5TeSrTKj7W7Ai4M7a37MV9uvx5LxdEQs");
        }
        else if (command == "clear" && message.member.roles.some(role => role.name === 'Player')) {
            try {
                let qt = parseInt(args[0]) + 1;
                if (parseInt(args[0]) < 100 && parseInt(args[0]) > 0)
                    message.channel.bulkDelete(qt);
                else message.reply('"***' + Prefix + 'clear" deve ser entre 1 e 99**')
            } catch{ }
        }
        else if (command == "prefix") {
            message.channel.send('Mestre, o prefixo padrão é "' + Prefix + '"');
        }
        else if (command == "setprefix") {
            Prefix = args[0];
            //message.channel.send(Prefix);
            if (Prefix != undefined)
                message.channel.send('Prefixo colocado em "' + Prefix + '" 😊');
            else { message.channel.send("Mestre, insira algo válido ☹"); }
        }
        else if (command == "d" || command == "dice") {
            try {
                var re = args[0];

                var as = dice(re);

                var te = args[1];
                //console.log(te + "\n" + te.length);
                if (te != undefined && te.length <= 5 && te.length > 0) {
                    var re2 = "if(" + as + te + "){message.reply(as+', **Sucesso ! 😀**');}else{message.reply(as+', __Falha__ 😖');}";
                    try {
                        eval(re2);
                    } catch{ }
                }
                else {

                    message.reply(as);
                }
            } catch{ }
        }
        else if (command == "xp") {
            var Exp = XpCalc(parseInt(args[0]), parseInt(args[1]), parseInt(args[2]));

            let Role = message.guild.roles.find(role => role.name === "Player");
            //console.log(Exp);

            message.reply("** " + Exp.totalxp + "/" + Exp.nec + "Xp, Lvl: " + Exp.lvl + ", +" + Exp.points + " pontos**");
        }
        else if (command == "ficha") {
            message.reply("\n```Nome:\nSobrenome:nLevel:0\n0/25 Xp\nIdade:\nRaça:\nClasse:\nHp: 0/0\nMp: 0/0\n\nForça:\nDestreza:\nInteligencia:\nArmadura:\nConst:\nSabed:\nFé:\n\n0 cobres\n\nVantagens:\nDesvantagens:\nItens:\nHabilidades :\n\nLvl 0:\n\nLvl 2:\n\nLvl 5:\n\nLvl 5:\n\nLvl 6:\n\nLvl 7:\n\nLvl 9:\n\nLvl 10:\n\nLvl 15:\n\nLvl 17:\n\nLvl 18:\n\nLvl 20:```")
        }
        else if (command == "shitpost") {
            let times = 0;
            let ar = args[0];
            let vale = parseInt(args[1]);
            if (typeof ar == 'number' || ar > 0) {
                times = ar;
                for (let ti = 0; ti <= times; ti++) {
                    var as = Math.floor(Math.random() * 2) + 1;
                    if (as == 1)
                        ar = "img";
                    else
                        ar = "vid";
                    shitp(ar, args, message);
                }
            }

            else if (typeof ar != 'string') {
                var as = Math.floor(Math.random() * 2) + 1;
                if (as == 1) {
                    ar = "img";
                }
                else {
                    ar = "vid";
                }
            }
            shitp(ar, args, message, vale);
        }
        else if (command == "char") {
            if (message.member.roles.some(role => role.name === 'Player'))
            var ch = char.char(message,args,connection);
            else message.reply('Desculpe, você não tem a tag **" Player "**');
        }
    }
}
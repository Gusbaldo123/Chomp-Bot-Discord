module.exports = {
    commands: function (message, qtf, shit) {
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'rpg'
        });
        connection.connect();

        var Prefix = ".";

        const role = require('./roleplay');
        const help = require("./help");
        const list = require('./list');
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

            /*message.channel.send("**Lista de comandos:**```"+
            "\n"+ Prefix + help.help+
            "\n"+ Prefix + help.setprefix+
            "\n"+ Prefix + help.d+
            "\n"+ Prefix + help.xp+
            "\n"+ Prefix + help.ficha+
            "\n\n"+ Prefix + help.char.status+
            "\n"+ Prefix + help.char.add+
            "\n"+ Prefix + help.char.alt+
            "\n"+ Prefix + help.char.del+
            "```");*/
        }
        else if (command == "playlist")
        {
            message.reply("\nMorri de tédio: https://open.spotify.com/playlist/2b6fIXT9vrIj90EI91i2do?si=zrx6-KW3Txq6NiK18mU5iw"+
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
            let com2 = args[0].toLowerCase();
            let com3 = args[1].toLowerCase();
            if (com2 == "add") {
                var E = new function () {
                    var e = new function () {
                        let name = "";
                        let lvl = 0;
                        let xp = 0;
                        let rexp = 0;
                        let age = 0;
                        let breed = "";
                        let clas = "";
                        let Hp = 0;
                        let MaxHp = 0;
                        let Mana = 0;
                        let MaxMana = 0;
                        let Str = 0;
                        let Des = 0;
                        let Inte = 0;
                        let Arm = 0;
                        let Cons = 0;
                        let Sab = 0;
                        let Fai = 0;
                        let money = 0;

                        message.channel.send(`**Qual o nome?**` + "```Ex: Cleber```")
                            .then((newmsg) => { //Now newmsg is the message you sent
                                newmsg.channel.awaitMessages(response => response.content, {
                                    max: 1
                                }).then((collected) => {
                                    name = collected.first().content;
                                    newmsg.channel.send(`**Nome: **` + name);

                                    /////////////////////////////////////////////////////////////////////////// Level
                                    message.channel.send(`**Mestre, insira Level e XpAtual**\n` + "```Ex: 50 400```")
                                        .then((newmsg) => { //Now newmsg is the message you sent
                                            newmsg.channel.awaitMessages(response => response.content, {
                                                max: 1
                                            }).then((collected) => {
                                                lvl = collected.first().content;
                                                var arg = lvl.trim().split(/ +/g);
                                                lvl = parseInt(arg[0]);
                                                xp = parseInt(arg[1]);
                                                rexp = 25 * (lvl + 1);
                                                if (lvl >= 0 && xp >= 0 && rexp >= 0 && lvl != NaN && xp != NaN && rexp != NaN) {
                                                    newmsg.channel.send('**Level: **' + lvl + ", " + xp + "/" + rexp + "Xp");

                                                    /////////////////////////////////////////////////////////////////////////// Age Breed Class
                                                    message.channel.send('**Idade, Raça e classe**\n```Ex: 25 Humano Guerreiro```')
                                                        .then((newmsg) => { //Now newmsg is the message you sent
                                                            newmsg.channel.awaitMessages(response => response.content, {
                                                                max: 1
                                                            }).then((collected) => {
                                                                var arg = collected.first().content;
                                                                arg = arg.trim().split(/ +/g);
                                                                age = parseInt(arg[0]);
                                                                breed = arg[1];
                                                                clas = arg[2];
                                                                if (age != undefined && age > 0 && breed != undefined && breed != "" && clas != undefined && clas != "") {
                                                                    newmsg.channel.send("**Idade: **" + age + ", **Raça: **" + breed + ", **Classe: **" + clas);

                                                                    /////////////////////////////////////////////////////////////////////////// Status
                                                                    message.channel.send('**Mestre, insira status( Força, Dest, Int, Arma, Const, Sabed e Fé )**```Ex: 6 3 1 2 5 1 1```')
                                                                        .then((newmsg) => { //Now newmsg is the message you sent
                                                                            newmsg.channel.awaitMessages(response => response.content, {
                                                                                max: 1
                                                                            }).then((collected) => {
                                                                                var arg = collected.first().content;
                                                                                arg = arg.trim().split(/ +/g);
                                                                                Str = parseInt(arg[0]);
                                                                                Des = parseInt(arg[1]);
                                                                                Inte = parseInt(arg[2]);
                                                                                Arm = parseInt(arg[3]);
                                                                                Cons = parseInt(arg[4]);
                                                                                Sab = parseInt(arg[5]);
                                                                                Fai = parseInt(arg[6]);

                                                                                message.channel.send("**Força: **" + Str +
                                                                                    "\n**Destreza: **" + Des +
                                                                                    "\n**Inteligência: **" + Inte +
                                                                                    "\n**Armadura: **" + Arm +
                                                                                    "\n**Constituição: **" + Cons +
                                                                                    "\n**Sabedoria: **" + Sab +
                                                                                    "\n**Fé: **" + Fai)

                                                                                /////////////////////////////////////////////////////////////////////////// Hp
                                                                                message.channel.send('**Hp atual e a Mana atual**\n```Ex: 25 10```')
                                                                                    .then((newmsg) => { //Now newmsg is the message you sent
                                                                                        newmsg.channel.awaitMessages(response => response.content, {
                                                                                            max: 1
                                                                                        }).then((collected) => {
                                                                                            var arg = collected.first().content;
                                                                                            arg = arg.trim().split(/ +/g);
                                                                                            Hp = parseInt(arg[0]);
                                                                                            Mana = parseInt(arg[1]);
                                                                                            MaxHp = Cons * 5;
                                                                                            MaxMana = Sab * 10;

                                                                                            if (Hp <= MaxHp && Mana <= MaxMana) {
                                                                                                message.channel.send("**Hp:** " + Hp + "/" + MaxHp + "\n**Mp: **" + Mana + "/" + MaxMana)
                                                                                                /////////////////////////////////////////////////////////////////////////// Hp
                                                                                                message.channel.send('**Dinheiro atual**\n```Ex: 20```')
                                                                                                    .then((newmsg) => { //Now newmsg is the message you sent
                                                                                                        newmsg.channel.awaitMessages(response => response.content, {
                                                                                                            max: 1
                                                                                                        }).then((collected) => {
                                                                                                            var arg = collected.first().content;
                                                                                                            arg = arg.trim().split(/ +/g);
                                                                                                            money = parseInt(arg[0]);
                                                                                                            let monz = money;
                                                                                                            let suf = "";
                                                                                                            if ((money / 1000000) > 1) {
                                                                                                                monz /= 1000000; suf = " RubyCoins";
                                                                                                            }
                                                                                                            else if ((money / 10000) > 1) {
                                                                                                                monz /= 10000; suf = " GoldCoins";
                                                                                                            }
                                                                                                            else if ((money / 100) > 1) {
                                                                                                                monz /= 100; suf = " SilverCoins";
                                                                                                            }
                                                                                                            else
                                                                                                                suf = " CopperCoins"

                                                                                                            message.channel.send("**Dinheiro: **" + monz + suf);
                                                                                                            var res = {
                                                                                                                name: name,
                                                                                                                lvl: lvl,
                                                                                                                xp: xp,
                                                                                                                rexp: rexp,
                                                                                                                age: age,
                                                                                                                breed: breed,
                                                                                                                clas: clas,
                                                                                                                Hp: Hp,
                                                                                                                MaxHp: MaxHp,
                                                                                                                Mana: Mana,
                                                                                                                MaxMana: MaxMana,
                                                                                                                Str: Str,
                                                                                                                Des: Des,
                                                                                                                Inte: Inte,
                                                                                                                Arm: Arm,
                                                                                                                Cons: Cons,
                                                                                                                Sab: Sab,
                                                                                                                Fai: Fai,
                                                                                                                money: money
                                                                                                            }
                                                                                                            var exampleEmbed = new Discord.RichEmbed()
                                                                                                                .setColor('#0099ff')
                                                                                                                .setTitle(name)
                                                                                                                .setThumbnail('https://www.deviantart.com/nintega-dario/art/Chain-Chomp-Mario-Odyssey-711474595')
                                                                                                                .addField('Nome: ', name)
                                                                                                                .addField('Level: ', lvl)
                                                                                                                .addField('Xp: ', xp + "/" + rexp)
                                                                                                                .addField('Idade: ', age)
                                                                                                                .addField('Raça: ', breed)
                                                                                                                .addField('Classe: ', clas)
                                                                                                                .addField('Hp: ', Hp + "/" + MaxHp)
                                                                                                                .addField('Mp: ', Mana + "/" + MaxMana)
                                                                                                                .addBlankField()
                                                                                                                .addField('Força: ', Str)
                                                                                                                .addField('Destreza: ', Des)
                                                                                                                .addField('Inteligência: ', Inte)
                                                                                                                .addField('Armadura: ', Arm)
                                                                                                                .addField('Constituição: ', Cons)
                                                                                                                .addField('Sabedoria: ', Sab)
                                                                                                                .addField('Fé: ', Fai)
                                                                                                                .addField('Dinheiro: ', money)
                                                                                                                .setTimestamp()
                                                                                                            message.channel.send(exampleEmbed);
                                                                                                            //console.log(res);
                                                                                                            /////////////////////////////////////////////////////////////////////////// Hp
                                                                                                            message.channel.send('Confirma? (Sim ou Nao)')
                                                                                                                .then((newmsg) => { //Now newmsg is the message you sent
                                                                                                                    newmsg.channel.awaitMessages(response => response.content, {
                                                                                                                        max: 1
                                                                                                                    }).then((collected) => {
                                                                                                                        var arg = collected.first().content;
                                                                                                                        arg = arg.trim().split(/ +/g);
                                                                                                                        if (arg[0].toLowerCase() == "sim" || arg[0].toLowerCase() == "s" || arg[0].toLowerCase() == "yes" || arg[0].toLowerCase() == "y") {

                                                                                                                            //console.log('insert into PlayerStatus(Name,Lvl,Xp,ReqXp,Age,Breed,Class,Hp,MaxHp,Mana,MaxMana,Str,Des,Inte,Arm,Cons,Sab,Fai,money)VALUES("'+res.name+'",'+res.lvl+','+res.xp+','+res.rexp+','+res.age+',"'+res.breed+'","'+res.clas+'",'+res.Hp+','+res.MaxHp+','+res.Mana+','+res.MaxMana+','+res.Str+','+res.Des+','+res.Inte+','+res.Arm+','+res.Cons+','+res.Sab+','+res.Fai+','+res.money+')');

                                                                                                                            newmsg.channel.send("**__" + res.name + "__ inserido 😊**");
                                                                                                                            connection.query('insert PlayerStatus(Name,Lvl,Xp,ReqXp,Age,Breed,Class,Hp,MaxHp,Mana,MaxMana,Str,Des,Inte,Arm,Cons,Sab,Fai,money)VALUES("' + res.name + '",' + res.lvl + ',' + res.xp + ',' + res.rexp + ',' + res.age + ',"' + res.breed + '","' + res.clas + '",' + res.Hp + ',' + res.MaxHp + ',' + res.Mana + ',' + res.MaxMana + ',' + res.Str + ',' + res.Des + ',' + res.Inte + ',' + res.Arm + ',' + res.Cons + ',' + res.Sab + ',' + res.Fai + ',' + res.money + ')'), function (error, result, fields) {
                                                                                                                            }

                                                                                                                        }
                                                                                                                    });
                                                                                                                });
                                                                                                            /////////////////////////////////////////////////////////////////////////// Hp


                                                                                                        }).catch(() => {
                                                                                                            newmsg.reply('Cancelado 😰, Erro: **Insira o dinheiro**');
                                                                                                        });
                                                                                                    });
                                                                                                /////////////////////////////////////////////////////////////////////////// Hp

                                                                                            }
                                                                                            else
                                                                                                newmsg.reply('Cancelado 😰, Erro: **Hp e Mp maiores do que Const e Sab permitem**');



                                                                                        }).catch(() => {
                                                                                            newmsg.reply('Cancelado 😰, Erro: **Insira Hp e Mp**');
                                                                                        });
                                                                                    });
                                                                                /////////////////////////////////////////////////////////////////////////// Hp


                                                                            }).catch(() => {
                                                                                newmsg.reply('Cancelado 😰, Erro: **Insira os Status**');
                                                                            });
                                                                        });
                                                                    /////////////////////////////////////////////////////////////////////////// Status

                                                                }
                                                                else throw error;



                                                            }).catch(() => {
                                                                newmsg.reply('Cancelado 😰, Erro: **Insira Idade, Raça e classe**');
                                                            });
                                                        });
                                                    /////////////////////////////////////////////////////////////////////////// Agre Breed Class

                                                } else newmsg.reply('Cancelado 😰, Erro: **Insira o nível**');
                                            }).catch(() => {
                                                newmsg.reply('Cancelado 😰, Erro: **Insira o nível**');
                                            });
                                        });
                                    /////////////////////////////////////////////////////////////////////////// Level

                                }).catch(() => {
                                    newmsg.channel.send('Cancelado :(, Erro:** Insira o nome**');
                                });
                            });
                    }
                }

            }
            else if (com2 == "status") {
                try {
                    var num = args[1].toLowerCase();
                    connection.query('SELECT Name,Lvl,Xp,ReqXp,Age,Breed,Class,Hp,MaxHp,Mana,MaxMana,Str,Des,Inte,Arm,Cons,Sab,Fai,money from playerstatus where name like lower("' + num + '%")', function (error, result, fields) {
                        if (!result.length) { message.channel.send("Mestre, insira as informações"); }
                        else {
                            let suf = "";
                            let money = 0;
                            let I = 0;
                            if ((result[I].money / 1000000) >= 1) {
                                money = result[I].money / 1000000; suf = " RubyCoins";
                            }
                            else if ((result[I].money / 10000) >= 1) {
                                money = result[I].money / 10000; suf = " GoldCoins";
                            }
                            else if ((result[I].money / 100) >= 1) {
                                money = result[I].money / 100; suf = " SilverCoins";
                            }
                            else
                                suf = " CopperCoins"

                            //message.channel.send("**Dinheiro: **"+result[I].money+suf);


                            var e = "**Nome: **" + result[I].Name +
                                "\n\n**Lvl: **" + result[I].Lvl + ", " + result[I].Xp + "/" + result[I].ReqXp +
                                "\n**Idade:** " + result[I].Age +
                                "\n**Raça: **" + result[I].Breed +
                                "\n**Classe:** " + result[I].Class +
                                "\n**Hp: **" + result[I].Hp + "/" + result[I].MaxHp +
                                "\n**Mp:** " + result[I].Mana + "/" + result[I].MaxMana +
                                "\n\n**Força:** " + result[I].Str +
                                "\n**Destreza:** " + result[I].Des +
                                "\n**Inteligencia:** " + result[I].Inte +
                                "\n**Armadura: **" + result[I].Arm +
                                "\n**Constituição: **" + result[I].Cons +
                                "\n**Sabedoria: **" + result[I].Sab +
                                "\n**Fé: **" + result[I].Fai +
                                "\n\n**Dinheiro: **" + money + "" + suf;
                            //console.log(e);
                            message.channel.send(e);
                        }
                    });
                } catch{ }
            }
            else if (com2 == "alt") {
                try {
                    let r = args[2].toLowerCase();
                    let pl = args[1].toLowerCase();
                    let val = args[3];
                    switch (r) {
                        case "nome":
                        case "raca":
                        case "raça":
                        case "classe":
                            if (r == "nome")
                                r = "name";
                            else if (r == "raca" || r == "raça")
                                r = "breed";
                            else if (r == "classe")
                                r = "class";
                            val = "";

                            for (let I = 3; I < args.length; I++) {
                                val += args[I] + " ";
                            }
                            try {
                                var resu;
                                connection.query("UPDATE playerstatus SET " + r + " = '" + val + "' WHERE Name LIKE '%" + pl + "%'"), function (error, result, fields) {
                                }
                            } catch (error) { }
                            break;

                        case "xp":
                            if (args[1] != undefined && args[2] != undefined && args[3] != undefined && args[4] != undefined) {
                                try {
                                    val = parseInt(val);
                                    let xp = parseInt(args[4]);

                                    let rex = 25 * (val + 1);
                                    if (!result.length) { }
                                    else {
                                        connection.query("UPDATE playerstatus SET lvl = " + val + " WHERE Name LIKE '%" + pl + "%'"), function (error, result, fields) {
                                            if (error) throw error;
                                        }
                                        connection.query("UPDATE playerstatus SET xp = " + xp + " WHERE Name LIKE '%" + pl + "%'"), function (error, result, fields) {
                                            if (error) throw error;
                                        }
                                        connection.query("UPDATE playerstatus SET reqxp = " + rex + " WHERE Name LIKE '%" + pl + "%'"), function (error, result, fields) {
                                            if (error) throw error;
                                            Message.channel.send("Alterado");
                                        }
                                    }

                                } catch (error) { }
                            }
                            else message.channel.send("Mestre, insira as informações");
                            break;
                        // Str des Inte Arm Cons Sab Fai

                        case "str":
                        case "força":
                        case "forca":

                        case "destreza":
                        case "des":
                        case "dest":

                        case "inteligencia":
                        case "inteligência":
                        case "int":

                        case "armadura":
                        case "arm":
                        case "armor":

                        case "cons":
                        case "const":
                        case "constituicao":
                        case "constituiçao":

                        case "sab":
                        case "sabedoria":
                        case "sabed":

                        case "fe":
                        case "fé":
                        case "fai":
                            let qr = "";
                            let quo = "";
                            if (r == "str" || r == "força" || r == "forca") {
                                qr = "str";
                                quo = "Força";
                            }
                            else if (r == "des" || r == "destreza" || r == "dest") {
                                qr = "des";
                                quo = "Destreza";
                            }
                            else if (r == "int" || r == "inteligencia" || r == "inteligência") {
                                qr = "inte";
                                quo = "Inteligencia";
                            }
                            else if (r == "armadura" || r == "arm" || r == "armor") {
                                qr = "Arm";
                                quo = "Armadura";
                            }
                            else if (r == "cons" || r == "const" || r == "constituicao" || r == "constituiçao") {
                                qr = "Cons";
                                quo = "Constituicao";
                            }
                            else if (r == "sab" || r == "sabedoria" || r == "sabed") {
                                qr = "Sab";
                                quo = "Sabedoria";
                            }
                            else if (r == "fé" || r == "fe" || r == "fai") {
                                qr = "Fai";
                                quo = "Fe";
                            }


                            val = parseInt(val);

                            message.reply("**" + args[2] + ":** " + quo + " = " + args[3]);

                            connection.query("UPDATE playerstatus SET " + qr + " = " + val + " WHERE Name LIKE '%" + pl + "%'"), function (error, result, fields) { }
                            break;

                        case "idade":
                            try {
                                connection.query("UPDATE playerstatus SET age = " + val + " WHERE Name LIKE '%" + pl + "%'"), function (error, result, fields) {
                                    if (!result.length) { message.channel.send("Mestre, insira as informações"); }
                                    else {
                                        Message.channel.send("Alterado");

                                    }
                                }
                            } catch (error) { }
                            break;

                        default:
                            console.log('E');
                    }
                } catch{ }
            }
            else if (com2 == "del") {
                let n = args[1];

                try {
                    var num = args[1].toLowerCase();
                    var id = -1;
                    //console.log('SELECT Name from playerstatus where name like "'+num+ '%"');
                    connection.query('SELECT Name,id from playerstatus where name like "' + num + '%"', function (error, result, fields) {
                        if (result.length <= 0) { message.channel.send("Mestre, insira as informações"); }
                        else {
                            let a = "";
                            id = parseInt(result[0].id);
                            let name = result[0].Name;
                            message.channel.send('**Mestre, certeza que vai deletar __"' + name + '"__?**')
                                .then((newmsg) => { //Now newmsg is the message you sent
                                    newmsg.channel.awaitMessages(response => response.content, {
                                        max: 1
                                    }).then((collected) => {
                                        a = collected.first().content;
                                        a = a.toLowerCase();

                                        if (a == "s" || a == "sim" || a == "yes" || a == "y") {
                                            try {
                                                connection.query("DELETE FROM `playerstatus` WHERE id = " + id, function (error, result, fields) {
                                                    message.reply("**__" + name + "__ deletado(a)**");
                                                });
                                            } catch{ }
                                        }
                                        //message
                                    })
                                });

                        }
                    });
                } catch{ }
            }
            else if (com2 == "skill" || com2 == "skills") {
                if (com3 == "list") {
                    try {
                        let char = args[2].toLowerCase();

                        connection.query('SELECT id,Name,Lvl,Hp,MaxHp,Mana,MaxMana,Str,Des,Inte,Arm,Cons,Sab,Fai,money from playerstatus where name like lower("' + char + '%") ORDER BY lvl', function (error, result, fields) {
                            if (!result.length) { message.channel.send("Mestre, insira as informações"); }
                            else {

                                var str = result[0].Str;
                                var des = result[0].Des;
                                var int = result[0].Inte;
                                var arm = result[0].Arm;
                                var cons = result[0].Cons;
                                var sab = result[0].Sab;
                                var fai = result[0].Fai;
                                var times = 1;


                                connection.query("SELECT id,mp,nome,playerid,lvl,calc,descr FROM `skill` WHERE playerid = " + result[0].id, function (error, result, fields) {
                                    if (!result.length) { message.channel.send("Mestre, insira as informações"); }
                                    else {

                                        var skills = [];
                                        let mess = "```JavaScript\n";
                                        let IList = 0;
                                        result.forEach(function (result) {

                                            let nome = result.nome;
                                            let lvl = result.lvl;
                                            let mp = result.mp;
                                            let calc = result.calc;
                                            let cot = calc;
                                            let dicez = ""
                                            let min = 0;
                                            let mind = 0;
                                            let soma = 0;

                                            while (cot.indexOf("dice(") >= 0) {
                                                let n = cot.indexOf("dice(");
                                                n += 5;
                                                while (cot[n] != ")") {
                                                    dicez += cot[n];
                                                    n++;
                                                } if (min > 0) { dicez = dicez.slice(1); }
                                                soma += parseFloat(dicez);
                                                min++;
                                                cot = cot.replace("dice(", "").replace(")", "");
                                            }

                                            function dice(num) {
                                                return 1;
                                            }

                                            calc += "( Min: " + eval(calc) + " dmg, Max: " + eval(cot) + " dmg*2 pq é critico, = " + eval("(" + cot + ")*2") + " dmg)";

                                            let des = result.descr;
                                            mess += "Lvl " + lvl + '( ' + mp + 'Mp ): '+nome+': Formula: "' + calc + '".\nDescrição: "' + des + '"\n\n';

                                        });
                                        mess += "```";
                                        message.channel.send(mess);
                                    }
                                });
                            }
                        });

                    } catch{ }
                }
                else if (com3 == "add") {
                    let char = args[2].toLowerCase();

                    try {

                        connection.query('SELECT id,Name from playerstatus where name like lower("' + char + '%")', function (error, result, fields) {
                            if (!result.length) { message.channel.send("Mestre, insira as informações"); }
                            else {
                                //console.log(result);
                                char = result[0].id;
                                let chaname = result[0].Name;
                                let name = "";
                                let mp = 0;
                                let lvl = 0;
                                let calc = "";
                                let descr = "";

                                console.log(chaname);
                                message.author.send("**Qual o nome?**\n```Ex.: Junta de flechas```")
                                    .then((newmsg) => {
                                        newmsg.channel.awaitMessages(response => response.content, {
                                            max: 1
                                        }).then((collected) => {
                                            name = collected.first().content;

                                            message.author.send("**Qual o custo de Mp e o lvl?**\n```Ex.: 5 0```")
                                                .then((newmsg) => {
                                                    newmsg.channel.awaitMessages(response => response.content, {
                                                        max: 1
                                                    }).then((collected) => {
                                                        var arg = collected.first().content.toLowerCase().trim().split(/ +/g);;
                                                        mp = arg[0];
                                                        lvl = arg[1];

                                                        message.author.send('**Qual o calculo? ( Se nenhum, envie "(0)" )**\n```Fórmula, dado: dice(Número), status: Str,Des,Int,Arm,Cons,Sab,Fai. ex.: dice(6)+Str*2```\n```Ex.: (dice(6)+Des)*0.3```')
                                                            .then((newmsg) => {
                                                                newmsg.channel.awaitMessages(response => response.content, {
                                                                    max: 1
                                                                }).then((collected) => {
                                                                    calc = collected.first().content.toLowerCase();
                                                                    if (calc == "(0)")
                                                                        calc = "1-1"

                                                                    function dice(num) { return 1 }
                                                                    try {
                                                                        var str = 0, des = 0, int = 0, arm = 0, cons = 0, sab = 0, fai = 0;
                                                                        eval(calc);

                                                                        message.author.send('**Qual a descrição? ( Se nenhuma, envie "(0)" )**\n```Ex.: Sia atira uma flecha extra, que dará 30% do dano da flecha original.```')
                                                                            .then((newmsg) => {
                                                                                newmsg.channel.awaitMessages(response => response.content, {
                                                                                    max: 1
                                                                                }).then((collected) => {
                                                                                    descr = collected.first().content;
                                                                                    if (descr == "(0)")
                                                                                        descr = "Nenhuma";

                                                                                    message.author.send("**Nome:** " + name +
                                                                                        "\n" + "**Mp: **" + mp +
                                                                                        "\n" + "**Lvl: **" + lvl +
                                                                                        "\n" + "**Calculo: **" + calc +
                                                                                        "\n" + "**Descrição: **" + descr);
                                                                                    //console.log(res);
                                                                                    /////////////////////////////////////////////////////////////////////////// Hp
                                                                                    message.author.send('**Confirma? (Sim ou Nao)**')
                                                                                        .then((newmsg) => {
                                                                                            newmsg.channel.awaitMessages(response => response.content, {
                                                                                                max: 1
                                                                                            }).then((collected) => {
                                                                                                arg = collected.first().content.toLowerCase();
                                                                                                if (arg == "sim" || arg == "s" || arg == "yes" || arg == "y") {
                                                                                                    message.reply('**__Inserida a skill "' + name + '" em "' + chaname + '"__ 😊**');
                                                                                                    connection.query("INSERT INTO `skill`(`playerid`, `Nome`, `mp`, `lvl`, `calc`, `descr`) " +
                                                                                                        "VALUES (" + char + ",'" + name + "'," + mp + "," + lvl + ",'" + calc + "','" + descr + "')", function (error, result, fields) { });

                                                                                                }
                                                                                            });
                                                                                        });

                                                                                });
                                                                            });
                                                                    } catch{
                                                                    }
                                                                });
                                                            });
                                                    });
                                                });
                                        });
                                    });

                            }
                        });
                    } catch{ message.author.send("Mestre, insira algo válido ☹"); }
                }
            }
        }
    }
}
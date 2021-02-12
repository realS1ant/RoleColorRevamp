const djs = require('discord.js');
const client = new djs.Client();
const mongoose = require('mongoose');
const fs = require('fs');
const settings = require('./settings/settings');
const { errorEmbed, defaultEmbed } = require('./utils');
client.commands = new djs.Collection();
client.aliases = new djs.Collection();
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@${process.env.MONGOHOST}/${process.env.MONGODATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log("Connected to Database!");
    }, (reason) => {
        console.error(`Failed Database Connection!\n${reason}`);
    });

fs.readdir('./commands', (err, files) => {
    if (err) console.log(err);

    let jsfiles = files.filter(f => f.split(".").pop() == "js");

    if (jsfiles.length <= 0) {
        console.log("Couldn't find any command files!");
    } else {
        console.log("Command Files Found!");
    }

    jsfiles.forEach((f, i) => {
        let cmdfile = require(`./commands/${f}`);
        console.log(`${f} has been loaded!`);
        client.commands.set(cmdfile.info.name.toLowerCase(), cmdfile);
        cmdfile.info.aliases.forEach(alias => {
            client.aliases.set(alias.toLowerCase(), cmdfile.info.name.toLowerCase());
        });
    });
});

client.on('ready', async () => {
    console.log(`${client.user.tag} is online!`);
    client.user.setActivity(`${process.env.DEFAULTPREFIX}help`, "WATCHING");
    console.log(`Invite: ${process.env.INVITE}`);
});

client.on('message', async message => {
    if (message.author.id === client.user.id) return;
    if (message.channel.type == 'dm' && message.author.id == '158404937460482048' && message.content == 'update') {
        message.reply(`Stats: ${client.guilds.cache.size} Guilds | ${client.users.cache.size} Users`);
        return;
    }
    if (message.channel.type != 'text') return;

    let messageArray = message.content.split(" ");

    var prefix = await settings.getGuildPrefix(message.guild.id);
    if (messageArray[0].startsWith('rc!')) prefix = 'rc!';
    if (messageArray[0].slice(0, prefix.length) != prefix) {
        return;
    }
    let command = messageArray[0].slice(prefix.length).toLowerCase();
    let args = messageArray.slice(1);

    let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (commandfile) commandfile.run(client, mongoose, message, args);
});

client.on('error', (error) => {
    try {
        client.users.cache.get('158404937460482048').send(`An error occured: ${error}`);
    } catch (e) {
        console.log(e);
        console.log(error);
    }
});

client.on('guildCreate', async (guild) => {
    let channel = '';
    guild.channels.cache.every(async (c, key) => {
        if (c.type == 'text' && c.permissionsFor(client.user).has('SEND_MESSAGES') && c.name.toLowerCase() !== "announcements" && c.name.toLowerCase() !== "news" && c.name.toLowerCase() !== "important" && channel === '') {
            channel = c;
        }
    });
    if (channel != '') {
        if (!channel.permissionsFor(client.user).has('MANAGE_ROLES')) {
            channel.send(errorEmbed().setDescription('Missing necessary permission: `MANAGE_ROLES`'));
        } else {
            const embed = await defaultEmbed();
            channel.send(embed.setTitle('Hey! :wave:').setDescription('Thanks for inviting me to your server!').addField(' - What now? - ', `To get setup run **${process.env.DEFAULTPREFIX}setup**!`).setThumbnail(client.user.avatarURL()))
        }
    } else {
        guild.owner.user.send(errorEmbed().setDescription('Missing necessary permission: `MANAGE_ROLES`, in your guild, `' + guild.name + '`.'));
        guild.owner.user.send(embed.setTitle('Hey! :wave:').setDescription('Thanks for inviting me to your server!').addField(' - What now? - ', `To get setup run **${process.env.DEFAULTPREFIX}setup**!`).setThumbnail(client.user.avatarURL()))
    }
});

console.log(`Logging in with Environment: ${process.env.ENVIRONMENT}`);
client.login(process.env.ENVIRONMENT == 'DEV' ? process.env.TESTBOTTOKEN : process.env.BOTTOKEN);
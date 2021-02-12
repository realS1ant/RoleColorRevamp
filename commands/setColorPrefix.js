const djs = require("discord.js");
const settings = require("../settings/settings.js");
const { defaultEmbed, errorEmbed, hasCommandPermission } = require('../utils');

/**
 *
 * @param {djs.Client} client
 * @param {djs.Message} message
 * @param {djs.Guild} guild
 * @param {Array<String>} args
 * 
 */
module.exports.run = async (client, mongoose, message, args) => {
    const embed = await defaultEmbed(message.guild.id);
    if (args.length < 1) {
        const prefix = await settings.getColorPrefix(message.guild.id);
        message.reply((await defaultEmbed(message.guild.id)).setDescription(`The color prefix is what comes before the name of your color to make that color's role name.
        \nYour current color prefix is: ${prefix}`));
        return;
    } else {
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.reply(errorEmbed().setDescription('You need permission `ADMINISTRATOR` to run this command!'));
            return;
        }
        if (args[0] == '' || args[0].length > 12) {
            message.reply(errorEmbed().setDescription('Invalid Prefix!'));
        } else {
            var res = await message.channel.send(embed.setDescription('Updating...'));
            settings.setColorPrefix(message.guild.id, args[0]).then(async () => {
                res.delete();
                const embed = await defaultEmbed(message.guild.id);
                message.reply(embed.addField("Changed Color Prefix to:", args[0]));
            });
        }
    }
}
module.exports.info = {
    name: 'setColorPrefix',
    aliases: ['colorPrefix']
}
const djs = require("discord.js");
const ColorPrefixes = require("../../schemas/ColorPrefixes.js");
const settings = require("../../settings/settings.js");
const { defaultEmbed, errorEmbed, getColors } = require('../../utils');

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
    const oldPrefix = await settings.getColorPrefix(message.guild.id);
    if (args.length < 1) {
        const prefix = await settings.getColorPrefix(message.guild.id);
        message.reply(embed.setDescription(`The color prefix is what comes before the name of your color to make that color's role name.
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
            const colors = await getColors(message.guild);
            colors.forEach(async role => {
                await role.setName(role.name.replace(oldPrefix, args[0]));
            });
            await settings.setColorPrefix(message.guild.id, args[0]);
            res.delete();
            embed.setDescription('');
            message.reply(embed.addField("Changed Color Prefix to:", args[0]));
        }
    }
}
module.exports.info = {
    name: 'setColorPrefix',
    aliases: ['colorPrefix']
}
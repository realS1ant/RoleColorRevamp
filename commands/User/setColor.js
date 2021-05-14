const { defaultEmbed, errorEmbed, getColors } = require('../../utils');
const settings = require('../../settings/settings');
const djs = require('discord.js');

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
    const colors = await getColors(message.guild);
    const prefix = await settings.getColorPrefix(message.guild.id);

    if (!colors.has(prefix.toLowerCase() + args[0].toLowerCase())) {
        const err = await errorEmbed();
        err.setDescription('That isn\'t a color!');
        message.reply(err);
        return;
    }

    //Remove current color roles
    if (message.member.roles.cache.filter(role => role.name.toLowerCase().startsWith(prefix.toLowerCase())).size > 0) {
        await message.member.roles.remove(message.member.roles.cache.filter(role => role.name.toLowerCase().startsWith(prefix.toLowerCase())));
    }

    const role = colors.get(prefix.toLowerCase() + args[0].toLowerCase());
    message.member.roles.add(role);
    embed.setDescription(`Set color to: ${role.name.replace(prefix, '')}`);
    message.reply(embed);
}

module.exports.info = {
    name: 'setColor',
    aliases: []
}
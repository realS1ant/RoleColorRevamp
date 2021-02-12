const { defaultEmbed, errorEmbed, getColors } = require('../utils');
const settings = require('../settings/settings');
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
    const prefix = await settings.getColorPrefix(message.guild.id);
    const colors = await getColors(message.guild);
    embed.setDescription('**Available Colors:**\n');
    colors.forEach(role => {
        embed.description += role.name.replace(prefix, '') + '\n';
    });

    message.reply(embed);
}

module.exports.info = {
    name: 'colors',
    aliases: ['listColors']
}
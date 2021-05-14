const { defaultEmbed } = require('../../utils');
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
    const prefix = await settings.getGuildPrefix(message.guild.id);
    const embed = await defaultEmbed(message.guild.id);
    message.reply(embed.setDescription('This will be here soon to display statistics about this bot\'s usage in your discord and the colors people like the most!'));
}

module.exports.info = {
    name: 'stats',
    aliases: ['statistics', 'colorleaderboard', 'topcolors']
}
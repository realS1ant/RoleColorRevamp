const { defaultEmbed, errorEmbed } = require('../../utils');
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
    if (!message.author.id == '158404937460482048') return;

    message.guild.roles.cache.forEach(async role => {
        const prefix = await settings.getColorPrefix(message.guild.id);
        if (role.name.startsWith(prefix)) {
            role.delete('Role Color delete all');
        }
    });

}

module.exports.info = {
    name: 'rac',
    aliases: ['removeallcolors', 'removeall']
}
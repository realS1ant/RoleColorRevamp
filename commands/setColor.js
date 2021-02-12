const { defaultEmbed, errorEmbed } = require('../utils');
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

}

module.exports.info = {
    name: 'setColor',
    aliases: []
}
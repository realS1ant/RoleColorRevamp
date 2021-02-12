const { defaultEmbed } = require('../utils');
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
    const prefix = await settings.getGuildPrefix(message.guild.id);
    const embed = await defaultEmbed(message.guild.id);
    message.reply(embed.setFooter('RoleColor').setTitle('RoleColor Discord Bot').addField('What am I?', `I'm a bot that can be used by any member to get whatever name color they'd like in any participating guild! [Click here](${process.env.INVITE}) to add me to your own guild!`)
        .setDescription(`**Prefix:** ${prefix}
        \n**User Commands:**
         » ${prefix}help
         » ${prefix}colors
         » ${prefix}setColor
         » ${prefix}vote
        \n**Administrator Commands:**
         » ${prefix}setPrefix
         » ${prefix}setColorPrefix
         » ${prefix}setDefaultColor
         » ${prefix}setBotColor
        \n[__**Invite Me Here**__](${process.env.INVITE})`).setThumbnail(client.user.avatarURL()));
}

module.exports.info = {
    name: 'help',
    aliases: ['info']
}
const djs = require("discord.js");
const canvas = require('canvas');
const CommandPrefixes = require("../../schemas/CommandPrefixes");
const settings = require("../../settings/settings.js");
const { defaultEmbed, errorEmbed, getColorImage, hasCommandPermission } = require('../../utils');



/**
 *
 * @param {djs.Client} client
 * @param {djs.Message} message
 * @param {djs.Guild} guild
 * @param {Array<String>} args
 * 
 */
module.exports.run = async (client, mongoose, message, args) => {
    if (args.length < 1) {
        const color = await settings.getGuildColor(message.guild.id);
        const image = getColorImage(color);
        const embed = await defaultEmbed(message.guild.id);
        message.reply(embed.setDescription(`Your current color is: ${color}`).attachFiles(image).setImage(`attachment://${image.name}`));
        return;
    } else {
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.reply(errorEmbed().setDescription('You need permission `ADMINISTRATOR` to run this command!'));
            return;
        }
        if (!(args[0].length == 6 || args[0].length == 7)) {
            message.reply(errorEmbed().setDescription('Invalid Color! (Ex. 4298f5)'));
        } else {
            const embed = await defaultEmbed(message.guild.id);
            var res = await message.channel.send(embed.setDescription('Updating...'));
            const color = args[0].replace('#', '');
            settings.setGuildColor(message.guild.id, color).then(async () => {
                res.delete();
                const image = getColorImage(color);
                const embed = await defaultEmbed(message.guild.id);
                message.reply(embed.setDescription(`Set color to: ${color}`).attachFiles(image).setImage(`attachment://${image.name}`));
            });
        }
    }
}
module.exports.info = {
    name: 'setGuildColor',
    aliases: ['setBotColor', 'setEmbedColor', 'guildColor', 'botColor']
}
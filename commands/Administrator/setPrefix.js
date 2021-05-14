const djs = require("discord.js");
const CommandPrefixes = require("../../schemas/CommandPrefixes");
const settings = require("../../settings/settings.js");
const { defaultEmbed, errorEmbed, hasCommandPermission, getColors } = require('../../utils');

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
        const prefix = await settings.getGuildPrefix(message.guild.id);
        message.reply((await defaultEmbed(message.guild.id)).setDescription(`Your current prefix is: ${prefix}`));
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
            await settings.setGuildPrefix(message.guild.id, args[0]);
            res.delete();
            message.reply(embed.addField("Changed Command Prefix to:", args[0]));
        }
    }
}
module.exports.info = {
    name: 'setPrefix',
    aliases: ['prefix', 'setguildprefix', 'setcommandprefix', 'setcmdprefix', 'guildprefix', 'commandprefix', 'cmdprefix']
}
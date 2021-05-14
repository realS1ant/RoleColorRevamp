const { defaultEmbed, errorEmbed, getColorImage, getColors, permissionsCheck } = require('../../utils');
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
    const prefix = await settings.getGuildPrefix(message.guild.id);
    const colorPrefix = await settings.getColorPrefix(message.guild.id);

    if (!permissionsCheck(message)) {
        message.reply(errorEmbed().setDescription('You don\'t have permission for that! You need `MANAGE_ROLES` permission. This permission will be configurable in the future.'));
        return;
    }

    //addColor red ff0000
    if (args.length < 2) {
        message.reply(errorEmbed().setDescription(`**Invalid format**\n${prefix}addColor <Color Name> <Hex Code>`))
    } else {
        let roleName = args[0];
        let color = args[1];
        const colors = await getColors(message.guild);
        //checks
        if (color.length == 6 || color.length == 7) {
            if (colors.find(role => role.name.toLowerCase() == (colorPrefix + roleName).toLowerCase())) {
                message.reply(embed.setDescription('There is already a color with that name!'));
                return;
            }

            try {
                const image = getColorImage(color.replace('#', ''));
                message.guild.roles.everyone.permissions
                message.guild.roles.create({
                    'data': {
                        'name': (colorPrefix + roleName),
                        'color': color
                    }
                }).then(role => {
                    role.setPermissions(message.guild.roles.everyone.permissions);
                    message.reply(embed.setDescription(`**Added Color:\n${roleName}**`).attachFiles(image).setThumbnail(`attachment://${image.name}`));
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            message.reply(embed.setDescription('That isn\'t a valid color format!\nCorrect format: `#4298f5`'));
        }
    }
}

module.exports.info = {
    name: 'addColor',
    aliases: []
}
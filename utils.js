const djs = require('discord.js')
const settings = require('./settings/settings')
const { registerFont, createCanvas } = require('canvas')

registerFont('./assets/AnonymousPro.ttf', { family: 'AnonymousPro' })

/**
 * 
 * @param {String} color 
 */
function createImage(color) {
    const canvas = createCanvas(500, 500)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = `#${color}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas.toBuffer();
}

/**
 * @returns {djs.MessageEmbed}
 */
async function defaultEmbed(guildId) {
    var embed = new djs.MessageEmbed();
    embed.setColor(await settings.getGuildColor(guildId));
    embed.setTimestamp().setFooter('RoleColor');
    return embed;
}
/**
 * @returns {djs.MessageEmbed}
 */
function errorEmbed() {
    var embed = new djs.MessageEmbed();
    embed.setColor('f56042');
    embed.setTimestamp();
    return embed;
}
/**
 * 
 * @param {String} color 
 * @returns {djs.MessageAttachment}
 */
function getColorImage(color) {
    return (new djs.MessageAttachment(createImage(color), `${color}.png`));
}
/**
 * 
 * @param {djs.Guild} guild
 * @returns {djs.Collection<string, djs.Role>}
 */
async function getColors(guild) {
    var prefix = await settings.getColorPrefix(guild.id);
    return guild.roles.cache.filter(role => role.name.toLowerCase().startsWith(prefix.toLowerCase()));
}


/**
 * 
 * @param {djs.Message} message
 * @returns {Boolean}
 */
function permissionsCheck(message) {
    return message.member.hasPermission('MANAGE_ROLES');
}

module.exports = {
    defaultEmbed,
    errorEmbed,
    getColorImage,
    getColors,
    permissionsCheck
}
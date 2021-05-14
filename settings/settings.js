const discordjs = require('discord.js');
const CommandPrefixes = require("../schemas/CommandPrefixes");
const GuildColors = require('../schemas/GuildColors');
const ColorPrefixes = require('../schemas/ColorPrefixes');
var guildPrefixesCache = new discordjs.Collection();
var guildColorsCache = new discordjs.Collection();
var colorPrefixesCache = new discordjs.Collection();

//Guild Colors
//function getGuildColor(guildId) {
//return '4298f5';
//    return 'd93e0b';
//}

async function getGuildColor(guildId) {
    if (!guildId) return process.env.DEFAULTCOLOR;
    if (guildColorsCache.has(guildId)) {
        return guildColorsCache.get(guildId);
    } else {
        if (await GuildColors.exists({ guildId })) {
            const color = await GuildColors.findOne({ guildId });
            guildColorsCache.set(guildId, color.get('cmdPrefix'));
            return color.get('color');
        } else {
            const color = process.env.DEFAULTCOLOR;
            guildColorsCache.set(guildId, color);
            return color;
        }
    }
}

async function setGuildColor(guildId, color) {
    if (color.toLowerCase() == process.env.DEFAULTCOLOR.toLowerCase()) {
        guildColorsCache.set(guildId, process.env.DEFAULTCOLOR);
        await GuildColors.findOneAndDelete({ guildId });
        return;
    }

    if (guildColorsCache.has(guildId)) {
        guildColorsCache.delete(guildId);
        guildColorsCache.set(guildId, color);
        if (await GuildColors.exists({ guildId })) {
            await GuildColors.findOneAndUpdate({ guildId }, { color });
        } else {
            await new GuildColors({
                guildId,
                color
            }).save();
        }
    } else {
        if (await GuildColors.exists({ guildId })) {
            await GuildColors.findOneAndUpdate({ guildId }, { color });
        } else {
            await new GuildColors({
                guildId,
                cmdPrefix
            }).save();
        }
        guildColorsCache.set(guildId, color);
    }
}

//Guild Default Color



//Guild Prefixes

//NON-CACHED FUNCTIONING VERSION!
/*async function getGuildPrefix(guildId) {
    if (!await CommandPrefixes.exists({ guildId: guildId })) {
        return process.env.DEFAULTPREFIX;
    } else {
        const cmdPrefix = await CommandPrefixes.findOne({ guildId: guildId });
        return cmdPrefix.get('cmdPrefix');
    }
}

async function setGuildPrefix(guildId, cmdPrefix) {
    if (cmdPrefix.toLowerCase() == process.env.DEFAULTPREFIX.toLowerCase()) {
        console.log('set to origional prefix');
        await CommandPrefixes.findOneAndDelete({ guildId });
        return;
    }

    if (await CommandPrefixes.exists({ guildId })) {
        (await CommandPrefixes.findOneAndUpdate({ guildId }, { cmdPrefix }));
    } else {
        await new CommandPrefixes({
            guildId,
            cmdPrefix
        }).save();
    }
}*/
//Cached version
async function getGuildPrefix(guildId) {
    if (guildPrefixesCache.has(guildId)) {
        return guildPrefixesCache.get(guildId);
    } else {
        if (await CommandPrefixes.exists({ guildId })) {
            const prefix = await CommandPrefixes.findOne({ guildId });
            guildPrefixesCache.set(guildId, prefix.get('cmdPrefix'));
            return prefix.get('cmdPrefix');
        } else {
            const prefix = process.env.DEFAULTPREFIX;
            guildPrefixesCache.set(guildId, prefix);
            return prefix;
        }
    }
}

async function setGuildPrefix(guildId, cmdPrefix) {
    if (cmdPrefix.toLowerCase() == process.env.DEFAULTPREFIX.toLowerCase()) {
        guildPrefixesCache.set(guildId, process.env.DEFAULTPREFIX);
        await CommandPrefixes.findOneAndDelete({ guildId });
        return;
    }

    if (guildPrefixesCache.has(guildId)) {
        guildPrefixesCache.delete(guildId);
        guildPrefixesCache.set(guildId, cmdPrefix);
        if (await CommandPrefixes.exists({ guildId })) {
            await CommandPrefixes.findOneAndUpdate({ guildId }, { cmdPrefix });
        } else {
            await new CommandPrefixes({
                guildId,
                cmdPrefix
            }).save();
        }
    } else {
        if (await CommandPrefixes.exists({ guildId })) {
            await CommandPrefixes.findOneAndUpdate({ guildId }, { cmdPrefix });
        } else {
            await new CommandPrefixes({
                guildId,
                cmdPrefix
            }).save();
        }
        guildPrefixesCache.set(guildId, cmdPrefix);
    }
}

async function getColorPrefix(guildId) {
    if (colorPrefixesCache.has(guildId)) {
        return colorPrefixesCache.get(guildId);
    } else {
        if (await ColorPrefixes.exists({ guildId })) {
            const prefix = await ColorPrefixes.findOne({ guildId });
            colorPrefixesCache.set(guildId, prefix.get('colorPrefix'));
            return prefix.get('colorPrefix');
        } else {
            const prefix = process.env.DEFAULTCOLORPREFIX;
            colorPrefixesCache.set(guildId, prefix);
            return prefix;
        }
    }
}

async function setColorPrefix(guildId, colorPrefix) {
    if (colorPrefix.toLowerCase() == process.env.DEFAULTCOLORPREFIX.toLowerCase()) {
        colorPrefixesCache.set(guildId, process.env.DEFAULTCOLORPREFIX);
        await ColorPrefixes.findOneAndDelete({ guildId });
        return;
    }

    if (colorPrefixesCache.has(guildId)) {
        colorPrefixesCache.delete(guildId);
        colorPrefixesCache.set(guildId, colorPrefix);
        if (await ColorPrefixes.exists({ guildId })) {
            await ColorPrefixes.findOneAndUpdate({ guildId }, { colorPrefix });
        } else {
            await new ColorPrefixes({
                guildId,
                colorPrefix
            }).save();
        }
    } else {
        if (await ColorPrefixes.exists({ guildId })) {
            await ColorPrefixes.findOneAndUpdate({ guildId }, { colorPrefix });
        } else {
            await new ColorPrefixes({
                guildId,
                colorPrefix
            }).save();
        }
        colorPrefixesCache.set(guildId, colorPrefix);
    }
}

module.exports = {
    getGuildColor,
    setGuildColor,
    getGuildPrefix,
    setGuildPrefix,
    getColorPrefix,
    setColorPrefix
};
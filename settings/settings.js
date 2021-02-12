const discordjs = require('discord.js');
const CommandPrefixes = require("../schemas/CommandPrefixes");
const GuildColors = require('../schemas/GuildColors');
const ColorPrefixes = require('../schemas/ColorPrefixes');
var guildPrefixes = new discordjs.Collection();
var guildColors = new discordjs.Collection();
var colorPrefixes = new discordjs.Collection();

//Guild Colors
//function getGuildColor(guildId) {
//return '4298f5';
//    return 'd93e0b';
//}

async function getGuildColor(guildId) {
    if (guildColors.has(guildId)) {
        return guildColors.get(guildId);
    } else {
        if (await GuildColors.exists({ guildId })) {
            const color = await GuildColors.findOne({ guildId });
            guildColors.set(guildId, color.get('cmdPrefix'));
            return color.get('color');
        } else {
            const color = process.env.DEFAULTCOLOR;
            guildColors.set(guildId, color);
            return color;
        }
    }
}

async function setGuildColor(guildId, color) {
    if (color.toLowerCase() == process.env.DEFAULTCOLOR.toLowerCase()) {
        guildColors.set(guildId, process.env.DEFAULTCOLOR);
        await GuildColors.findOneAndDelete({ guildId });
        return;
    }

    if (guildColors.has(guildId)) {
        console.log('in local cache');
        guildColors.delete(guildId);
        guildColors.set(guildId, color);
        if (await GuildColors.exists({ guildId })) {
            await GuildColors.findOneAndUpdate({ guildId }, { color });
        } else {
            await new GuildColors({
                guildId,
                color
            }).save();
        }
    } else {
        console.log('pulling from db');
        if (await GuildColors.exists({ guildId })) {
            await GuildColors.findOneAndUpdate({ guildId }, { color });
        } else {
            await new GuildColors({
                guildId,
                cmdPrefix
            }).save();
        }
        guildColors.set(guildId, color);
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
    if (guildPrefixes.has(guildId)) {
        return guildPrefixes.get(guildId);
    } else {
        if (await CommandPrefixes.exists({ guildId })) {
            const prefix = await CommandPrefixes.findOne({ guildId });
            guildPrefixes.set(guildId, prefix.get('cmdPrefix'));
            return prefix.get('cmdPrefix');
        } else {
            const prefix = process.env.DEFAULTPREFIX;
            guildPrefixes.set(guildId, prefix);
            return prefix;
        }
    }
}

async function setGuildPrefix(guildId, cmdPrefix) {
    if (cmdPrefix.toLowerCase() == process.env.DEFAULTPREFIX.toLowerCase()) {
        guildPrefixes.set(guildId, process.env.DEFAULTPREFIX);
        await CommandPrefixes.findOneAndDelete({ guildId });
        return;
    }

    if (guildPrefixes.has(guildId)) {
        guildPrefixes.delete(guildId);
        guildPrefixes.set(guildId, cmdPrefix);
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
        guildPrefixes.set(guildId, cmdPrefix);
    }
}

async function getColorPrefix(guildId) {
    if (colorPrefixes.has(guildId)) {
        return colorPrefixes.get(guildId);
    } else {
        if (await ColorPrefixes.exists({ guildId })) {
            const prefix = await ColorPrefixes.findOne({ guildId });
            colorPrefixes.set(guildId, prefix.get('colorPrefix'));
            return prefix.get('colorPrefix');
        } else {
            const prefix = process.env.DEFAULTCOLORPREFIX;
            colorPrefixes.set(guildId, prefix);
            return prefix;
        }
    }
}

async function setColorPrefix(guildId, colorPrefix) {
    if (colorPrefix.toLowerCase() == process.env.DEFAULTCOLORPREFIX.toLowerCase()) {
        colorPrefix.set(guildId, process.env.DEFAULTCOLORPREFIX);
        await colorPrefix.findOneAndDelete({ guildId });
        return;
    }

    if (colorPrefixes.has(guildId)) {
        colorPrefixes.delete(guildId);
        colorPrefixes.set(guildId, colorPrefix);
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
        colorPrefixes.set(guildId, colorPrefix);
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
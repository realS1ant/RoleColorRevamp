const mongoose = require('mongoose');

const prefixSchema = new mongoose.Schema({
    guildId: String, // String is shorthand for {type: String}
    color: String
});
module.exports = mongoose.model('GuildColors', prefixSchema);
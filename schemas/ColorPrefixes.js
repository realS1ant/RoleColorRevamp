const mongoose = require('mongoose');

const prefixSchema = new mongoose.Schema({
    guildId: String, // String is shorthand for {type: String}
    colorPrefix: String
});
module.exports = mongoose.model('ColorPrefixes', prefixSchema);
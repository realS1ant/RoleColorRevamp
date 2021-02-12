const mongoose = require('mongoose');

const prefixSchema = new mongoose.Schema({
    guildId: String, // String is shorthand for {type: String}
    cmdPrefix: String
});
module.exports = mongoose.model('CommandPrefixes', prefixSchema);
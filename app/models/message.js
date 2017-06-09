var mongoose = require('mongoose');

var msgSchema = mongoose.Schema({
    date        : { type: Date, default: Date.now },
    author      : String,
    roomId      : String,
    text        : String
});

module.exports = mongoose.model('Msg', msgSchema);

var mongoose = require('mongoose');

var roomsSchema = mongoose.Schema({
    title       : String,
    date        : { type: Date, default: Date.now },
    author      : String
});

module.exports = mongoose.model('Rooms', roomsSchema);

// app/models/kali.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var KaliSchema   = new Schema({
	ip: String,
	time: Date
});

module.exports = mongoose.model('Kali', KaliSchema);
// app/models/kali.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var KaliSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Kali', KaliSchema);
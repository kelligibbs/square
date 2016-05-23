var mongoose = require('mongoose');
var schema = mongoose.Schema;
var arrayExtensions = require('./arrayExtensions');
var constants = require("./constants");
var Output = require("./output");

var stardateSchema = new schema({
    value: Number
}, { collection: 'stardate' });

stardateSchema.methods.advanceHour = function() {
    this.value = Math.round((this.value + 0.1) * 100) / 100;
};

stardateSchema.methods.pretty = function() {
    return "The current stardate is " + this.value + ".";
};

function load(callback) {
	stardateModel.find({}, function(err, docs) {
		console.log(err);
		console.log(docs);
		callback(docs);
	});
}

var stardateModel = mongoose.model('stardate', stardateSchema);

module.exports = {
	schema: stardateSchema,
	stardate: stardateModel,
	load: load
};
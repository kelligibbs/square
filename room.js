var mongoose = require('mongoose');
var schema = mongoose.Schema;
var arrayExtensions = require('./arrayExtensions');
var constants = require('./constants');
var utility = require("./utility");

var exitSchema = new schema({
	direction: String,
	description: String,
	keyId: Number,
	keywords: [],
	isClosable: Boolean,
	isClosed: Boolean,
	isLockable: Boolean,
	isLocked: Boolean,
	isPickproof: Boolean,
	toRoomId: Number
});

var roomSchema = new schema({
	id: Number,
	title: String,
	description: String,
	exits: [ exitSchema ],
	players: [],
	npcs: [],
	contents: [],
	extras: [{
		description: String,
	   	category: { type: Number, default: global.CATEGORY_EXTRA },
		keywords: []
	}]
});

roomSchema.methods.addItem = function(item) {
	this.contents.push(item);
	item.room = this;
};

roomSchema.methods.removeItem = function(item) {
	this.contents.splice(this.contents.indexOf(item), 1);
	item.room = null;
};

roomSchema.methods.contains = function(item) {
	for (var i = 0; i < this.contents.length; i++) {
		if (this.contents[i] === item) {
			return true;
		}
	}

	return false;
};

roomSchema.methods.addCharacter = function(character) {
	if(character.isNpc()) {
		this.npcs.push(character);
	}
	else {
		this.players.push(character);
	}
	character.room = this;
};

roomSchema.methods.removeCharacter = function(character) {
	if(character.isNpc()) {
		this.npcs.splice(this.npcs.indexOf(character), 1);
	}
	else {
		this.players.splice(this.players.indexOf(character), 1);
	}
	character.room = null;
};

roomSchema.methods.getCharacter = function(parameter) {
	var name = parameter;
	var member = 1;

	if (parameter.indexOf(".") > -1) {
		var tokens = parameter.split(".");

		member = parseInt(tokens[0], 10);
		name = tokens[1];
	}

	if(member === 0) {
		return this.getPlayer(name);
	}
	else {
		var counter = 0;
		var player = this.getPlayer(name);
		
		if(player !== null) {
			counter++;
			
			if(counter === member) {
				return player;
			}
		}
		
		var key = name.toLowerCase();
		
		for (var i = 0; i < this.npcs.length; i++) {
			for (var j = 0; j < this.npcs[i].keywords.length; j++) {
				if (this.npcs[i].keywords[j].toLowerCase() === key) { 
					counter++;
					break;
				}
			}
			
			if(counter === member) {
				return this.npcs[i];
			}
		}
	}

	return null;
};

roomSchema.methods.getPlayer = function(name) {
	var key = name.toLowerCase();

	for (var i = 0; i < this.players.length; i++) {
		if (this.players[i].name.toLowerCase() === key) {
			return this.players[i];
		}
	}

	return null;
};

roomSchema.methods.getPlayers = function() {
	return this.players;
};

roomSchema.methods.getExit = function(direction) {
	for(var i = 0; i < this.exits.length; i++) {
		if(this.exits[i].direction.toLowerCase() === direction.toLowerCase()) {
			return this.exits[i];
		}
	}
	
	return null;
};

roomSchema.methods.listExits = function(character) {
	var messages = [];
	
	// TODO: Blind, Dark

	messages.push(character.emitMessage("Obvious Exits:"));
	
	for(var i = 0; i < this.exits.length; i++) {
		if(this.exits[i].isClosed === false) {
			var connectedRoom = character.world.getRoom(this.exits[i].toRoomId);
			
			if(connectedRoom !== null) {
				messages.push(character.emitMessage("  " + this.exits[i].direction + " - " + connectedRoom.title));
			}
		}
	}
	
	return messages;
};

roomSchema.methods.getAdjacentRoom = function(exit) {
	if(exit !== null) {
		if(exit.isClosed !== null) {
			var adjacentRoom = this.world.getRoom(exit.toRoomId);
			
			if(adjacentRoom !== null) {
				return adjacentRoom;
			}
		}
	}
	
	return null;
};

roomSchema.methods.getAdjacentRooms = function() {
	var rooms = [];
	
	for(var i = 0; i < this.exits.length; i++) {
		var room = this.getAdjacentRoom(this.exits[i]);
		
		if(room !== null) {
			rooms.push(room);
		}
	}

	return rooms;
};

roomSchema.methods.getContentsExtras = function() {
	var result = [];
	
	for(var i = 0; i < this.contents.length; i++) {
		for(var j = 0; j < this.contents[i].extras.length; j++) {
			result.push(this.contents[i].extras[j]);
		}
	}
	
	return result;
};

roomSchema.methods.showRoomToCharacter = function(character) {
	var description = [];

// // 	// TODO: Dark room, blind character

	description.push( { text: this.title, color: "Cyan" } );
	
	description.push( { text: utility.getFormattedLongString(this.description, true), color: "Gray" } );

	var exitsMessage = "";

	for(var i = 0; i < this.exits.length; i++) {
		var exit = this.exits[i];
		
		if(exit.isClosed) {
			exitsMessage = exitsMessage + " " + exit.direction.toLowerCase();
		}
		else {
			exitsMessage = exitsMessage + " " + exit.direction.toUpperCase();
		}
	}
	
	if(exitsMessage === "") {
		exitsMessage = " None!";
	}
	
	description.push( { text: "[ Exits:" + exitsMessage + " ]", color: "Cyan" } );

 	for (var i = 0; i < this.players.length; i++) {
 		if (this.players[i] !== character) {
 			// TODO: if character.canSee(this.players[i])
 			description.push( { text: this.players[i].getDescription(), color: "Orange" } );
 		}
 	}
 	
 	for(var j = 0; j < this.npcs.length; j++) {
 		// TODO: if character.canSee(this.npcs[i])
 		description.push( { text: this.mobs[j].longDescription, color: "Orange" } );
 	}

 	for (var i = 0; i < this.contents.length; i++) {
 		// TODO: if character.canSee(this.contents[i])
 		description.push( { text: this.contents[i].longDescription, color: 'Green' } );
 	}

	character.emitMessages(description);
	return description;
};

function load(callback) {
	roomModel.find({}, function(err, docs) {
		//console.log(err);
		callback(docs);
	});
}

var exitModel = mongoose.model('exit', exitSchema);
var roomModel = mongoose.model('room', roomSchema);

module.exports = {
	roomSchema: roomSchema,
	room: roomModel,
	exitSchema: exitSchema,
	exit: exitModel,
	load: load
};
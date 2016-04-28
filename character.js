var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var constants = require("./constants");
var Social =  require("./social");


var characterSchema = new schema({
	name: String,
	gender: Number,
	
	experience: Number,
	
	height: Number,
	weight: Number,

	position: Number,
	
	money: Number,
	bank: Number,
	
	wearing: [],
	inventory: []
});



/* BEGIN -- Utility methods for message distribution */

characterSchema.methods.emitMessages = function(messages) {
	for(var i = 0; i < messages.length; i++) {
		this.emitMessage(messages[i].text, messages[i].color);
	}
};

characterSchema.methods.emitMessage = function(message, color) {
	if(message != undefined) {
		if(message.length > 0) {
			var formattedMessage = message.substring(0, 1).toUpperCase() + message.substring(1);
		
			if(this.socket !== undefined) {
				var prompt = "> ";
				
				if(color !== undefined) {
					this.socket.emit('message', { message: formattedMessage, color: color, prompt: prompt });
				}
				else {
					this.socket.emit('message', { message: formattedMessage, prompt: prompt });
				}
			}
			
			return formattedMessage;
		}
	}

	return "";
};

characterSchema.methods.emitRoomMessages = function(messages) {
	for(var i = 0; i < messages.length; i++) {
		this.emitRoomMessage(messages[i].text, messages[i].color);
	}
};

characterSchema.methods.emitRoomMessage = function(message, color) {
	var formattedMessage = message.substring(0, 1).toUpperCase() + message.substring(1);

	if(this.room != undefined) {
		if(this.room.players != undefined) {
			for(var i = 0; i < this.room.players.length; i++) {
				if(this.room.players[i] !== this) {
					this.room.players[i].emitMessage(formattedMessage, color);
				}
			}
		}
	}
	
	return formattedMessage;
};

characterSchema.methods.emitObservedMessage = function(target, message, color) {
	var formattedMessage = message.substring(0, 1).toUpperCase() + message.substring(1);

	for(var i = 0; i < this.room.players.length; i++) {
		if(this.room.players[i] !== this && this.room.players[i] !== target) {
			this.room.players[i].emitMessage(formattedMessage, color);
		}
	}
	
	return formattedMessage;
};

/* END -- Utility methods for message distribution */

/* BEGIN -- General functions for formatting */

characterSchema.methods.getPersonalPronoun = function() {
	switch(this.gender) {
		case global.GENDER_NEUTRAL:
			return "it";
		case global.GENDER_MALE:
			return "he";
		case global.GENDER_FEMALE:
			return "she";
	}
};

characterSchema.methods.getObjectPronoun = function() {
	switch(this.gender) {
		case global.GENDER_NEUTRAL:
			return "it";
		case global.GENDER_MALE:
			return "him";
		case global.GENDER_FEMALE:
			return "her";
	}
};

characterSchema.methods.getPossessivePronoun = function() {
	switch(this.gender) {
		case global.GENDER_NEUTRAL:
			return "its";
		case global.GENDER_MALE:
			return "his";
		case global.GENDER_FEMALE:
			return "her";
	}
};

/* END -- General functions for formatting */

characterSchema.methods.isNpc = function() {
	return false;
};

characterSchema.methods.getFormattedHeight = function() {
	return Math.floor(this.height / 12).toString() + " feet, " + (this.height % 12).toString() + " inches";
};

characterSchema.methods.getBMI = function() {
	return Math.floor((this.weight / (this.height * this.height)) * 703);
};

characterSchema.methods.move = function(direction) {
	var messages = [0];
	
	var exit = this.room.getExit(direction);
	
	if(exit === null) {
		messages[0] = this.emitMessage("Alas, you cannot go that way...");
		return messages;
	}

	if(exit.isClosed === true) {
		messages[0] = this.emitMessage("The " + exit.keywords[0] + " seems to be closed.");
		return messages;
	}
	
	var newRoom = this.world.getRoom(exit.toRoomId);
	
	if(newRoom !== null) {
		//if(newRoom.mobsAllowed === false && this.isNpc() === true) {
		//	return;
		//}

		messages[0] = this.emitRoomMessage(this.name + " leaves " + global.getDirection(direction) + ".");
		
		var oldRoom = this.room;
		
		this.room.removeCharacter(this);
		
		newRoom.addCharacter(this);
		messages[1] = this.emitRoomMessage(this.name + " has arrived.");
		messages[2] = newRoom.showRoomToCharacter(this);

		for(var i = 0; i < this.followers.length; i++) {
			if(this.followers[i].room === oldRoom) {
				this.followers[i].emitMessage("You follow " + this.name + ".");
				this.followers[i].move(direction);
			}
		}
	 	
	 	return messages;
	}
	else {
		this.emitMessage("Room not found -- this is a bug.");
		this.emitMessage(global.MESSAGE_BUG);
	}
};

characterSchema.methods.emote = function(parameter) {
	var messages = [];
	messages[0] = this.emitMessage(this.name + " " + parameter);
	messages[1] = this.emitRoomMessage(this.name + " " + parameter);
	return messages;
};

characterSchema.methods.stand = function() {
	var messages = [];
	
	switch(this.position) {
		case global.POS_STANDING:
			messages[0] = this.emitMessage("You are already standing.");
			break;
		case global.POS_SITTING:
			messages[0] = this.emitMessage("You stand up.");
			messages[1] = this.emitRoomMessage(this.name + " clambers to " + this.getPossessivePronoun() + " feet.");
			this.position = global.POS_STANDING;
			break;
        case global.POS_RESTING:
            messages[0] = this.emitMessage("You stop resting, and stand up.");
			messages[1] = this.emitRoomMessage(this.name + " stops resting, and clambers on " + this.getPossessivePronoun() + " feet.");
            this.position = global.POS_STANDING;
            break;
        case global.POS_SLEEPING:
            messages[0] = this.emitMessage("You have to wake up first!");
            break;
        default:
            messages[0] = this.emitMessage("You stop floating around, and put your feet on the ground.");
            messages[1] = this.emitRoomMessage(this.name + " stops floating around and puts " + this.getPossessivePronoun() + " feet on the ground.");
            this.position = global.POS_STANDING;
            break;
	}
	
	return messages;
};

characterSchema.methods.sit = function() {
	var messages = [];
	
	switch(this.position) {
		case global.POS_STANDING:
			messages[0] = this.emitMessage("You sit down.");
			messages[1] = this.emitRoomMessage(this.name + " sits down.");
			this.position = global.POS_SITTING;
			break;
		case global.POS_SITTING:
			messages[0] = this.emitMessage("You're sitting already.");
			break;
        case global.POS_RESTING:
            messages[0] = this.emitMessage("You stop resting, and sit up.");
            messages[1] = this.emitRoomMessage(this.name + " stops resting.");
            this.position = global.POS_SITTING;
            break;
        case global.POS_SLEEPING:
            messages[0] = this.emitMessage("You have to wake up first.");
            break;
        default:
            messages[0] = this.emitMessage("You stop floating around, and sit down.");
            messages[1] = this.emitRoomMessage(this.name + " stops floating around, and sit down.");
            this.position = global.POS_SITTING;
            break;
	}
	
	return messages;
};

characterSchema.methods.rest = function() {
	var messages = [];
	
	switch(this.position) {
		case global.POS_STANDING:
			messages[0] = this.emitMessage("You sit down and rest your tired bones.");
			messages[1] = this.emitRoomMessage(this.name + " sits down and rests.");
			this.position = global.POS_RESTING;
			break;
		case global.POS_SITTING:
			messages[0] = this.emitMessage("You rest your tired bones.");
			messages[1] = this.emitMessage(this.name + " rests.");
			this.position = global.POS_RESTING;
			break;
        case global.POS_RESTING:
            messages[0] = this.emitMessage("You are resting already.");
            break;
        case global.POS_SLEEPING:
            messages[0] = this.emitMessage("You have to wake up first.");
            break;
        default:
            this.emitMessage("You stop floating around, and stop to rest your tired bones.");
            this.emitRoomMessage(this.name + " stops floating around, and rests.");
            this.position = global.POS_RESTING;
            break;
	}
	
	return messages;
};

characterSchema.methods.sleep = function() {
	var messages = [];
	
	switch(this.position) {
	    case global.POS_STANDING:
	    case global.POS_SITTING:
	    case global.POS_RESTING:
	        messages[0] = this.emitMessage("You go to sleep.");
	        messages[1] = this.emitRoomMessage(this.name + " lies down and falls asleep.");
	        this.position = global.POS_SLEEPING;
	        break;
        case global.POS_SLEEPING:
            messages[0] = this.emitMessage("You are already sound asleep.");
            break;
        default:
            messages[0] = this.emitMessage("You stop floating around, and lie down to sleep.");
            messages[1] = this.emitRoomMessage(this.name + " stops floating around, and lie down to sleep.");
            this.position = global.POS_SLEEPING;
            break;
    }
    
	return messages;    
};

characterSchema.methods.wake = function() {
	var messages = [];
	
	if(this.position > global.POS_SLEEPING) {
		messages[0] = this.emitMessage("You are already awake...");
	}
	else if(this.position < global.POS_SLEEPING) {
		messages[0] = this.emitMessage("You can't wake up! You're in pretty bad shape!");
	}
	else {
		messages[0] = this.emitMessage("You awaken, and sit up.");
		messages[1] = this.emitRoomMessage(this.name + " awakens.");
		this.position = global.POS_SITTING;
	}
	
	return messages;    
};

characterSchema.methods.say = function(message) {
	if(message.length < 1) {
		return this.emitMessage("Yes, but WHAT do you want to say?");
	}
	else {
		var returnedMessages = [];
		returnedMessages[0] = this.emitMessage("You say, '" + message + "'");
		returnedMessages[1] = this.emitRoomMessage(this.name + " says, '" + message + "'");
		return returnedMessages;
	}
};

characterSchema.methods.generalCommunication = function(subCommand, message) {
	var messages = [];
	
	if(this.room.isSoundproof) {
		messages[0] = this.emitMessage('The walls seem to absorb your words.');
		return messages;
	}
	
    var commType;
    var commColor;

    switch(subCommand) {
		case global.SCMD_HOLLER:
			if(this.isNoHoller) {
				messages[0] = this.emitMessage('Turn off your noholler flag first!');
				return messages;
			}
			
			commType = 'holler';
			commColor = 'Orange';
			break;
		case global.SCMD_SHOUT:
			if(this.isNoShout) {
				messages[0] = this.emitMessage('Turn off your noshout flag first!');
				return messages;
			}
			
			commType = 'shout';
			commColor = 'Yellow';
			break;
		case global.SCMD_GOSSIP:
			if(this.isNoGossip) {
				messages[0] = this.emitMessage("You aren't even on the channel!");
				return messages;
			}
			
			commType = 'gossip';
			commColor = 'Orange';
			break;
		case global.SCMD_AUCTION:
			if(this.isNoAuction) {
				messages[0] = this.emitMessage("You aren't even on the channel!");
				return messages;
			}
			
			commType = 'auction';
			commColor = 'Magenta';
			break;
		case global.SCMD_GRATZ:
			if(this.isNoGratz) {
				messages[0] = this.emitMessage("You aren't listening to congratulations messages!");
				return messages;
			}
			
			commType = 'congrat';
			commColor = 'Green';
			break;
	}

	if(message.length < 1) {
		messages[0] = this.emitMessage("Yes, " + commType + ", fine, " + commType + " we must, but WHAT???");
		return messages;
	}

	messages[0] = this.emitMessage("You " + commType + ", '" + message + "'", commColor);
	var outputMessage = this.name + " " + commType + "s, '" + message + "'";
	messages[1] = outputMessage;
	
	for(var i = 0; i < this.world.players.length; i++) {
		if(this.world.players[i] !== this) {
			if(!this.world.players[i].room.isSoundproof) {
				switch(subCommand) {
					case global.SCMD_HOLLER:
						if(!this.world.players[i].isNoHoller) {
							this.world.players[i].emitMessage(outputMessage, commColor);
						}
						break;
					case global.SCMD_SHOUT:
						if(!this.world.players[i].isNoShout) {
							this.world.players[i].emitMessage(outputMessage, commColor);
						}
						break;
					case global.SCMD_GOSSIP:
						if(!this.world.players[i].isNoGossip) {
							this.world.players[i].emitMessage(outputMessage, commColor);
						}
						break;
					case global.SCMD_AUCTION:
						if(!this.world.players[i].isNoAuction) {
							this.world.players[i].emitMessage(outputMessage, commColor);
						}
						break;
					case global.SCMD_GRATZ:
						if(!this.world.players[i].isNoGratz) {
							this.world.players[i].emitMessage(outputMessage, commColor);
						}
						break;
					case global.SCMD_QSAY:
						if(!this.world.players[i].isNoQuest) {
							this.world.players[i].emitMessage(outputMessage, commColor);
						}
						break;
				}
			}
		}
	}

	return messages;
};

characterSchema.methods.wakeCharacter = function(targetName) {
	var messages = [];
	
	if(this.position <= global.POS_SLEEPING) {
		messages[0] = this.emitMessage("Maybe you should wake yourself up first.");
	}
	else {
		var target = this.room.getCharacter(targetName);

		if(target === null) {
			messages[0] = this.emitMessage("No-one by that name here.");
		}
		else {
			if(target.position > global.POS_SLEEPING) {
				messages[0] = this.emitMessage(target.getPersonalPronoun() + " is already awake.");
			}
			else if(target.position < global.POS_SLEEPING) {
				messages[0] = this.emitMessage(target.getPersonalPronoun() + " is in pretty bad shape!");
			}
			else {
				messages[0] = this.emitMessage("You awaken " + target.name + ".");
				messages[1] = target.emitMessage("You are awakened by " + this.name + ".");
				messages[2] = this.emitObservedMessage(target, this.name + " awakens " + target.name + ".");
				target.position = global.POS_SITTING;				
			}
		}
	}

	return messages;
};


characterSchema.methods.takeObject = function(object) {
	var messages = [];

	this.room.removeItem(object);
	this.inventory.push(object);
	messages[0] = this.emitMessage("You take " + object.shortDescription + ".");
	messages[1] = this.emitRoomMessage(this.name + " takes " + object.shortDescription + ".");
	
	return messages;
};

characterSchema.methods.takeObjects = function(objectArray) {
	var messages = [];
	
	for(var i = 0; i < objectArray.length; i++) {
		messages.push(this.takeObject(objectArray[i]));
	}
	
	return messages;
};

characterSchema.methods.takeMoney = function(object) {
	var messages = [];
	
	// this.room.removeItem(object);
	// this.world.removeItem(object);
	// messages[0] = this.emitMessage("You take " + object.shortDescription + ".");
	// messages[1] = this.emitRoomMessage(this.name + " takes " + object.shortDescription + ".");
	// messages[2] = this.emitMessage("There were " + object.value + " dollars.");
	// this.money = this.money + object.value;
	
	return messages;
};

characterSchema.methods.takeItem = function(keyword) {
	var messages = [];
	
	if(keyword === null || keyword.length === 0) {
 		messages[0] = this.emitMessage("But what do you want to take?");
 		return messages;
	}
	
 	var result = this.room.contents.findByKeyword(keyword);

	if(result.mode === 'all.item' && result.items.length === 0) {
		messages[0] = this.emitMessage("You can't seem to find any '" + result.token + "' things here.");
		return messages;
	}

	if(result.items.length === 0) {
		messages[0] = this.emitMessage("You can't seem to find any '" + keyword + "' here.");
		return messages;
	}

	for(var i = 0; i < result.items.length; i++) {
		if(result.items[i].canBeTaken === true) {
			// if(this.inventory.length + 1 > this.getMaxCarried()) {
			// 	messages.push(this.emitMessage(result.items[i].shortDescription + ": You carry that many items."));
			// }
			// else if(this.getCarriedWeight() + result.items[i].weight > this.getMaxCarriedWeight()) {
			// 		messages.push(this.emitMessage(result.items[i].shortDescription + ": You carry that much weight."));
			// }
			// else {
				if(result.items[i].type === global.ITEM_MONEY) {
					messages.push(this.takeMoney(result.items[i]));
				}
				else {
					messages.push(this.takeObject(result.items[i]));
				}
			// }
		}
		else {
			messages.push(this.emitMessage(result.items[i].shortDescription + ": You can't take THAT!"));
		}
	}
	
	return messages;
};

characterSchema.methods.takeObjectFromContainer = function(object, container) {
	var messages = [];

	container.removeItem(object);
	this.inventory.push(object);
	messages[0] = this.emitMessage("You take " + object.shortDescription + " from " + container.shortDescription + ".");
	messages[1] = this.emitRoomMessage(this.name + " takes " + object.shortDescription + " from " + container.shortDescription + ".");
	
	return messages;
};

characterSchema.methods.takeMoneyFromContainer = function(object, container) {
	var messages = [];
	
	// container.removeItem(object);
	// this.world.removeItem(object);
	// messages[0] = this.emitMessage("You take " + object.shortDescription +  " from " + container.shortDescription + ".");
	// messages[1] = this.emitRoomMessage(this.name + " takes " + object.shortDescription + " from " + container.shortDescription + ".");
	// messages[2] = this.emitMessage("There were " + object.value + " gold coins.");
	// this.money = this.money + object.value;
	
	return messages;
};

characterSchema.methods.takeItemFromContainer = function(itemKeyword, containerKeyword) {
	var messages = [];

	var searchable = this.inventory.concat(this.room.contents);
	var containertarget = searchable.findByKeyword(containerKeyword);

	if(containertarget.items.length === 0) {
		messages.push(this.emitMessage("There doesn't seem to be any '" + containerKeyword + "' items around."));
		return messages;
	}

	for(var i = 0; i < containertarget.items.length; i++) {	
		if(containertarget.items[i].type !== global.ITEM_CONTAINER && containertarget.items[i].type !== global.ITEM_CORPSE)	{
			messages.push(this.emitMessage(containertarget.items[i].shortDescription + " -- That's not a container!"));
			break;
		}
		
		if(containertarget.items[i].contents.length === 0) {
			messages.push(this.emitMessage(containertarget.items[i].shortDescription + " seems to be empty."));
			break;
		}
		
		var itemtarget = containertarget.items[i].contents.findByKeyword(itemKeyword);
		
		if(itemtarget.items.length === 0) {
			messages.push(this.emitMessage("There doesn't seem to be any '" + itemKeyword + "' items in " + containertarget.items[i].shortDescription + "."));
		}
		else {
			// TODO: Closed
			
			for(var j = 0; j < itemtarget.items.length; j++) {
				// if(this.inventory.length + 1 > this.getMaxCarried()) {
				// 	messages.push(this.emitMessage(itemtarget.items[i].shortDescription + ": You carry that many items."));
				// }
				// else {
					if(itemtarget.items[j].type === global.ITEM_MONEY) {
						messages.push(this.takeMoneyFromContainer(itemtarget.items[j], containertarget.items[i]));
					}
					else {
						messages.push(this.takeObjectFromContainer(itemtarget.items[j], containertarget.items[i]));
					}
				// }
			}
		}
	}
	
	return messages;
};

characterSchema.methods.dropObject = function(object) {
	var messages = [];

	this.inventory.splice(this.inventory.indexOf(object), 1);
	this.room.addItem(object);
	messages[0] = this.emitMessage("You drop " + object.shortDescription + ".");
	messages[1] = this.emitRoomMessage(this.name + " drops " + object.shortDescription + ".");
	
	return messages;
};

characterSchema.methods.junkObject = function(object) {
	var messages = [];
	
	this.inventory.splice(this.inventory.indexOf(object), 1);
	this.world.removeItem(object);
	messages[0] = this.emitMessage("You junk " + object.shortDescription + ".");
	messages[1] = this.emitRoomMessage(this.name + " junk " + object.shortDescription + ".");
	return messages;
};

characterSchema.methods.donateObject = function(object) {
	var messages = [];
	
	this.inventory.splice(this.inventory.indexOf(object), 1);
	
	messages[0] = [];
	messages[0].push( { text: "You donate " + object.shortDescription + "." } );
	messages[0].push( { text: "It vanishes in a puff of smoke!" } );
	this.emitMessages(messages[0]);
	
	messages[1] = [];
	messages[1].push( { text: this.name + " donates " + object.shortDescription + "." } );
	messages[1].push( { text: "It vanishes in a puff of smoke!" } );
	this.emitRoomMessages(messages[1]);
	
	var donationRoom = this.world.getRoom(global.DONATION_ROOM);
	
	if(donationRoom !== null) {
		donationRoom.addItem(object);
		
		messages[2] = object.shortDescription + " appears in a puff of smoke!";
		donationRoom.emitMessage(messages[2]);
	}
	
	return messages;
};

characterSchema.methods.dropItem = function(keyword) {
	var messages  = [];
	var result = this.inventory.findByKeyword(keyword);
	
	if(result.items.length === 0) {
		messages[0] = this.emitMessage("Drop what?!?");
		return messages;
	}
	
	// TODO: Curse / NoDrop

	for(var i = 0; i < result.items.length; i++) {
		messages.push(this.dropObject(result.items[i]));
	}
	
	return messages;
};

characterSchema.methods.junkItem = function(keyword) {
	var messages  = [];
	var result = this.inventory.findByKeyword(keyword);

	if(result.items.length === 0) {
		messages[0] = this.emitMessage("Junk what?!?");
		return messages;
	}
	
	for(var i = 0; i < result.items.length; i++) {
		messages.push(this.junkObject(result.items[i]));
	}
	
	return messages;
};

characterSchema.methods.donateItem = function(keyword) {
	var messages = [];
	var result = this.inventory.findByKeyword(keyword);

	if(result.items.length === 0) {
		messages[0] = this.emitMessage("Donate what?!?");
		return messages;
	}

	for(var i = 0; i < result.items.length; i++) {
		if(result.items[i].canBeDonated === true) {
			messages.push(this.donateObject(result.items[i]));
		}
		else {
			messages.push(this.emitMessage(result.items[i].shortDescription + " can't be donated!"));
		}
	}
	
	return messages;
};

characterSchema.methods.social = function(action, parameter) {
	var thisSocial = new Social(action, parameter, this);
	thisSocial.emitMessages();
};

characterSchema.methods.eatObject = function(object, mode) {
	var messages = [];
	var extractObject = false;
	var amount = 0;

	if(mode === global.SCMD_EAT) {
		messages[0] = this.emitMessage("You eat " + object.shortDescription + ".");
		messages[1] = this.emitRoomMessage(this.name + " eats " + object.shortDescription + ".");
		amount = object.hoursOfHunger;
		extractObject = true;
	}
	else if(mode === global.SCMD_TASTE) {
		messages[0] = this.emitMessage("You nibble a little bit of " + object.shortDescription + ".");
		messages[1] = this.emitRoomMessage(this.name + " nibbles a little bit of " + object.shortDescription + ".");
		amount = 1;
		
		if(--object.hoursOfHunger <= 0) {
			extractObject = true;
		}
	}
	
	// if(!this.isNpc()) {
	// 	this.hunger = this.hunger + amount;
	// 	this.hunger = Math.min(this.hunger, 24);
	// }
	
	this.hunger = this.hunger + amount;
	this.updateFullness();

	if(extractObject) {
		if(mode === global.SCMD_TASTE) {
			messages[2] = this.emitMessage("There's nothing left of it now.");
		}
		
		this.inventory.splice(this.inventory.indexOf(object), 1);
		this.world.removeItem(object);
	}

	return messages;
};

characterSchema.methods.eatItem = function(keyword, mode) {
	var messages = [];
	var result = this.inventory.findByKeyword(keyword);

	if(result.items.length === 0) {
		messages.push(this.emitMessage("Eat what?!?"));
		return messages;
	}

	for(var i = 0; i < result.items.length; i++) {
		if(result.items[i].type !== global.ITEM_FOOD) {
			messages.push(this.emitMessage(result.items[i].shortDescription + " -- You can't eat THAT!"));
		}
		else {
			messages.push(this.eatObject(result.items[i], mode));
		}
	}
	
	return messages;
};

characterSchema.methods.getFullnessIndex = function() {
	var fullness = this.hunger + this.thirst;
	var fullnessIndex = fullness / this.maximumFullness;
	
	return fullnessIndex;
};

characterSchema.methods.updateFullness = function() {
	if(this.fullnessLevel === 0 && this.hunger > 0) {
		// no longer hungry
		return;
	}
	
	var fullnessIndex = this.getFullnessIndex();
	
	
	if(fullnessIndex > 0.9 && this.fullnessLevel < global.FULLNESS_SATISFIED) {
		this.fullnessLevel = global.FULLNESS_SATISFIED;
		
		this.emitMessage("You feel satisfied.");
		
		return;
	}
	
	if(fullnessIndex > 1.1 && this.fullnessLevel < global.FULLNESS_FULL) {
		this.fullnessLevel = global.FULLNESS_FULL;

		this.emitMessage("You feel full.");
		return;
	}
	
	if(fullnessIndex > 1.3 && this.fullnessLevel < global.FULLNESS_VERYFULL) {
		this.fullnessLevel = global.FULLNESS_VERYFULL;
		
		this.emitMessage("You feel VERY full.");
		return;
	}

	if(fullnessIndex > 1.6 && this.fullnessLevel < global.FULLNESS_EXTREMELYFULL) {
		this.fullnessLevel = global.FULLNESS_EXTREMELYFULL;
		
		// extremely full
		return;
	}
	
	
	if(fullnessIndex > 2.0 && this.fullnessLevel < global.FULLNESS_STUFFED) {
		this.fullnessLevel = global.FULLNESS_STUFFED;
		
		this.maximumFullness++;
		return;
	}
	
	if(fullnessIndex > 2.5 && this.fullnessLevel < global.FULLNESS_INSANELYSTUFFED) {
		this.fullnessLevel = global.FULLNESS_INSANELYSTUFFED;
		
		return;
	}
	
	if(fullnessIndex > 3.0 && this.fullnessLevel < global.FULLNESS_MAXIMUMFULL) {
		this.fullnessLevel = global.FULLNESS_MAXIMUMFULL;
		
		return;
	}
	
	if(fullnessIndex > 3.3 && this.fullnessLevel < global.FULLNESS_OVERMAXIMUM) {
		this.fullnessLevel = global.FULLNESS_OVERMAXIMUM;
		
		return;
	}
	
	if(fullnessIndex > 3.6 && this.fullnessLevel < global.FULLNESS_SWEATING) {
		this.fullnessLevel = global.FULLNESS_SWEATING;
		
		return;
	}
	
	if(fullnessIndex > 4.0 && this.fullnessLevel < global.FULLNESS_SHORTBREATH) {
		this.fullnessLevel = global.FULLNESS_SHORTBREATH;
		
		return;
	}

	
	if(fullnessIndex > 4.5 && this.fullnessLevel < global.FULLNESS_PANIC) {
		this.fullnessLevel = global.FULLNESS_PANIC;
		
		return;
	}	

	if(fullnessIndex > 5.0 && this.fullnessLevel < global.FULLNESS_HALLUCINATING) {
		this.fullnessLevel = global.FULLNESS_HALLUCINATING;
		
		return;
	}	
	
	if(fullnessIndex > 5.5 && this.fullnessLevel < global.FULLNESS_READYTOPOP) {
		this.fullnessLevel = global.FULLNESS_READYTOPOP;
		
		return;
	}

	if(fullnessIndex > 6.0 && this.fullnessLevel < global.FULLNESS_PASSEDOUT) {
		this.fullnessLevel = global.FULLNESS_PASSEDOUT;
		
		return;
	}	
};

characterSchema.methods.drinkFromObject = function(object, mode) {
	var messages = [];
	var amount = 0;

	var drink = global.DRINKS[object.containsLiquid];
	var thirstAffect = drink.thirst;
	var drunkAffect = drink.drunkness;

	if(mode === global.SCMD_DRINK) {
		messages.push(this.emitMessage("You drink the " + drink.name + "."));
		messages.push(this.emitRoomMessage(this.name + " drinks " + drink.name + " from " + object.shortDescription + "."));
		amount = 8;
	}
	else if(mode === global.SCMD_SIP) {
		messages.push(this.emitMessage("It tastes like " + drink.name + "."));
		messages.push(this.emitRoomMessage(this.name + " sips from " + object.shortDescription + "."));
		amount = 1;
		
		if(thirstAffect > 0) {
			thirstAffect = 1;
		}

		if(drunkAffect > 0) {
			drunkAffect = 1;
		}
	}

	object.quantity = Math.max(0, (object.quantity - amount));

	if(!this.isNpc()) {
		if(this.thirst < 20 && this.thirst + thirstAffect > 20) {
			messages.push(this.emitMessage("You don't feel thirsty anymore."));
		}
		
		if(this.drunk + drunkAffect > 20) {
			messages.push(this.emitMessage("You are REALLY drunk!"));
		}
		else if(this.drunk < 12 && this.drunk + drunkAffect > 12) {
			messages.push(this.emitMessage("You are drunk."));
		}
		
		this.thirst = this.thirst + thirstAffect;
		this.thirst = Math.min(this.thirst, 24);
		
		this.drunk = this.drunk + drunkAffect;
		this.drunk = Math.min(this.drunk, 24);		
	}
	
	return messages;	
};

characterSchema.methods.drinkItem = function(keyword, mode) {
	var messages = [];

	var searchable = this.inventory.concat(this.room.contents);
	var target = searchable.findByKeyword(keyword);

	if(target.items.length === 0) {
		messages.push(this.emitMessage("Drink what?!?"));
		return messages;
	}
	
 	for(var i = 0; i < target.items.length; i++) {
		if(target.items[i].type !== global.ITEM_DRINKCONTAINER && target.items[i].type !== global.ITEM_FOUNTAIN) {
			messages.push(this.emitMessage(target.items[i].shortDescription + " -- You can't drink from THAT!"));
			break;
		}
		
		else {
			if(target.items[i].type === global.ITEM_DRINKCONTAINER && this.inventory.indexOf(target.items[i]) < 0) {
				messages.push(this.emitMessage("You have to be holding that to drink from it."));
				break;
			}
			
			if(target.items[i].quantity < 1) {
				messages.push(this.emitMessage("It's empty!"));
				break;
			}
			
			messages.push(this.drinkFromObject(target.items[i], mode));
		}
	}
	
	return messages;
};

characterSchema.methods.giveObject = function(object, target) {
	var messages = [];
	
	messages[0] = this.emitMessage("You give " + object.shortDescription + " to " + target.name + ".");
	messages[1] = target.emitMessage(this.name + " gives you " + object.shortDescription + ".");
	messages[2] = this.emitObservedMessage(target, this.name + " gives " + object.shortDescription + " to " + target.name + ".");
	
	this.inventory.splice(this.inventory.indexOf(object), 1);
	target.inventory.push(object);
	
	return messages;
};

characterSchema.methods.giveItem = function(keyword, targetName) {
	var messages = [];	
	
	var result = this.inventory.findByKeyword(keyword);

	if(result.items.length === 0) {	
		messages[0] = this.emitMessage("Give what?");
		return messages;
	}
	
	var target = this.room.getCharacter(targetName);
	
	if(target === null) {
		messages[0] = this.emitMessage("No-one by that name here.");
		return messages;
	}
	
	if(target === this) {
		messages[0] = this.emitMessage("Give something to yourself?!?");
		return messages;
	}

	for(var i = 0; i < result.items.length; i++) {
		messages.push(this.giveObject(result.items[i], target));
	}
	
	return messages;
};

/* Banking and money-related methods */

characterSchema.methods.isAtBank = function() {
	if(this.room.contents.containsItemByType(global.ITEM_BANK) === true || 
	   this.inventory.containsItemByType(global.ITEM_BANK) === true) {
   		return true;
	}
	   
	return false;
};

characterSchema.methods.checkBankBalance = function() {
	if(this.bank === 0) {
		this.emitMessage("You have no money deposited.");
	}
	else if(this.bank === 1) {
		this.emitMessage("You have exactly 1 pathetic dollar deposited, loser.");
	}
	else {
		this.emitMessage("You have " + this.bank + " dollars deposited.");
	}
};

characterSchema.methods.depositMoney = function(amount) {
	if(this.bank < amount) {
		this.emitMessage("You don't have that many dollars deposited!");
		return;
	}
	
	this.money = this.money + amount;
	this.bank = this.bank - amount;
	
	this.emitMessage("You withdraw " + amount + " dollars.");
	this.emitRoomMessage(this.name + " makes a bank transaction.");
};

characterSchema.methods.withdrawMoney = function(amount) {
	if(this.money < amount) {
		this.emitMessage("You don't have that many dollars!");
		return;
	}
	
	this.money = this.money - amount;
	this.bank = this.bank + amount;
	
	this.emitMessage("You deposit " + amount + " dollars.");
	this.emitRoomMessage(this.name + " makes a bank transaction.");
};


var characterModel = mongoose.model('character', characterSchema);

module.exports = {
	schema: characterSchema,
	character: characterModel,
};
// Object constructor
function Social(social, parameter, actor) {
    this.social = social;
    this.parameter = parameter;
    this.actor = actor;
}

Social.prototype.format = function(message) {
    var returnMessage = message.replace(/ACTOR_NAME/g, this.actor.name)
        .replace(/ACTOR_PRONOUN_POSSESSIVE/g, this.actor.getPossessivePronoun())
        .replace(/ACTOR_PRONOUN_OBJECT/g, this.actor.getObjectPronoun())
        .replace(/ACTOR_PRONOUN_SUBJECT/g, this.actor.getPersonalPronoun());
        
        if(this.target !== undefined) {
            returnMessage = returnMessage.replace(/TARGET_NAME/g, this.target.name)
                .replace(/TARGET_PRONOUN_POSSESSIVE/g, this.target.getPossessivePronoun())
                .replace(/TARGET_PRONOUN_OBJECT/g, this.target.getObjectPronoun())
                .replace(/TARGET_PRONOUN_SUBJECT/g, this.target.getPersonalPronoun());
        }

    return returnMessage;
};

Social.prototype.emitMessages = function() {
    if (this.parameter === '') {
        return this.emitSocialWithoutTarget();
    }
    else if(this.social.targetFoundMessages === undefined) {
        return this.emitSocialWithoutTarget();
    }
    else {
        var target = this.actor.room.getCharacter(this.parameter);
        
        if(target === null) {
            return this.emitSocialToActorTargetMissing();
        }
        else if(target === this.actor) {
            return this.emitSocialWhenSelfIsTarget();
        }
        else {
            this.target = target;
            
            if(this.target.position < this.social.minimumTargetPosition) {
                return this.emitWrongPosition();
            }
            else {
                return this.emitSocialToActorTargetRoom();
            }
        }
    }
};

Social.prototype.emitSocialWithoutTarget = function() {
    var emittedMessages = [];
    
    var messageToActor = this.format(this.social.noTargetMessages.toActor);
    this.emitSocialMessageToActor(messageToActor);
    emittedMessages.push(messageToActor);

    if (this.social.noTargetMessages.toRoom !== "#") {
        var messageToRoom = this.format(this.social.noTargetMessages.toRoom);
        this.emitSocialMessageToRoom(messageToRoom);
        emittedMessages.push(messageToRoom);
    }
    
    return emittedMessages;
};

Social.prototype.emitSocialWhenSelfIsTarget = function() {
    var emittedMessages = [];
    
    var messageToActor = this.format(this.social.targetSelfMessages.toActor);
    this.emitSocialMessageToActor(messageToActor);
    emittedMessages.push(messageToActor);

    if (this.social.targetSelfMessages.toRoom !== "#") {
        var messageToRoom = this.format(this.social.targetSelfMessages.toRoom);
        this.emitSocialMessageToRoom(messageToRoom);
        emittedMessages.push(messageToRoom);
    }
    
    return emittedMessages;
};

Social.prototype.emitSocialToActorTargetRoom = function() {
    var emittedMessages = [];
    
    var messageToActor = this.format(this.social.targetFoundMessages.toActor);
    this.emitSocialMessageToActor(messageToActor);
    emittedMessages.push(messageToActor);
    
    var messageToVictim = this.format(this.social.targetFoundMessages.toTarget);
    this.emitSocialMessageToVictim(messageToVictim);
    emittedMessages.push(messageToVictim);
    
    var messageToRoom = this.format(this.social.targetFoundMessages.toRoom);
    this.emitSocialMessageToRoomExceptVictim(messageToRoom);
    emittedMessages.push(messageToRoom);
    
    return emittedMessages;
};

Social.prototype.emitSocialToActorTargetMissing = function() {
    var emittedMessages = [];
    var messageToActor = this.format(this.social.targetNotFoundMessages.toActor);
    this.emitSocialMessageToActor(messageToActor);
    emittedMessages.push(messageToActor);
    return emittedMessages;
};

Social.prototype.emitWrongPosition = function() {
    var emittedMessages = [];
    var messageToActor = this.target.name + " is not in a proper position for that.";
    this.emitSocialMessageToActor(messageToActor);
    emittedMessages.push(messageToActor);
    return emittedMessages;
};

Social.prototype.emitSocialMessageToActor = function(message) {
    this.actor.emitMessage(message);
};

Social.prototype.emitSocialMessageToVictim = function(message) {
    if(this.victim !== undefined) {
        this.victim.emitMessage(message);
    }
};

Social.prototype.emitSocialMessageToRoom = function(message) {
    var players = this.actor.room.getPlayers();
    
    for (var i = 0; i < players.length; i++) {
        var messageTarget = players[i];

        if (messageTarget !== this.actor) {
            messageTarget.emitMessage(message);
        }
    }
};

Social.prototype.emitSocialMessageToRoomExceptVictim = function(message) {
    var players = this.actor.room.getPlayers();
    
    for (var i = 0; i < players.length; i++) {
        var messageTarget = players[i];

        if (messageTarget !== this.actor && messageTarget !== this.victim) {
            messageTarget.emitMessage(message);
        }
    }
};

// Exports
module.exports = Social;
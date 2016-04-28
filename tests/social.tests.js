var constants = require('../constants');
var social = require("../social");
var Character = require("../character").character;
var Room = require("../room").room;
// var Interpreter = require("../interpreter");


exports.social_formatReplacesActorName = function(test) {
    var actor = new Character();
    actor.name = "Apok";
    
    var unformattedSocialMessage = "ACTOR_NAME bows deeply.";
    var thisSocial = new social(1, 2, 3);
    thisSocial.actor = actor;
    test.equal(thisSocial.format(unformattedSocialMessage), "Apok bows deeply.");
	test.done();
};

exports.social_formatReplacesActorPossessivePronoun = function(test) {
    var actor = new Character();
    actor.name = "Tails";
    actor.gender = global.GENDER_MALE;
    
    var unformattedSocialMessage = "Tails kisses ACTOR_PRONOUN_POSSESSIVE own toes...";
    var thisSocial = new social(1, 2, 3);
    thisSocial.actor = actor;
    test.equal(thisSocial.format(unformattedSocialMessage), "Tails kisses his own toes...");
	test.done();
};

exports.social_formatReplacesActorObject = function(test) {
    var actor = new Character();
    actor.name = "Aramina";
    actor.gender = global.GENDER_FEMALE;
    
    var unformattedSocialMessage = "Aramina drools on ACTOR_PRONOUN_OBJECTself.";
    var thisSocial = new social(1, 2, 3);
    thisSocial.actor = actor;
    test.equal(thisSocial.format(unformattedSocialMessage), "Aramina drools on herself.");
	test.done();
};

exports.social_formatReplacesActorSubject = function(test) {
    var actor = new Character();
    actor.name = "Uatu";
    actor.gender = global.GENDER_NEUTRAL;
    
    var unformattedSocialMessage = "ACTOR_PRONOUN_SUBJECT always was a strange one.";
    var thisSocial = new social(1, 2, 3);
    thisSocial.actor = actor;
    test.equal(thisSocial.format(unformattedSocialMessage), "it always was a strange one.");
	test.done();
};

exports.social_formatReplacesTargetName = function(test) {
    var actor = new Character();
    actor.name = "Uatu";
    actor.gender = global.GENDER_MALE;

    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;

    var unformattedSocialMessage = "Uatu glares at TARGET_NAME.";
    var thisSocial = new social(1, 2, 3);
    thisSocial.actor = actor;
    thisSocial.target = target;
    test.equal(thisSocial.format(unformattedSocialMessage), "Uatu glares at Apok.");
	test.done();
};

exports.social_formatReplacesTargetPossessivePronoun = function(test) {
    var actor = new Character();
    actor.name = "Uatu";
    actor.gender = global.GENDER_MALE;

    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;

    var unformattedSocialMessage = "Uatu cries on TARGET_PRONOUN_POSSESSIVE shoulder.";
    var thisSocial = new social(1, 2, 3);
    thisSocial.actor = actor;
    thisSocial.target = target;
    test.equal(thisSocial.format(unformattedSocialMessage), "Uatu cries on his shoulder.");
	test.done();
};

exports.social_formatReplacesTargetObjectPronoun = function(test) {
    var actor = new Character();
    actor.name = "Uatu";
    actor.gender = global.GENDER_MALE;

    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;

    var unformattedSocialMessage = "Uatu stares at TARGET_PRONOUN_OBJECT, fuming.";
    var thisSocial = new social(1, 2, 3);
    thisSocial.actor = actor;
    thisSocial.target = target;
    test.equal(thisSocial.format(unformattedSocialMessage), "Uatu stares at him, fuming.");
	test.done();
};

exports.social_formatReplacesTargetSubjectPronoun = function(test) {
    var actor = new Character();
    actor.name = "Uatu";
    actor.gender = global.GENDER_MALE;

    var target = new Character();
    target.name = "Sweetix";
    target.gender = global.GENDER_FEMALE;

    var unformattedSocialMessage = "Uatu points at Sweetix -- TARGET_PRONOUN_SUBJECT DOES look funny.";
    var thisSocial = new social(1, 2, 3);
    thisSocial.actor = actor;
    thisSocial.target = target;
    test.equal(thisSocial.format(unformattedSocialMessage), "Uatu points at Sweetix -- she DOES look funny.");
	test.done();
};

//////////////////////////////////////////////////////////

exports.social_returnsMessageWhenTargetInWrongPosition = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ACCUSE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STUNNED;    

    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Apok is not in a proper position for that.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_accuseWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ACCUSE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Accuse who??");
    test.done();
};

exports.social_accuseWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ACCUSE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;    

    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You look accusingly at him.");
    test.equal(emittedMessages[1], "Strat looks accusingly at you.");
    test.equal(emittedMessages[2], "Strat looks accusingly at Apok.");
    test.done();
};

exports.social_accuseWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ACCUSE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Accuse somebody who's not even there??");
    test.done();
};

exports.social_accuseWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ACCUSE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You accuse yourself.");
    test.equal(emittedMessages[1], "Strat seems to have a bad conscience.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_applaudWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_APPLAUD];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Clap, clap, clap.");
    test.equal(emittedMessages[1], "Strat gives a round of applause.");
    test.done();
};

exports.social_applaudWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_APPLAUD];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Clap, clap, clap.");
    test.equal(emittedMessages[1], "Strat gives a round of applause.");
    test.done();
};

exports.social_applaudWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_APPLAUD];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Clap, clap, clap.");
    test.equal(emittedMessages[1], "Strat gives a round of applause.");
    test.done();
};

exports.social_applaudWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_APPLAUD];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Clap, clap, clap.");
    test.equal(emittedMessages[1], "Strat gives a round of applause.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_begWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BEG];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You beg the gods for mercy.  (No way you're gonna get it! :-))");
    test.equal(emittedMessages[1], "The gods fall down laughing at Strat's request for mercy.");
    test.done();
};

exports.social_begWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BEG];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You desperately try to squeeze a few coins from him.");
    test.equal(emittedMessages[1], "Strat begs you for money.  You graciously let him peek at your fortune.");
    test.equal(emittedMessages[2], "Strat begs Apok for a dime or two -- or twenty!");
    test.done();
};

exports.social_begWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BEG];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Your money-lender seems to be out for the moment.");
    test.done();
};

exports.social_begWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BEG];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "How? - begging yourself for money doesn't help.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_bleedWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BLEED];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You bleed profusely, making an awful mess...");
    test.equal(emittedMessages[1], "Strat bleeds profusely, making an awful mess...");
    test.done();
};

exports.social_bleedWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BLEED];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You bleed profusely, making an awful mess...");
    test.equal(emittedMessages[1], "Strat bleeds profusely, making an awful mess...");
    test.done();
};

exports.social_bleedWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BLEED];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You bleed profusely, making an awful mess...");
    test.equal(emittedMessages[1], "Strat bleeds profusely, making an awful mess...");
    test.done();
};

exports.social_bleedWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BLEED];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You bleed profusely, making an awful mess...");
    test.equal(emittedMessages[1], "Strat bleeds profusely, making an awful mess...");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_blushWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BLUSH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Your cheeks are burning.");
    test.equal(emittedMessages[1], "Strat blushes.");
    test.done();
};

exports.social_blushWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BLUSH];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Your cheeks are burning.");
    test.equal(emittedMessages[1], "Strat blushes.");
    test.done();
};

exports.social_blushWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BLUSH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Your cheeks are burning.");
    test.equal(emittedMessages[1], "Strat blushes.");
    test.done();
};

exports.social_blushWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BLUSH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Your cheeks are burning.");
    test.equal(emittedMessages[1], "Strat blushes.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_bounceWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BOUNCE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "BOIINNNNNNGG!");
    test.equal(emittedMessages[1], "Strat bounces around.");
    test.done();
};

exports.social_bounceWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BOUNCE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "BOIINNNNNNGG!");
    test.equal(emittedMessages[1], "Strat bounces around.");
    test.done();
};

exports.social_bounceWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BOUNCE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "BOIINNNNNNGG!");
    test.equal(emittedMessages[1], "Strat bounces around.");
    test.done();
};

exports.social_bounceWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BOUNCE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "BOIINNNNNNGG!");
    test.equal(emittedMessages[1], "Strat bounces around.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_bowWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BOW];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You bow deeply.");
    test.equal(emittedMessages[1], "Strat bows deeply.");
    test.done();
};

exports.social_bowWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BOW];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You bow before him.");
    test.equal(emittedMessages[1], "Strat bows before you.");
    test.equal(emittedMessages[2], "Strat bows before Apok.");
    test.done();
};

exports.social_bowWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BOW];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Who's that?");
    test.done();
};

exports.social_bowWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BOW];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You kiss your toes.");
    test.equal(emittedMessages[1], "Strat folds up like a jacknife and kisses his own toes.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_brbWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BRB];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Come back soon!");
    test.equal(emittedMessages[1], "Strat will be right back!");
    test.done();
};

exports.social_brbWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BRB];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Come back soon!");
    test.equal(emittedMessages[1], "Strat will be right back!");
    test.done();
};

exports.social_brbWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BRB];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Come back soon!");
    test.equal(emittedMessages[1], "Strat will be right back!");
    test.done();
};

exports.social_brbWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BRB];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Come back soon!");
    test.equal(emittedMessages[1], "Strat will be right back!");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_burpWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BURP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You burp loudly.");
    test.equal(emittedMessages[1], "Strat burps loudly.");
    test.done();
};

exports.social_burpWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BURP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You burp loudly.");
    test.equal(emittedMessages[1], "Strat burps loudly.");
    test.done();
};

exports.social_burpWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BURP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You burp loudly.");
    test.equal(emittedMessages[1], "Strat burps loudly.");
    test.done();
};

exports.social_burpWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_BURP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You burp loudly.");
    test.equal(emittedMessages[1], "Strat burps loudly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_cackleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CACKLE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You cackle gleefully.");
    test.equal(emittedMessages[1], "Strat throws back his head and cackles with insane glee!");
    test.done();
};

exports.social_cackleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CACKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You cackle gleefully.");
    test.equal(emittedMessages[1], "Strat throws back his head and cackles with insane glee!");
    test.done();
};

exports.social_cackleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CACKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You cackle gleefully.");
    test.equal(emittedMessages[1], "Strat throws back his head and cackles with insane glee!");
    test.done();
};

exports.social_cackleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CACKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You cackle gleefully.");
    test.equal(emittedMessages[1], "Strat throws back his head and cackles with insane glee!");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_chuckleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CHUCKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You chuckle politely.");
    test.equal(emittedMessages[1], "Strat chuckles politely.");
    test.done();
};

exports.social_chuckleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CHUCKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You chuckle politely.");
    test.equal(emittedMessages[1], "Strat chuckles politely.");
    test.done();
};

exports.social_chuckleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CHUCKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You chuckle politely.");
    test.equal(emittedMessages[1], "Strat chuckles politely.");
    test.done();
};

exports.social_chuckleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CHUCKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You chuckle politely.");
    test.equal(emittedMessages[1], "Strat chuckles politely.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_clapWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CLAP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You clap your small hands together.");
    test.equal(emittedMessages[1], "Strat shows his approval by clapping his small hands together.");
    test.done();
};

exports.social_clapWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CLAP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You clap your small hands together.");
    test.equal(emittedMessages[1], "Strat shows his approval by clapping his small hands together.");
    test.done();
};

exports.social_clapWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CLAP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You clap your small hands together.");
    test.equal(emittedMessages[1], "Strat shows his approval by clapping his small hands together.");
    test.done();
};

exports.social_clapWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CLAP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You clap your small hands together.");
    test.equal(emittedMessages[1], "Strat shows his approval by clapping his small hands together.");
    test.done();
};


//////////////////////////////////////////////////////////

exports.social_combWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_COMB];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You comb your hair -- perfect.");
    test.equal(emittedMessages[1], "Strat combs his hair, what a dashing specimen!");
    test.done();
};

exports.social_combWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_COMB];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You patiently untangle Apok's hair -- what a mess!");
    test.equal(emittedMessages[1], "Strat tries patiently to untangle Apok's hair.");
    test.equal(emittedMessages[2], "Strat pulls your hair in an attempt to comb it.");
    test.done();
};

exports.social_combWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_COMB];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "That person is not here.");
    test.done();
};

exports.social_combWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_COMB];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You pull your hair, but it will not be combed.");
    test.equal(emittedMessages[1], "Strat tries to comb his tangled hair.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_comfortWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_COMFORT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Do you feel uncomfortable?");
    test.done();
};

exports.social_comfortWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_COMFORT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You comfort him.");
    test.equal(emittedMessages[1], "Strat comforts you.");
    test.equal(emittedMessages[2], "Strat comforts Apok.");
    test.done();
};

exports.social_comfortWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_COMFORT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Comfort who?");
    test.done();
};

exports.social_comfortWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_COMFORT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "You make a vain attempt to comfort yourself.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_coughWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_COUGH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Yuck, try to cover your mouth next time!");
    test.equal(emittedMessages[1], "Strat coughs loudly.");
    test.done();
};

exports.social_coughWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_COUGH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Yuck, try to cover your mouth next time!");
    test.equal(emittedMessages[1], "Strat coughs loudly.");
    test.done();
};

exports.social_coughWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_COUGH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Yuck, try to cover your mouth next time!");
    test.equal(emittedMessages[1], "Strat coughs loudly.");
    test.done();
};

exports.social_coughWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_COUGH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Yuck, try to cover your mouth next time!");
    test.equal(emittedMessages[1], "Strat coughs loudly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_cringeWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CRINGE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You cringe in terror.");
    test.equal(emittedMessages[1], "Strat cringes in terror!");
    test.done();
};

exports.social_cringeWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CRINGE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You cringe away from him.");
    test.equal(emittedMessages[1], "Strat cringes away from you.");
    test.equal(emittedMessages[2], "Strat cringes away from Apok in mortal terror.");
    test.done();
};

exports.social_cringeWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CRINGE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "I don't see anyone by that name here... what are you afraid of?");
    test.done();
};

exports.social_cringeWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CRINGE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "I beg your pardon?");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_cryWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CRY];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Waaaaah..");
    test.equal(emittedMessages[1], "Strat bursts into tears.");
    test.done();
};

exports.social_cryWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CRY];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You cry on his shoulder.");
    test.equal(emittedMessages[1], "Strat cries on your shoulder.");
    test.equal(emittedMessages[2], "Strat cries on Apok's shoulder.");
    test.done();
};

exports.social_cryWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CRY];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Who's that?");
    test.done();
};

exports.social_cryWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CRY];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You cry to yourself.");
    test.equal(emittedMessages[1], "Strat sobs quietly to himself.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_cuddleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CUDDLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Who do you feel like cuddling today?");
    test.done();
};

exports.social_cuddleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CUDDLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You cuddle him.");
    test.equal(emittedMessages[1], "Strat cuddles you.");
    test.equal(emittedMessages[2], "Strat cuddles Apok.");
    test.done();
};

exports.social_cuddleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CUDDLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "They aren't here.");
    test.done();
};

exports.social_cuddleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CUDDLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "You must feel very cuddly indeed.  :)");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_curseWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CURSE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You swear loudly for a long time.");
    test.equal(emittedMessages[1], "Strat swears: #@*%%*&^$$%@*&!!!!!!");
    test.done();
};

exports.social_curseWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CURSE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You swear loudly for a long time.");
    test.equal(emittedMessages[1], "Strat swears: #@*%%*&^$$%@*&!!!!!!");
    test.done();
};

exports.social_curseWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CURSE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You swear loudly for a long time.");
    test.equal(emittedMessages[1], "Strat swears: #@*%%*&^$$%@*&!!!!!!");
    test.done();
};

exports.social_curseWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CURSE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You swear loudly for a long time.");
    test.equal(emittedMessages[1], "Strat swears: #@*%%*&^$$%@*&!!!!!!");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_curtseyWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CURTSEY];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You curtsey to your audience.");
    test.equal(emittedMessages[1], "Strat curtseys gracefully.");
    test.done();
};

exports.social_curtseyWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CURTSEY];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You curtsey to your audience.");
    test.equal(emittedMessages[1], "Strat curtseys gracefully.");
    test.done();
};

exports.social_curtseyWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CURTSEY];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You curtsey to your audience.");
    test.equal(emittedMessages[1], "Strat curtseys gracefully.");
    test.done();
};

exports.social_curtseyWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_CURTSEY];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You curtsey to your audience.");
    test.equal(emittedMessages[1], "Strat curtseys gracefully.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_danceWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_DANCE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Feels silly, doesn't it?");
    test.equal(emittedMessages[1], "Strat tries to dance breakdance but nearly breaks his neck!");
    test.done();
};

exports.social_danceWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_DANCE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You lead him to the dancefloor.");
    test.equal(emittedMessages[1], "Strat sends you across the dancefloor.");
    test.equal(emittedMessages[2], "Strat sends Apok across the dancefloor.");
    test.done();
};

exports.social_danceWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_DANCE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Eh, WHO?");
    test.done();
};

exports.social_danceWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_DANCE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You skip and dance around by yourself.");
    test.equal(emittedMessages[1], "Strat skips a light Fandango.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_daydreamWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_DAYDREAM];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You dream of better times.");
    test.equal(emittedMessages[1], "Strat looks absent-minded, his eyes staring into space.");
    test.done();
};

exports.social_daydreamWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_DAYDREAM];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You dream of better times.");
    test.equal(emittedMessages[1], "Strat looks absent-minded, his eyes staring into space.");
    test.done();
};

exports.social_daydreamWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_DAYDREAM];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You dream of better times.");
    test.equal(emittedMessages[1], "Strat looks absent-minded, his eyes staring into space.");
    test.done();
};

exports.social_daydreamWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_DAYDREAM];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You dream of better times.");
    test.equal(emittedMessages[1], "Strat looks absent-minded, his eyes staring into space.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_droolWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_DROOL];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You start to drool.");
    test.equal(emittedMessages[1], "Strat starts to drool.");
    test.done();
};

exports.social_droolWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_DROOL];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You drool all over Apok.");
    test.equal(emittedMessages[1], "Strat drools all over you.");
    test.equal(emittedMessages[2], "Strat drools all over Apok.");
    test.done();
};

exports.social_droolWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_DROOL];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Pardon??");
    test.done();
};

exports.social_droolWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_DROOL];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Sure, go ahead and drool...yuk!");
    test.equal(emittedMessages[1], "Strat drools on himself.  What a sight.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_embraceWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_EMBRACE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You reach but come away empty.  :(");
    test.equal(emittedMessages[1], "Strat reaches out for an embrace, but no one is there.");
    test.done();
};

exports.social_embraceWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_EMBRACE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You embrace him warmly.");
    test.equal(emittedMessages[1], "Strat embraces you warmly.");
    test.equal(emittedMessages[2], "Strat embraces Apok warmly.");
    test.done();
};

exports.social_embraceWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_EMBRACE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Alas, your embracee is not here.");
    test.done();
};

exports.social_embraceWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_EMBRACE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You embrace yourself??");
    test.equal(emittedMessages[1], "Strat wraps his arms around himself for a warm self-embrace.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_fartWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FART];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Where are your manners?");
    test.equal(emittedMessages[1], "Strat lets off a real rip-roarer!");
    test.done();
};

exports.social_fartWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FART];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Where are your manners?");
    test.equal(emittedMessages[1], "Strat lets off a real rip-roarer!");
    test.done();
};

exports.social_fartWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FART];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Where are your manners?");
    test.equal(emittedMessages[1], "Strat lets off a real rip-roarer!");
    test.done();
};

exports.social_fartWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FART];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Where are your manners?");
    test.equal(emittedMessages[1], "Strat lets off a real rip-roarer!");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_flipWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FLIP];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You flip head over heels.");
    test.equal(emittedMessages[1], "Strat flips head over heels.");
    test.done();
};

exports.social_flipWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FLIP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You flip head over heels.");
    test.equal(emittedMessages[1], "Strat flips head over heels.");
    test.done();
};

exports.social_flipWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FLIP];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You flip head over heels.");
    test.equal(emittedMessages[1], "Strat flips head over heels.");
    test.done();
};

exports.social_flipWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FLIP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You flip head over heels.");
    test.equal(emittedMessages[1], "Strat flips head over heels.");
    test.done();
};


//////////////////////////////////////////////////////////

exports.social_flirtWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FLIRT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You flirt outrageously.");
    test.equal(emittedMessages[1], "Strat flirts outrageously.");
    test.done();
};

exports.social_flirtWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FLIRT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
   
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You flirt outrageously with Apok."); 
    test.equal(emittedMessages[1], "Strat flirts outrageously with you.");
    test.equal(emittedMessages[2], "Strat flirts outrageously with Apok.");
    test.done();
};

exports.social_flirtWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FLIRT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Sorry, your dearly beloved is not around.");
    test.done();
};

exports.social_flirtWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FLIRT];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You flirt with yourself.  Must look stupid.");
    test.equal(emittedMessages[1], "Strat thinks he is the most wonderful person in the world.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_fondleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FONDLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
   
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Who needs to be fondled?");
    test.done();
};

exports.social_fondleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FONDLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You fondly fondle him.");
    test.equal(emittedMessages[1], "Strat fondly fondles you.");
    test.equal(emittedMessages[2], "Strat fondly fondles Apok.");
    test.done();
};

exports.social_fondleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FONDLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "You fondly try to fondle someone not in the room, but who cares.");
    test.done();
};

exports.social_fondleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FONDLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You fondly fondle yourself, feels funny doesn't it?");
    test.equal(emittedMessages[1], "Strat fondly fondles himself -- this is going too far!!");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_frenchWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FRENCH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "French whom??");
    test.done();
};

exports.social_frenchWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FRENCH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You give Apok a long and passionate kiss, it seems to take forever...");
    test.equal(emittedMessages[1], "Strat gives you a long and passionate kiss, it seems to take forever...");
    test.equal(emittedMessages[2], "Strat kisses Apok passionately.");
    test.done();
};

exports.social_frenchWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FRENCH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Your heart is filled with despair as that person is not here.");
    test.done();
};

exports.social_frenchWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FRENCH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You gather yourself in your arms and try to kiss yourself.");
    test.equal(emittedMessages[1], "Strat makes an attempt at kissing himself.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_frownWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FROWN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "What's bothering you?");
    test.equal(emittedMessages[1], "Strat frowns.");
    test.done();
};

exports.social_frownWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FROWN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "What's bothering you?");
    test.equal(emittedMessages[1], "Strat frowns.");
    test.done();
};

exports.social_frownWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FROWN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "What's bothering you?");
    test.equal(emittedMessages[1], "Strat frowns.");
    test.done();
};

exports.social_frownWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FROWN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "What's bothering you?");
    test.equal(emittedMessages[1], "Strat frowns.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_fumeWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FUME];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Take it easy now!  Count to ten, very slowly.");
    test.equal(emittedMessages[1], "Strat grits his teeth and fumes with rage.");
    test.done();
};

exports.social_fumeWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FUME];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You stare at him, fuming.");
    test.equal(emittedMessages[1], "Strat stares at you, fuming with rage!");
    test.equal(emittedMessages[2], "Strat stares at Apok, fuming with rage.");
    test.done();
};

exports.social_fumeWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FUME];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Fume away.. they ain't here.");
    test.done();
};

exports.social_fumeWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_FUME];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "That's right - hate yourself!");
    test.equal(emittedMessages[1], "Strat clenches his fists and stomps his feet, fuming with anger.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_gaspWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GASP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You gasp in astonishment.");
    test.equal(emittedMessages[1], "Strat gasps in astonishment.");
    test.done();
};

exports.social_gaspWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GASP];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You gasp in astonishment.");
    test.equal(emittedMessages[1], "Strat gasps in astonishment.");
    test.done();
};

exports.social_gaspWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GASP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You gasp in astonishment.");
    test.equal(emittedMessages[1], "Strat gasps in astonishment.");
    test.done();
};

exports.social_gaspWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GASP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You gasp in astonishment.");
    test.equal(emittedMessages[1], "Strat gasps in astonishment.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_giggleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GIGGLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You giggle.");
    test.equal(emittedMessages[1], "Strat giggles.");
    test.done();
};

exports.social_giggleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GIGGLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You giggle.");
    test.equal(emittedMessages[1], "Strat giggles.");
    test.done();
};

exports.social_giggleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GIGGLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You giggle.");
    test.equal(emittedMessages[1], "Strat giggles.");
    test.done();
};

exports.social_giggleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GIGGLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You giggle.");
    test.equal(emittedMessages[1], "Strat giggles.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_glareWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GLARE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You glare at nothing in particular.");
    test.equal(emittedMessages[1], "Strat glares around him.");
    test.done();
};

exports.social_glareWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GLARE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You glare icily at him.");
    test.equal(emittedMessages[1], "Strat glares icily at you, you feel cold to your bones.");
    test.equal(emittedMessages[2], "Strat glares at Apok.");
    test.done();
};

exports.social_glareWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GLARE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "You try to glare at somebody who is not present.");
    test.done();
};

exports.social_glareWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GLARE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You glare icily at your feet, they are suddenly very cold.");
    test.equal(emittedMessages[1], "Strat glares at his feet.  What is bothering him?");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_greetWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GREET];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Greet Who?");
    test.done();
};

exports.social_greetWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GREET];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You greet him with a light kiss on his cheek.");
    test.equal(emittedMessages[1], "Strat greets you with a light kiss on your cheek.");
    test.equal(emittedMessages[2], "Strat greets Apok with a light kiss on its cheek.");
    test.done();
};

exports.social_greetWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GREET];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Please -- try someone who is here?");
    test.done();
};

exports.social_greetWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GREET];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "So, you've finally discovered yourself!");
    test.equal(emittedMessages[1], "Strat greets himself.. he always was a strange one.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_grinWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GRIN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You grin evilly.");
    test.equal(emittedMessages[1], "Strat grins evilly.");
    test.done();
};

exports.social_grinWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GRIN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You grin evilly.");
    test.equal(emittedMessages[1], "Strat grins evilly.");
    test.done();
};

exports.social_grinWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GRIN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You grin evilly.");
    test.equal(emittedMessages[1], "Strat grins evilly.");
    test.done();
};

exports.social_grinWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GRIN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You grin evilly.");
    test.equal(emittedMessages[1], "Strat grins evilly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_groanWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROAN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You groan loudly.");
    test.equal(emittedMessages[1], "Strat groans loudly.");
    test.done();
};

exports.social_groanWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROAN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You groan loudly.");
    test.equal(emittedMessages[1], "Strat groans loudly.");
    test.done();
};

exports.social_groanWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROAN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You groan loudly.");
    test.equal(emittedMessages[1], "Strat groans loudly.");
    test.done();
};

exports.social_groanWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROAN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You groan loudly.");
    test.equal(emittedMessages[1], "Strat groans loudly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_gropeWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROPE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Whom do you wish to grope??");
    test.done();
};

exports.social_gropeWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROPE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You grope Apok.");
    test.equal(emittedMessages[1], "Strat gropes you.");
    test.equal(emittedMessages[2], "Strat gropes Apok.");
    test.done();
};

exports.social_gropeWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROPE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Try someone who's here.");
    test.done();
};

exports.social_gropeWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROPE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You grope yourself -- YUCK.");
    test.equal(emittedMessages[1], "Strat gropes himself -- YUCK.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_grovelWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROVEL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You grovel in the dirt.");
    test.equal(emittedMessages[1], "Strat grovels in the dirt.");
    test.done();
};

exports.social_grovelWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROVEL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You grovel before him.");
    test.equal(emittedMessages[1], "Strat grovels in the dirt before you.");
    test.equal(emittedMessages[2], "Strat grovels in the dirt before Apok.");
    test.done();
};

exports.social_grovelWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROVEL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Who?");
    test.done();
};

exports.social_grovelWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROVEL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "That seems a little silly to me..");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_growlWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROWL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Grrrrrrrrrr...");
    test.equal(emittedMessages[1], "Strat growls.");
    test.done();
};

exports.social_growlWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROWL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Grrrrrrrrrr...");
    test.equal(emittedMessages[1], "Strat growls.");
    test.done();
};

exports.social_growlWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROWL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Grrrrrrrrrr...");
    test.equal(emittedMessages[1], "Strat growls.");
    test.done();
};

exports.social_growlWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_GROWL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Grrrrrrrrrr...");
    test.equal(emittedMessages[1], "Strat growls.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_hiccupWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_HICCUP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "*HIC*");
    test.equal(emittedMessages[1], "Strat hiccups.");
    test.done();
};

exports.social_hiccupWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_HICCUP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "*HIC*");
    test.equal(emittedMessages[1], "Strat hiccups.");
    test.done();
};

exports.social_hiccupWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_HICCUP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "*HIC*");
    test.equal(emittedMessages[1], "Strat hiccups.");
    test.done();
};

exports.social_hiccupWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_HICCUP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "*HIC*");
    test.equal(emittedMessages[1], "Strat hiccups.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_hugWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_HUG];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Hug who?");
    test.done();
};

exports.social_hugWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_HUG];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You hug him.");
    test.equal(emittedMessages[1], "Strat hugs you.");
    test.equal(emittedMessages[2], "Strat hugs Apok.");
    test.done();
};

exports.social_hugWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_HUG];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Sorry, friend, I can't see that person here.");
    test.done();
};

exports.social_hugWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_HUG];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You hug yourself.");
    test.equal(emittedMessages[1], "Strat hugs himself.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_kissWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_KISS];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Isn't there someone you want to kiss?");
    test.done();
};

exports.social_kissWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_KISS];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You kiss him.");
    test.equal(emittedMessages[1], "Strat kisses you.");
    test.equal(emittedMessages[2], "Strat kisses Apok.");
    test.done();
};

exports.social_kissWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_KISS];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Never around when required.");
    test.done();
};

exports.social_kissWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_KISS];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "All the lonely people :(");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_laughWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_LAUGH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You fall down laughing.");
    test.equal(emittedMessages[1], "Strat falls down laughing.");
    test.done();
};

exports.social_laughWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_LAUGH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You fall down laughing.");
    test.equal(emittedMessages[1], "Strat falls down laughing.");
    test.done();
};

exports.social_laughWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_LAUGH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You fall down laughing.");
    test.equal(emittedMessages[1], "Strat falls down laughing.");
    test.done();
};

exports.social_laughWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_LAUGH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You fall down laughing.");
    test.equal(emittedMessages[1], "Strat falls down laughing.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_lickWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_LICK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You lick your mouth and smile.");
    test.equal(emittedMessages[1], "Strat licks his mouth and smiles.");
    test.done();
};

exports.social_lickWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_LICK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You lick him.");
    test.equal(emittedMessages[1], "Strat licks you.");
    test.equal(emittedMessages[2], "Strat licks Apok.");
    test.done();
};

exports.social_lickWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_LICK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Lick away, nobody's here with that name.");
    test.done();
};

exports.social_lickWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_LICK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You lick yourself.");
    test.equal(emittedMessages[1], "Strat licks himself -- YUCK.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_loveWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_LOVE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You love the whole world.");
    test.equal(emittedMessages[1], "Strat loves everybody in the world.");
    test.done();
};

exports.social_loveWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_LOVE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You tell your true feelings to Apok.");
    test.equal(emittedMessages[1], "Strat whispers to you sweet words of love.");
    test.equal(emittedMessages[2], "Strat whispers softly to Apok.");
    test.done();
};

exports.social_loveWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_LOVE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Alas, your love is not present...");
    test.done();
};

exports.social_loveWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_LOVE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Well, we already know you love yourself (lucky someone does!)");
    test.equal(emittedMessages[1], "Strat loves himself, can you believe it?");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_massageWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_MASSAGE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Massage what, thin air?");
    test.done();
};

exports.social_massageWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_MASSAGE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You gently massage Apok's shoulders.");
    test.equal(emittedMessages[1], "Strat gently massages your shoulders... ahhhhhhhhhh...");
    test.equal(emittedMessages[2], "Strat massages Apok's shoulders.");
    test.done();
};

exports.social_massageWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_MASSAGE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "You can only massage someone in the same room as you.");
    test.done();
};

exports.social_massageWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_MASSAGE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You practice yoga as you try to massage yourself.");
    test.equal(emittedMessages[1], "Strat gives a show on yoga-positions, trying to massage himself.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_moanWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_MOAN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
   
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You start to moan.");
    test.equal(emittedMessages[1], "Strat starts moaning.");
    test.done();
};

exports.social_moanWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_MOAN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You start to moan.");
    test.equal(emittedMessages[1], "Strat starts moaning.");
    test.done();
};

exports.social_moanWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_MOAN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You start to moan.");
    test.equal(emittedMessages[1], "Strat starts moaning.");
    test.done();
};

exports.social_moanWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_MOAN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You start to moan.");
    test.equal(emittedMessages[1], "Strat starts moaning.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_nibbleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NIBBLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Nibble on who?");
    test.done();
};

exports.social_nibbleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NIBBLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0],"You nibble on Apok's ear.");
    test.equal(emittedMessages[1], "Strat nibbles on your ear.");
    test.equal(emittedMessages[2], "Strat nibbles on Apok's ear.");
    test.done();
};

exports.social_nibbleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NIBBLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Sorry, not here, better go back to dreaming about it.");
    test.done();
};

exports.social_nibbleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NIBBLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You nibble on your OWN ear???????????????????");
    test.equal(emittedMessages[1], "Strat nibbles on his OWN ear (I wonder how it is done!!).");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_nodWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NOD];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You nod solemnly.");
    test.equal(emittedMessages[1], "Strat nods solemnly.");
    test.done();
};

exports.social_nodWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NOD];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You nod solemnly.");
    test.equal(emittedMessages[1], "Strat nods solemnly.");
    test.done();
};

exports.social_nodWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NOD];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You nod solemnly.");
    test.equal(emittedMessages[1], "Strat nods solemnly.");
    test.done();
};

exports.social_nodWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NOD];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You nod solemnly.");
    test.equal(emittedMessages[1], "Strat nods solemnly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_nudgeWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NUDGE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Nudge?  Nudge???  The HELL you say!!!!");
    test.done();
};

exports.social_nudgeWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NUDGE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You nudge him with your elbow.");
    test.equal(emittedMessages[1], "Strat nudges you suggestively.  You two have an understanding.");
    test.equal(emittedMessages[2], "Strat nudges Apok suggestively with his elbow.");
    test.done();
};

exports.social_nudgeWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NUDGE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Eh?  That person isn't here, you know.");
    test.done();
};

exports.social_nudgeWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NUDGE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Well, just nudge yourself, but how do you get your elbow in that position?");
    test.equal(emittedMessages[1], "Strat nudges himself with his elbows, making him look like a large chicken.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_nuzzleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NUZZLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Nuzzle who??");
    test.done();
};

exports.social_nuzzleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NUZZLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
   
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You nuzzle his neck softly.");
    test.equal(emittedMessages[1], "Strat softly nuzzles your neck.");
    test.equal(emittedMessages[2], "Strat softly nuzzles Apok's neck.");
    test.done();
};

exports.social_nuzzleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NUZZLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "No.. they aren't here..");
    test.done();
};

exports.social_nuzzleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_NUZZLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "I'm sorry, friend, but that's impossible.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_patWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PAT];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Pat who??");
    test.done();
};

exports.social_patWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PAT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You pat Apok on his head.");
    test.equal(emittedMessages[1], "Strat pats you on your head.");
    test.equal(emittedMessages[2], "Strat pats Apok on his head.");
    test.done();
};

exports.social_patWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PAT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Who, where, what??");
    test.done();
};

exports.social_patWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PAT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You pat yourself on your head, very reassuring.");
    test.equal(emittedMessages[1], "Strat pats himself on the head.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_peerWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PEER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You peer around you, uncertain that what you see is actually true.");
    test.equal(emittedMessages[1], "Strat peers around, looking as if he has trouble seeing everything clearly.");
    test.done();
};

exports.social_peerWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PEER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You peer around you, uncertain that what you see is actually true.");
    test.equal(emittedMessages[1], "Strat peers around, looking as if he has trouble seeing everything clearly.");
    test.done();
};

exports.social_peerWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PEER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You peer around you, uncertain that what you see is actually true.");
    test.equal(emittedMessages[1], "Strat peers around, looking as if he has trouble seeing everything clearly.");
    test.done();
};

exports.social_peerWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PEER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You peer around you, uncertain that what you see is actually true.");
    test.equal(emittedMessages[1], "Strat peers around, looking as if he has trouble seeing everything clearly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_pointWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_POINT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You point whereto?");
    test.equal(emittedMessages[1], "Strat points in all directions, seemingly confused.");
    test.done();
};

exports.social_pointWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_POINT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You point at him -- he DOES look funny.");
    test.equal(emittedMessages[1], "Strat points at you... how rude!");
    test.equal(emittedMessages[2], "Strat muffles a laugh, pointing at Apok.");
    test.done();
};

exports.social_pointWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_POINT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "You must have a VERY long index-finger...");
    test.done();
};

exports.social_pointWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_POINT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You point at yourself.  Insinuating something?");
    test.equal(emittedMessages[1], "Strat points at himself, suggesting that the center of matters is he.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_pokeWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_POKE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Poke who??");
    test.done();
};

exports.social_pokeWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_POKE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You poke him in the ribs.");
    test.equal(emittedMessages[1], "Strat pokes you in the ribs.");
    test.equal(emittedMessages[2], "Strat pokes Apok in the ribs.");
    test.done();
};

exports.social_pokeWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_POKE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "You can't poke someone who's not here!");
    test.done();
};

exports.social_pokeWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_POKE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You poke yourself in the ribs, feeling very silly.");
    test.equal(emittedMessages[1], "Strat pokes himself in the ribs, looking very sheepish.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_ponderWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PONDER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You ponder over matters as they appear to you at this moment.");
    test.equal(emittedMessages[1], "Strat sinks deeply into his own thoughts.");
    test.done();
};

exports.social_ponderWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PONDER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You ponder over matters as they appear to you at this moment.");
    test.equal(emittedMessages[1], "Strat sinks deeply into his own thoughts.");
    test.done();
};

exports.social_ponderWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PONDER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You ponder over matters as they appear to you at this moment.");
    test.equal(emittedMessages[1], "Strat sinks deeply into his own thoughts.");
    test.done();
};

exports.social_ponderWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PONDER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You ponder over matters as they appear to you at this moment.");
    test.equal(emittedMessages[1], "Strat sinks deeply into his own thoughts.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_prayWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PRAY];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You feel righteous, and maybe a little foolish.");
    test.equal(emittedMessages[1], "Strat begs and grovels to the powers that be.");
    test.done();
};

exports.social_prayWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PRAY];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You crawl in the dust before him.");
    test.equal(emittedMessages[1], "Strat kisses the dirt at your feet.");
    test.equal(emittedMessages[2], "Strat falls down and grovels in the dirt before Apok.");
    test.done();
};

exports.social_prayWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PRAY];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "No such person around; your prayers vanish into the endless voids.");
    test.done();
};

exports.social_prayWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PRAY];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Talk about narcissism...");
    test.equal(emittedMessages[1], "Strat performs some strange yoga-exercises and mumbles a prayer to himself.");
    test.done();
};


//////////////////////////////////////////////////////////

exports.social_punchWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PUNCH];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Punch the air?  Sure, go ahead, fine by me...");
    test.equal(emittedMessages[1], "Strat starts shadow-boxing.");
    test.done();
};

exports.social_punchWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PUNCH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You punch him right in the face!  Yuck, the BLOOD!");
    test.equal(emittedMessages[1], "Strat tries a punch at you but misses by a good quarter-mile...");
    test.equal(emittedMessages[2], "Strat punches weakly at Apok, missing by miles.");
    test.done();
};

exports.social_punchWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PUNCH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Punch who?");
    test.done();
};

exports.social_punchWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PUNCH];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You punch yourself in the face resulting in your own nose being bloodied.");
    test.equal(emittedMessages[1], "Strat punches himself in the face, looking kind of stupid.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_purrWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PURR];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "MMMMEEEEEEEEOOOOOOOOOWWWWWWWWWWWW.");
    test.equal(emittedMessages[1], "Strat purrs contentedly.");
    test.done();
};

exports.social_purrWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PURR];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
   
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "MMMMEEEEEEEEOOOOOOOOOWWWWWWWWWWWW.");
    test.equal(emittedMessages[1], "Strat purrs contentedly.");
    test.done();
};

exports.social_purrWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PURR];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "MMMMEEEEEEEEOOOOOOOOOWWWWWWWWWWWW.");
    test.equal(emittedMessages[1], "Strat purrs contentedly.");
    test.done();
};

exports.social_purrWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_PURR];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "MMMMEEEEEEEEOOOOOOOOOWWWWWWWWWWWW.");
    test.equal(emittedMessages[1], "Strat purrs contentedly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_rollWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ROLL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You roll your eyes in disgust.");
    test.equal(emittedMessages[1], "Strat rolls his eyes in disgust.");
    test.done();
};

exports.social_rollWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ROLL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You look at him and roll your eyes in disgust.");
    test.equal(emittedMessages[1], "Strat stares at you and rolls his eyes in disgust.");
    test.equal(emittedMessages[2], "Strat looks at Apok in contempt and rolls his eyes with disgust.");
    test.done();
};

exports.social_rollWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ROLL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Um... who?");
    test.done();
};

exports.social_rollWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ROLL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You roll your eyes, disgusted with your own incompetence.");
    test.equal(emittedMessages[1], "Strat rolls his eyes, disgusted with himself.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_ruffleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_RUFFLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "You've got to ruffle SOMEONE.");
    test.done();
};

exports.social_ruffleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_RUFFLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You ruffle Apok's hair playfully.");
    test.equal(emittedMessages[1], "Strat ruffles your hair playfully.");
    test.equal(emittedMessages[2], "Strat ruffles Apok's hair playfully.");
    test.done();
};

exports.social_ruffleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_RUFFLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Might be a bit difficult.");
    test.done();
};

exports.social_ruffleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_RUFFLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You ruffle your hair, wondering how far you can go before the rest think you're crazy.");
    test.equal(emittedMessages[1], "Strat ruffles his hair -- weirdo!");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_screamWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SCREAM];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "ARRRRRRRRRRGH!!!!!");
    test.equal(emittedMessages[1], "Strat screams loudly!");
    test.done();
};

exports.social_screamWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SCREAM];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "ARRRRRRRRRRGH!!!!!");
    test.equal(emittedMessages[1], "Strat screams loudly!");
    test.done();
};

exports.social_screamWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SCREAM];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "ARRRRRRRRRRGH!!!!!");
    test.equal(emittedMessages[1], "Strat screams loudly!");
    test.done();
};

exports.social_screamWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SCREAM];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "ARRRRRRRRRRGH!!!!!");
    test.equal(emittedMessages[1], "Strat screams loudly!");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_shakeWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SHAKE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You shake your head.");
    test.equal(emittedMessages[1], "Strat shakes his head.");
    test.done();
};

exports.social_shakeWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SHAKE];

    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
   
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You shake his hand.");
    test.equal(emittedMessages[1], "Strat shakes your hand.");
    test.equal(emittedMessages[2], "Strat shakes Apok's hand.");
    test.done();
};

exports.social_shakeWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SHAKE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Sorry good buddy, but that person doesn't seem to be here.");
    test.done();
};

exports.social_shakeWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SHAKE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You are shaken by yourself.");
    test.equal(emittedMessages[1], "Strat shakes and quivers like a bowlful of jelly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_shiverWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SHIVER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Brrrrrrrrr.");
    test.equal(emittedMessages[1], "Strat shivers uncomfortably.");
    test.done();
};

exports.social_shiverWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SHIVER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Brrrrrrrrr.");
    test.equal(emittedMessages[1], "Strat shivers uncomfortably.");
    test.done();
};

exports.social_shiverWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SHIVER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Brrrrrrrrr.");
    test.equal(emittedMessages[1], "Strat shivers uncomfortably.");
    test.done();
};

exports.social_shiverWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SHIVER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Brrrrrrrrr.");
    test.equal(emittedMessages[1], "Strat shivers uncomfortably.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_shrugWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SHRUG];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You shrug.");
    test.equal(emittedMessages[1], "Strat shrugs helplessly.");
    test.done();
};

exports.social_shrugWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SHRUG];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You shrug.");
    test.equal(emittedMessages[1], "Strat shrugs helplessly.");
    test.done();
};

exports.social_shrugWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SHRUG];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You shrug.");
    test.equal(emittedMessages[1], "Strat shrugs helplessly.");
    test.done();
};

exports.social_shrugWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SHRUG];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You shrug.");
    test.equal(emittedMessages[1], "Strat shrugs helplessly.");
    test.done();
};


//////////////////////////////////////////////////////////

exports.social_sighWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SIGH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You sigh.");
    test.equal(emittedMessages[1], "Strat sighs loudly.");
    test.done();
};

exports.social_sighWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SIGH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You sigh.");
    test.equal(emittedMessages[1], "Strat sighs loudly.");
    test.done();
};

exports.social_sighWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SIGH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You sigh.");
    test.equal(emittedMessages[1], "Strat sighs loudly.");
    test.done();
};

exports.social_sighWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SIGH];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You sigh.");
    test.equal(emittedMessages[1], "Strat sighs loudly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_slapWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SLAP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Normally you slap SOMEBODY.");
    test.done();
};

exports.social_slapWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SLAP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You slap Apok.");
    test.equal(emittedMessages[1], "You are slapped by Strat.");
    test.equal(emittedMessages[2], "Strat slaps Apok.");
    test.done();
};

exports.social_slapWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SLAP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "How about slapping someone in the same room as you??");
    test.done();
};

exports.social_slapWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SLAP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You slap yourself, silly you.");
    test.equal(emittedMessages[1], "Strat slaps himself, really strange...");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_smileWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SMILE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You smile happily.");
    test.equal(emittedMessages[1], "Strat smiles happily.");
    test.done();
};

exports.social_smileWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SMILE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You smile at him.");
    test.equal(emittedMessages[1], "Strat smiles at you.");
    test.equal(emittedMessages[2], "Strat beams a smile at Apok.");
    test.done();
};

exports.social_smileWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SMILE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "There's no one by that name around.");
    test.done();
};

exports.social_smileWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SMILE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You smile at yourself.");
    test.equal(emittedMessages[1], "Strat smiles at himself.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_smirkWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SMIRK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You smirk.");
    test.equal(emittedMessages[1], "Strat smirks.");
    test.done();
};

exports.social_smirkWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SMIRK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You smirk.");
    test.equal(emittedMessages[1], "Strat smirks.");
    test.done();
};

exports.social_smirkWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SMIRK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You smirk.");
    test.equal(emittedMessages[1], "Strat smirks.");
    test.done();
};

exports.social_smirkWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SMIRK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You smirk.");
    test.equal(emittedMessages[1], "Strat smirks.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_snapWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNAP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "PRONTO!  You snap your fingers.");
    test.equal(emittedMessages[1], "Strat snaps his fingers.");
    test.done();
};

exports.social_snapWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNAP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "PRONTO!  You snap your fingers.");
    test.equal(emittedMessages[1], "Strat snaps his fingers.");
    test.done();
};

exports.social_snapWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNAP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "PRONTO!  You snap your fingers.");
    test.equal(emittedMessages[1], "Strat snaps his fingers.");
    test.done();
};

exports.social_snapWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNAP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "PRONTO!  You snap your fingers.");
    test.equal(emittedMessages[1], "Strat snaps his fingers.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_snarlWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNARL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You snarl like a viscious animal.");
    test.equal(emittedMessages[1], "Strat snarls like a cornered, viscious animal.");
    test.done();
};

exports.social_snarlWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNARL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You snarl at him angrily.  Control yourself!");
    test.equal(emittedMessages[1], "Strat snarls viciously at you...  his self-control seems to have gone bananas.");
    test.equal(emittedMessages[2], "Strat snarls angrily at Apok...  he seems incapable of controlling himself.");
    test.done();
};

exports.social_snarlWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNARL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Eh?  Who?  Not here, my friend.");
    test.done();
};

exports.social_snarlWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNARL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You snarl at yourself, obviously suffering from schizophrenia.");
    test.equal(emittedMessages[1], "Strat snarls at himself, and suddenly looks very frightened.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_sneezeWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNEEZE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Gesundheit!");
    test.equal(emittedMessages[1], "Strat sneezes.");
    test.done();
};

exports.social_sneezeWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNEEZE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Gesundheit!");
    test.equal(emittedMessages[1], "Strat sneezes.");
    test.done();
};

exports.social_sneezeWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNEEZE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Gesundheit!");
    test.equal(emittedMessages[1], "Strat sneezes.");
    test.done();
};

exports.social_sneezeWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNEEZE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Gesundheit!");
    test.equal(emittedMessages[1], "Strat sneezes.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_snickerWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNICKER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You snicker softly.");
    test.equal(emittedMessages[1], "Strat snickers softly.");
    test.done();
};

exports.social_snickerWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNICKER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You snicker softly.");
    test.equal(emittedMessages[1], "Strat snickers softly.");
    test.done();
};

exports.social_snickerWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNICKER];
   
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You snicker softly.");
    test.equal(emittedMessages[1], "Strat snickers softly.");
    test.done();
};

exports.social_snickerWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNICKER];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You snicker softly.");
    test.equal(emittedMessages[1], "Strat snickers softly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_sniffWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNIFF];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You sniff sadly.  *SNIFF*");
    test.equal(emittedMessages[1], "Strat sniffs sadly.");
    test.done();
};

exports.social_sniffWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNIFF];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You sniff sadly.  *SNIFF*");
    test.equal(emittedMessages[1], "Strat sniffs sadly.");
    test.done();
};

exports.social_sniffWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNIFF];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You sniff sadly.  *SNIFF*");
    test.equal(emittedMessages[1], "Strat sniffs sadly.");
    test.done();
};

exports.social_sniffWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNIFF];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You sniff sadly.  *SNIFF*");
    test.equal(emittedMessages[1], "Strat sniffs sadly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_snoreWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNORE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Zzzzzzzzzzzzzzzzz.");
    test.equal(emittedMessages[1], "Strat snores loudly.");
    test.done();
};

exports.social_snoreWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNORE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Zzzzzzzzzzzzzzzzz.");
    test.equal(emittedMessages[1], "Strat snores loudly.");
    test.done();
};

exports.social_snoreWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNORE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Zzzzzzzzzzzzzzzzz.");
    test.equal(emittedMessages[1], "Strat snores loudly.");
    test.done();
};

exports.social_snoreWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNORE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Zzzzzzzzzzzzzzzzz.");
    test.equal(emittedMessages[1], "Strat snores loudly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_snuggleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNUGGLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Who?");
    test.done();
};

exports.social_snuggleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNUGGLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
   
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You snuggle him.");
    test.equal(emittedMessages[1], "Strat snuggles up to you.");
    test.equal(emittedMessages[2], "Strat snuggles up to Apok.");
    test.done();
};

exports.social_snuggleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNUGGLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "They aren't here.");
    test.done();
};

exports.social_snuggleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SNUGGLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Hmmm...");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_spankWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SPANK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You spank WHO?  Eh?  How?  Naaah, you'd never.");
    test.equal(emittedMessages[1], "Strat spanks the thin air with a flat hand.");
    test.done();
};

exports.social_spankWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SPANK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You spank him vigorously, long and hard.  Your hand hurts.");
    test.equal(emittedMessages[1], "Strat spanks you long and hard.  You feel like a naughty child.");
    test.equal(emittedMessages[2], "Strat spanks Apok over his knee.  It hurts to even watch.");
    test.done();
};

exports.social_spankWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SPANK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Are you sure about this?  I mean, that person isn't even here!");
    test.done();
};

exports.social_spankWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SPANK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Hmm, not likely.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_spitWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SPIT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You spit over your left shoulder.");
    test.equal(emittedMessages[1], "Strat spits over his left shoulder.");
    test.done();
};

exports.social_spitWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SPIT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You spit on him.");
    test.equal(emittedMessages[1], "Strat spits in your face.");
    test.equal(emittedMessages[2], "Strat spits in Apok's face.");
    test.done();
};

exports.social_spitWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SPIT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Can you spit that far?");
    test.done();
};

exports.social_spitWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SPIT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You drool down your front.");
    test.equal(emittedMessages[1], "Strat drools down his front.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_squeezeWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SQUEEZE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Where, what, how, WHO???");
    test.done();
};

exports.social_squeezeWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SQUEEZE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You squeeze him fondly.");
    test.equal(emittedMessages[1], "Strat squeezes you fondly.");
    test.equal(emittedMessages[2], "Strat squeezes Apok fondly.");
    test.done();
};

exports.social_squeezeWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SQUEEZE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Where, what, how, WHO???");
    test.done();
};

exports.social_squeezeWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SQUEEZE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You squeeze yourself -- try to relax a little!");
    test.equal(emittedMessages[1], "Strat squeezes himself.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_stareWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_STARE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You stare at the sky.");
    test.equal(emittedMessages[1], "Strat stares at the sky.");
    test.done();
};

exports.social_stareWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_STARE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You stare dreamily at Apok, completely lost in his eyes..");
    test.equal(emittedMessages[1], "Strat stares dreamily at you, completely lost in your eyes.");
    test.equal(emittedMessages[2], "Strat stares dreamily at Apok.");
    test.done();
};

exports.social_stareWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_STARE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "You stare and stare but can't see that person anywhere...");
    test.done();
};

exports.social_stareWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_STARE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You stare dreamily at yourself - enough narcissism for now.");
    test.equal(emittedMessages[1], "Strat stares dreamily at himself - NARCISSIST!");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_steamWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_STEAM];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You let out some steam, much to the others' relief (and your own!)");
    test.equal(emittedMessages[1], "Strat lets out a lot of steam, much to your relief.");
    test.done();
};

exports.social_steamWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_STEAM];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You let out some steam, much to the others' relief (and your own!)");
    test.equal(emittedMessages[1], "Strat lets out a lot of steam, much to your relief.");
    test.done();
};

exports.social_steamWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_STEAM];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You let out some steam, much to the others' relief (and your own!)");
    test.equal(emittedMessages[1], "Strat lets out a lot of steam, much to your relief.");
    test.done();
};

exports.social_steamWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_STEAM];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You let out some steam, much to the others' relief (and your own!)");
    test.equal(emittedMessages[1], "Strat lets out a lot of steam, much to your relief.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_strutWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_STRUT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Strut your stuff.");
    test.equal(emittedMessages[1], "Strat struts proudly.");
    test.done();
};

exports.social_strutWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_STRUT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Strut your stuff.");
    test.equal(emittedMessages[1], "Strat struts proudly.");
    test.done();
};

exports.social_strutWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_STRUT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Strut your stuff.");
    test.equal(emittedMessages[1], "Strat struts proudly.");
    test.done();
};

exports.social_strutWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_STRUT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Strut your stuff.");
    test.equal(emittedMessages[1], "Strat struts proudly.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_sulkWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SULK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You sulk."); 
    test.equal(emittedMessages[1], "Strat sulks in the corner.");
    test.done();
};

exports.social_sulkWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SULK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You sulk."); 
    test.equal(emittedMessages[1], "Strat sulks in the corner.");
    test.done();
};

exports.social_sulkWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SULK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You sulk."); 
    test.equal(emittedMessages[1], "Strat sulks in the corner.");
    test.done();
};

exports.social_sulkWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_SULK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You sulk."); 
    test.equal(emittedMessages[1], "Strat sulks in the corner.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_tackleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TACKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You tackle the air.  It stands not a chance.");
    test.equal(emittedMessages[1], "Strat starts running around himself in a desperate attempt to tackle the air.");
    test.done();
};

exports.social_tackleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TACKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You ruthlessly tackle him to the ground.");
    test.equal(emittedMessages[1], "Strat suddenly lunges at you and tackles you to the ground!");
    test.equal(emittedMessages[2], "Strat ruthlessly tackles Apok, pinning him to the ground.");
    test.done();
};

exports.social_tackleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TACKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "That person isn't here (luck for them, it would seem...)");
    test.done();
};

exports.social_tackleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TACKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Tackle yourself?  Yeah, right....");
    test.equal(emittedMessages[1], "Strat makes a dexterous move and kicks his left leg away with his right.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_tangoWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TANGO];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "With whom would you like to tango?");
    test.equal(emittedMessages[1], "Strat puts a rose between his teeth, but takes out it since noone joins him.");
    test.done();
};

exports.social_tangoWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TANGO];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You put a rose between your teeth and tango with him seductively.");
    test.equal(emittedMessages[1], "Strat puts a rose between his teeth and tangos with you seductively.");
    test.equal(emittedMessages[2], "Strat puts a rose between his teeth and tangos with Apok seductively.");
    test.done();
};

exports.social_tangoWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TANGO];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "That person isn't around.  Better sit this one out.");
    test.done();
};

exports.social_tangoWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TANGO];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Feels rather stupid, doesn't it?");
    test.equal(emittedMessages[1], "Strat puts a rose between his teeth and tries to tango with himself.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_tauntWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TAUNT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You taunt the nothing in front of you.");
    test.equal(emittedMessages[1], "Strat taunts something that seems to be right in front of him.");
    test.done();
};

exports.social_tauntWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TAUNT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You taunt him, to your own delight.");
    test.equal(emittedMessages[1], "Strat taunts you.  It really hurts your feelings.");
    test.equal(emittedMessages[2], "Strat taunts Apok rather insultingly... he seems to enjoy it tremendously.");
    test.done();
};

exports.social_tauntWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TAUNT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Hmmmmmmm.....nope, no one by that name here.");
    test.done();
};

exports.social_tauntWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TAUNT];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You taunt yourself, almost making you cry...:(");
    test.equal(emittedMessages[1], "Strat taunts himself to tears.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_thankWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_THANK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Thank you too.");
    test.done();
};

exports.social_thankWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_THANK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You thank Apok heartily.");
    test.equal(emittedMessages[1], "Strat thanks you heartily.");
    test.equal(emittedMessages[2], "Strat thanks Apok heartily.");
    test.done();
};

exports.social_thankWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_THANK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "No one answers to that name here.");
    test.done();
};

exports.social_thankWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_THANK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You thank yourself since nobody else wants to!");
    test.equal(emittedMessages[1], "Strat thanks himself since you won't.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_thinkWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_THINK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You think about life, the universe and everything.");
    test.equal(emittedMessages[1], "Strat sinks deeply into thought about the meaning of life.");
    test.done();
};

exports.social_thinkWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_THINK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You think about what purpose he has in relation to your part of life.");
    test.equal(emittedMessages[1], "Your ears burn as Strat thinks about you.. you wonder what about.");
    test.equal(emittedMessages[2], "Strat stops and thinks about Apok, completely lost in thought.");
    test.done();
};

exports.social_thinkWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_THINK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "You'd better think harder, if you hope to make contact!");
    test.done();
};

exports.social_thinkWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_THINK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You think about yourself (for once).");
    test.equal(emittedMessages[1], "Strat thinks about himself for a change.....(?)");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_tickleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TICKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Who do you want to tickle??");
    test.done();
};

exports.social_tickleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TICKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You tickle Apok.");
    test.equal(emittedMessages[1], "Strat tickles you - hee hee hee.");
    test.equal(emittedMessages[2], "Strat tickles Apok.");
    test.done();
};

exports.social_tickleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TICKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Who is that??");
    test.done();
};

exports.social_tickleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TICKLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You tickle yourself, how funny!");
    test.equal(emittedMessages[1], "Strat tickles himself.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_twiddleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TWIDDLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You patiently twiddle your thumbs.");
    test.equal(emittedMessages[1], "Strat patiently twiddles his thumbs.");
    test.done();
};

exports.social_twiddleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TWIDDLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You patiently twiddle your thumbs.");
    test.equal(emittedMessages[1], "Strat patiently twiddles his thumbs.");
    test.done();
};

exports.social_twiddleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TWIDDLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You patiently twiddle your thumbs.");
    test.equal(emittedMessages[1], "Strat patiently twiddles his thumbs.");
    test.done();
};

exports.social_twiddleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_TWIDDLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You patiently twiddle your thumbs.");
    test.equal(emittedMessages[1], "Strat patiently twiddles his thumbs.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_waveWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WAVE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
   
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You wave.");
    test.equal(emittedMessages[1], "Strat waves happily.");
    test.done();
};

exports.social_waveWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WAVE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You wave goodbye to Apok.");
    test.equal(emittedMessages[1], "Strat waves goodbye to you.  Have a good journey.");
    test.equal(emittedMessages[2], "Strat waves goodbye to Apok.");
    test.done();
};

exports.social_waveWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WAVE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "They didn't wait for you to wave goodbye.");
    test.done();
};

exports.social_waveWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WAVE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Are you going on adventures as well??");
    test.equal(emittedMessages[1], "Strat waves goodbye to himself.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_whineWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WHINE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You whine pitifully.");
    test.equal(emittedMessages[1], "Strat whines pitifully about the whole situation.");
    test.done();
};

exports.social_whineWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WHINE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You whine pitifully.");
    test.equal(emittedMessages[1], "Strat whines pitifully about the whole situation.");
    test.done();
};

exports.social_whineWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WHINE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You whine pitifully.");
    test.equal(emittedMessages[1], "Strat whines pitifully about the whole situation.");
    test.done();
};

exports.social_whineWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WHINE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You whine pitifully.");
    test.equal(emittedMessages[1], "Strat whines pitifully about the whole situation.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_whistleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WHISTLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You whistle appreciatively.");
    test.equal(emittedMessages[1], "Strat whistles appreciatively.");
    test.done();
};

exports.social_whistleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WHISTLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
   
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You whistle appreciatively.");
    test.equal(emittedMessages[1], "Strat whistles appreciatively.");
    test.done();
};

exports.social_whistleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WHISTLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You whistle appreciatively.");
    test.equal(emittedMessages[1], "Strat whistles appreciatively.");
    test.done();
};

exports.social_whistleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WHISTLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You whistle appreciatively.");
    test.equal(emittedMessages[1], "Strat whistles appreciatively.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_wiggleWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WIGGLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You wiggle your bottom.");
    test.equal(emittedMessages[1], "Strat wiggles his bottom.");
    test.done();
};

exports.social_wiggleWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WIGGLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You wiggle your bottom.");
    test.equal(emittedMessages[1], "Strat wiggles his bottom.");
    test.done();
};

exports.social_wiggleWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WIGGLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You wiggle your bottom.");
    test.equal(emittedMessages[1], "Strat wiggles his bottom.");
    test.done();
};

exports.social_wiggleWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WIGGLE];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You wiggle your bottom.");
    test.equal(emittedMessages[1], "Strat wiggles his bottom.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_winkWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WINK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "Have you got something in your eye?");
    test.equal(emittedMessages[1], "Strat winks suggestively.");
    test.done();
};

exports.social_winkWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WINK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You wink suggestively at Apok.");
    test.equal(emittedMessages[1], "Strat winks suggestively at you.");
    test.equal(emittedMessages[2], "Strat winks at Apok.");
    test.done();
};

exports.social_winkWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WINK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "No one with that name is present.");
    test.done();
};

exports.social_winkWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WINK];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You wink at yourself?? -- what are you up to?");
    test.equal(emittedMessages[1], "Strat winks at himself -- something strange is going on...");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_worshipWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WORSHIP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You find yourself head-down in the dirt, worshipping.");
    test.equal(emittedMessages[1], "Strat starts worshipping nothing at all.");
    test.done();
};

exports.social_worshipWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WORSHIP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 3);
    test.equal(emittedMessages[0], "You fall to your knees and worship him deeply.");
    test.equal(emittedMessages[1], "Strat kneels before you in solemn worship.");
    test.equal(emittedMessages[2], "Strat falls to his knees, worshipping Apok with uncanny dedication.");
    test.done();
};

exports.social_worshipWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WORSHIP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 1);
    test.equal(emittedMessages[0], "Uh.. who?  They're not here, pal.");
    test.done();
};

exports.social_worshipWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_WORSHIP];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You seem sure to have found a true deity.....");
    test.equal(emittedMessages[1], "Strat falls to his knees and humbly worships himself.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_yawnWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_YAWN];
   
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You yawn.  Sleepy, eh?");
    test.equal(emittedMessages[1], "Strat yawns.");
    test.done();
};

exports.social_yawnWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_YAWN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You yawn.  Sleepy, eh?");
    test.equal(emittedMessages[1], "Strat yawns.");
    test.done();
};

exports.social_yawnWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_YAWN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You yawn.  Sleepy, eh?");
    test.equal(emittedMessages[1], "Strat yawns.");
    test.done();
};

exports.social_yawnWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_YAWN];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You yawn.  Sleepy, eh?");
    test.equal(emittedMessages[1], "Strat yawns.");
    test.done();
};

//////////////////////////////////////////////////////////

exports.social_yodelWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_YODEL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You start yodelling loudly and rather beautifully in your own ears.");
    test.equal(emittedMessages[1], "Strat starts a yodelling session that goes right to the bone.");
    test.done();
};

exports.social_yodelWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_YODEL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    var target = new Character();
    target.name = "Apok";
    target.gender = global.GENDER_MALE;
    target.position = global.POS_STANDING;
    
    var room = new Room();
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var thisSocial = new social(socialDefinition, 'Apok', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You start yodelling loudly and rather beautifully in your own ears.");
    test.equal(emittedMessages[1], "Strat starts a yodelling session that goes right to the bone.");
    test.done();
};

exports.social_yodelWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_YODEL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Apok', actor);
    
    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You start yodelling loudly and rather beautifully in your own ears.");
    test.equal(emittedMessages[1], "Strat starts a yodelling session that goes right to the bone.");
    test.done();
};

exports.social_yodelWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_YODEL];
    
    var actor = new Character();
    actor.name = "Strat";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;

    var room = new Room();
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'Strat', actor);

    var emittedMessages = thisSocial.emitMessages();
    test.equal(emittedMessages.length, 2);
    test.equal(emittedMessages[0], "You start yodelling loudly and rather beautifully in your own ears.");
    test.equal(emittedMessages[1], "Strat starts a yodelling session that goes right to the bone.");
    test.done();
};


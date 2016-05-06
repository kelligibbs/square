// var constants = require('../constants');
// var Character = require("../character").character;
// var World = require('../world');
// var Room = require("../room").room;
// var Item = require('../item').item;

// /////////////////////////////////////////////////

// exports.character_getPersonalPronoun_worksForNeutral = function(test) {
//     var myCharacter = new Character();
//     myCharacter.gender = global.GENDER_NEUTRAL;
//     test.equal(myCharacter.getPersonalPronoun(), "it");
// 	test.done();
// };

// exports.character_getPersonalPronoun_worksForMale = function(test) {
//     var myCharacter = new Character();
//     myCharacter.gender = global.GENDER_MALE;
//     test.equal(myCharacter.getPersonalPronoun(), "he");
// 	test.done();
// };

// exports.character_getPersonalPronoun_worksForFemale = function(test) {
//     var myCharacter = new Character();
//     myCharacter.gender = global.GENDER_FEMALE;
//     test.equal(myCharacter.getPersonalPronoun(), "she");
// 	test.done();
// };

// exports.character_getObjectPronoun_worksForNeutral = function(test) {
//     var myCharacter = new Character();
//     myCharacter.gender = global.GENDER_NEUTRAL;
//     test.equal(myCharacter.getObjectPronoun(), "it");
// 	test.done();
// };

// exports.character_getObjectPronoun_worksForMale = function(test) {
//     var myCharacter = new Character();
//     myCharacter.gender = global.GENDER_MALE;
//     test.equal(myCharacter.getObjectPronoun(), "him");
// 	test.done();
// };

// exports.character_getObjectPronoun_worksForFemale = function(test) {
//     var myCharacter = new Character();
//     myCharacter.gender = global.GENDER_FEMALE;
//     test.equal(myCharacter.getObjectPronoun(), "her");
// 	test.done();
// };

// exports.character_getPossessivePronoun_worksForNeutral = function(test) {
//     var myCharacter = new Character();
//     myCharacter.gender = global.GENDER_NEUTRAL;
//     test.equal(myCharacter.getPossessivePronoun(), "its");
// 	test.done();
// };

// exports.character_getPossessivePronoun_worksForMale = function(test) {
//     var myCharacter = new Character();
//     myCharacter.gender = global.GENDER_MALE;
//     test.equal(myCharacter.getPossessivePronoun(), "his");
// 	test.done();
// };

// exports.character_getPossessivePronoun_worksForFemale = function(test) {
//     var myCharacter = new Character();
//     myCharacter.gender = global.GENDER_FEMALE;
//     test.equal(myCharacter.getPossessivePronoun(), "her");
// 	test.done();
// };

// /////////////////////////////////////////////////

// exports.character_getFormattedHeight = function(test) {
//     var myCharacter = new Character();
//     myCharacter.height = 62;
    
//     var actual = myCharacter.getFormattedHeight();
//     test.equal(actual, "5 feet, 2 inches");
//     test.done();
// };

// /////////////////////////////////////////////////

// exports.character_getBMI = function(test) {
//     var myCharacter = new Character();
//     myCharacter.weight = 178;
//     myCharacter.height = 62;
    
//     var actual = myCharacter.getBMI();
//     test.equal(actual, 32);
//     test.done();
// };


// /////////////////////////////////////////////////

// // TODO: MOVE tests

// /////////////////////////////////////////////////

// exports.character_emoteSendsIdenticalMessagesToActorAndRoom = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Ace";
    
//     var actualResult = myCharacter.emote("feels the love.");
//     test.equal(actualResult[0], "Ace feels the love.");
//     test.equal(actualResult[1], "Ace feels the love.");
//     test.done();
// };

// /////////////////////////////////////////////////

// ///////////////////////////////////////////////////////////

// exports.character_standReturnsErrorWhenAlreadyStanding = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_STANDING;
    
//     var actual = myCharacter.stand();
    
//     test.equal(actual.length, 1);
//     test.equal(actual[0], "You are already standing.");
//     test.equal(myCharacter.position, global.POS_STANDING);
//     test.done();
// };

// exports.character_standWorksWhenSitting = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_SITTING;
    
//     var actual = myCharacter.stand();
    
//     test.equal(actual.length, 2);
//     test.equal(actual[0], "You stand up.");
//     test.equal(actual[1], "Tails clambers to his feet.");
//     test.equal(myCharacter.position, global.POS_STANDING);
//     test.done();
// };

// exports.character_standWorksWhenResting = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_RESTING;
    
//     var actual = myCharacter.stand();
    
//     test.equal(actual.length, 2);
//     test.equal(actual[0], "You stop resting, and stand up.");
//     test.equal(actual[1], "Tails stops resting, and clambers on his feet.");
//     test.equal(myCharacter.position, global.POS_STANDING);
//     test.done();
// };

// exports.character_standReturnsErrorWhenSleeping = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_SLEEPING;
    
//     var actual = myCharacter.stand();
    
//     test.equal(actual.length, 1);
//     test.equal(actual[0], "You have to wake up first!");
//     test.equal(myCharacter.position, global.POS_SLEEPING);
//     test.done();
// };

// ///////////////////////////////////////////////////////////

// exports.character_sitWorksWhenStanding = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_STANDING;
    
//     var actual = myCharacter.sit();
    
//     test.equal(actual.length, 2);
//     test.equal(actual[0], "You sit down.");
//     test.equal(actual[1], "Tails sits down.");
//     test.equal(myCharacter.position, global.POS_SITTING);
//     test.done();
// };

// exports.character_sitReturnsErrorWhenAlreadySitting = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_SITTING;
    
//     var actual = myCharacter.sit();
    
//     test.equal(actual.length, 1);
//     test.equal(actual[0], "You're sitting already.");
//     test.equal(myCharacter.position, global.POS_SITTING);
//     test.done();
// };

// exports.character_sitWorksWhenResting = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_RESTING;
    
//     var actual = myCharacter.sit();
    
//     test.equal(actual.length, 2);
//     test.equal(actual[0], "You stop resting, and sit up.");
//     test.equal(actual[1], "Tails stops resting.");
//     test.equal(myCharacter.position, global.POS_SITTING);
//     test.done();
// };

// exports.character_sitReturnsErrorWhenSleeping = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_SLEEPING;
    
//     var actual = myCharacter.sit();
    
//     test.equal(actual.length, 1);
//     test.equal(actual[0], "You have to wake up first.");
//     test.equal(myCharacter.position, global.POS_SLEEPING);
//     test.done();
// };

// ///////////////////////////////////////////////////////////

// exports.character_restWorksWhenStanding = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_STANDING;
    
//     var actual = myCharacter.rest();
    
//     test.equal(actual.length, 2);
//     test.equal(actual[0], "You sit down and rest your tired bones.");
//     test.equal(actual[1], "Tails sits down and rests.");
//     test.equal(myCharacter.position, global.POS_RESTING);
//     test.done();
// };

// exports.character_restWorksWhenSitting = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_SITTING;
    
//     var actual = myCharacter.rest();
    
//     test.equal(actual.length, 2);
//     test.equal(actual[0], "You rest your tired bones.");
//     test.equal(actual[1], "Tails rests.");
//     test.equal(myCharacter.position, global.POS_RESTING);
//     test.done();
// };

// exports.character_restReturnsErrorWhenAlreadyResting = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_RESTING;
    
//     var actual = myCharacter.rest();
    
//     test.equal(actual.length, 1);
//     test.equal(actual[0], "You are resting already.");
//     test.equal(myCharacter.position, global.POS_RESTING);
//     test.done();
// };

// exports.character_restReturnsErrorWhenSleeping = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_SLEEPING;
    
//     var actual = myCharacter.rest();
    
//     test.equal(actual.length, 1);
//     test.equal(actual[0], "You have to wake up first.");
//     test.equal(myCharacter.position, global.POS_SLEEPING);
//     test.done();
// };

// ///////////////////////////////////////////////////////////

// exports.character_sleepWorksWhenStanding = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_STANDING;
    
//     var actual = myCharacter.sleep();
    
//     test.equal(actual.length, 2);
//     test.equal(actual[0], "You go to sleep.");
//     test.equal(actual[1], "Tails lies down and falls asleep.");
//     test.equal(myCharacter.position, global.POS_SLEEPING);
//     test.done();
// };

// exports.character_sleepWorksWhenSitting = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_SITTING;
    
//     var actual = myCharacter.sleep();
    
//     test.equal(actual.length, 2);
//     test.equal(actual[0], "You go to sleep.");
//     test.equal(actual[1], "Tails lies down and falls asleep.");
//     test.equal(myCharacter.position, global.POS_SLEEPING);
//     test.done();
// };

// exports.character_sleepWorksWhenResting = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_RESTING;
    
//     var actual = myCharacter.sleep();
    
//     test.equal(actual.length, 2);
//     test.equal(actual[0], "You go to sleep.");
//     test.equal(actual[1], "Tails lies down and falls asleep.");
//     test.equal(myCharacter.position, global.POS_SLEEPING);
//     test.done();
// };

// exports.character_sleepReturnsErrorWhenSleeping = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_SLEEPING;
    
//     var actual = myCharacter.sleep();
    
//     test.equal(actual.length, 1);
//     test.equal(actual[0], "You are already sound asleep.");
//     test.equal(myCharacter.position, global.POS_SLEEPING);
//     test.done();
// };

// ///////////////////////////////////////////////////////////

// // TODO: Test Wake

// exports.character_wakeReturnsErrorWhenNotSleeping = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_RESTING;
    
//     var actual = myCharacter.wake();
    
//     test.equal(actual.length, 1);
//     test.equal(actual[0], "You are already awake...");
//     test.equal(myCharacter.position, global.POS_RESTING);
//     test.done();
// };

// exports.character_wakeReturnsErrorWhenDead = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_STUNNED;
    
//     var actual = myCharacter.wake();
    
//     test.equal(actual.length, 1);
//     test.equal(actual[0], "You can't wake up! You're in pretty bad shape!");
//     test.equal(myCharacter.position, global.POS_STUNNED);
//     test.done();
// };

// exports.character_wakeWorksWhenSleeping = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Tails";
//     myCharacter.gender = global.GENDER_MALE;
//     myCharacter.position = global.POS_SLEEPING;
    
//     var actual = myCharacter.wake();
    
//     test.equal(actual.length, 2);
//     test.equal(actual[0], "You awaken, and sit up.");
//     test.equal(actual[1], "Tails awakens.");
//     test.equal(myCharacter.position, global.POS_SITTING);
//     test.done();
// };

// ///////////////////////////////////////////////////////////

// // TODO: Test Awaken

// /////////////////////////////////////////////////

// exports.character_sayRejectsBlankInput = function(test) {
//     var myCharacter = new Character();
//     var actualResult = myCharacter.say("");
//     test.equal(actualResult, "Yes, but WHAT do you want to say?");
//     test.done();
// };


// exports.character_sayFormatsMessageAsExpected = function(test) {
//     var myCharacter = new Character();
//     myCharacter.name = "Ace";

//     var actualResult = myCharacter.say("the dragon is unkillable!");
//     test.equal(actualResult[0], "You say, 'the dragon is unkillable!'");
//     test.equal(actualResult[1], "Ace says, 'the dragon is unkillable!'");
//     test.done();
// };

// /////////////////////////////////////////////////

// exports.character_eatObjectExtractsObject = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.hunger = 6;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var bread = new Item();
//     bread.keywords.push("bread");
//     bread.shortDescription = "some waybread";
//     bread.hoursOfHunger = 3;  
//     felix.inventory.push(bread);
//     myWorld.addItem(bread);
    
//     var result = felix.eatObject(bread, global.SCMD_EAT);
//     console.log(result);
//     test.equal(result[0], "You eat some waybread.");
//     test.equal(result[1], "Felix eats some waybread.");
//     test.equal(result.length, 2);
//     test.equal(felix.inventory.length, 0);
//     test.equal(felix.hunger, 9);
//     test.done();
// };

// exports.character_tasteObjectExtractsObjectWhenOneLeft = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.hunger = 6;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var bread = new Item();
//     bread.keywords.push("bread");
//     bread.shortDescription = "some waybread";
//     bread.hoursOfHunger = 1;  
//     felix.inventory.push(bread);
//     myWorld.addItem(bread);
    
//     var result = felix.eatObject(bread, global.SCMD_TASTE);
//     test.equal(result[0], "You nibble a little bit of some waybread.");
//     test.equal(result[1], "Felix nibbles a little bit of some waybread.");
//     test.equal(result[2], "There's nothing left of it now.");
//     test.equal(result.length, 3);
//     test.equal(felix.inventory.length, 0);
//     test.equal(felix.hunger, 7);
//     test.done();
// };

// exports.character_tasteObjectDoesNotExtractsObjectWhenMoreThanOneLeft = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.hunger = 6;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var bread = new Item();
//     bread.keywords.push("bread");
//     bread.shortDescription = "some waybread";
//     bread.hoursOfHunger = 3;  
//     felix.inventory.push(bread);
//     myWorld.addItem(bread);
    
//     var result = felix.eatObject(bread, global.SCMD_TASTE);
//     test.equal(result[0], "You nibble a little bit of some waybread.");
//     test.equal(result[1], "Felix nibbles a little bit of some waybread.");
//     test.equal(felix.inventory[0], bread);
//     test.equal(bread.hoursOfHunger, 2);
//     test.equal(felix.hunger, 7);
//     test.done();
// };

// exports.character_eatItemPreventsEatingNonFood = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.hunger = 6;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var lightbulb = new Item();
//     lightbulb.keywords.push("bulb");
//     lightbulb.shortDescription = "a lightbulb";
//     lightbulb.type = global.ITEM_LIGHT;
//     felix.inventory.push(lightbulb);
//     myWorld.addItem(lightbulb);
    
//     var result = felix.eatItem("bulb", global.SCMD_EAT);
//     test.equal(result[0], "A lightbulb -- You can't eat THAT!");
//     test.equal(result.length, 1);
//     test.equal(felix.inventory.length, 1);
//     test.equal(felix.hunger, 6);
//     test.done();
// };

// exports.character_eatItemEatsItem = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.hunger = 6;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var bread = new Item();
//     bread.keywords.push("bread");
//     bread.shortDescription = "some waybread";
//     bread.hoursOfHunger = 3;
//     bread.type = global.ITEM_FOOD;
//     felix.inventory.push(bread);
//     myWorld.addItem(bread);

//     var result = felix.eatItem("bread", global.SCMD_EAT);
//     test.equal(result[0][0], "You eat some waybread.");
//     test.equal(result[0][1], "Felix eats some waybread.");
//     test.equal(result.length, 1);
//     test.equal(felix.inventory.length, 0);
//     test.equal(felix.hunger, 9);
//     test.done();
// };

// exports.character_eatItemEatsAllDotItem = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.hunger = 6;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var bread1 = new Item();
//     bread1.keywords.push("bread");
//     bread1.shortDescription = "some waybread";
//     bread1.hoursOfHunger = 3;
//     bread1.type = global.ITEM_FOOD;
//     felix.inventory.push(bread1);
//     myWorld.addItem(bread1);
    
//     var bread2 = new Item();
//     bread2.keywords.push("bread");
//     bread2.shortDescription = "some waybread";
//     bread2.hoursOfHunger = 3;
//     bread2.type = global.ITEM_FOOD;
//     felix.inventory.push(bread2);
//     myWorld.addItem(bread2);
    
//     var lightbulb = new Item();
//     lightbulb.keywords.push("bulb");
//     lightbulb.shortDescription = "a lightbulb";
//     lightbulb.type = global.ITEM_LIGHT;
//     felix.inventory.push(lightbulb);
//     myWorld.addItem(lightbulb);
    
//     var result = felix.eatItem("all.bread", global.SCMD_EAT);
//     test.equal(result[0][0], "You eat some waybread.");
//     test.equal(result[0][1], "Felix eats some waybread.");
//     test.equal(result[1][0], "You eat some waybread.");
//     test.equal(result[1][1], "Felix eats some waybread.");    
//     test.equal(result.length, 2);
//     test.equal(felix.inventory.length, 1);
//     test.equal(felix.hunger, 12);
//     test.done();
// };

// exports.character_eatItemEatsAllItem = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.hunger = 6;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var bread1 = new Item();
//     bread1.keywords.push("bread");
//     bread1.shortDescription = "some waybread";
//     bread1.hoursOfHunger = 3;
//     bread1.type = global.ITEM_FOOD;
//     felix.inventory.push(bread1);
//     myWorld.addItem(bread1);
    
//     var bread2 = new Item();
//     bread2.keywords.push("bread");
//     bread2.shortDescription = "some waybread";
//     bread2.hoursOfHunger = 3;
//     bread2.type = global.ITEM_FOOD;
//     felix.inventory.push(bread2);
//     myWorld.addItem(bread2);
    
//     var lightbulb = new Item();
//     lightbulb.keywords.push("bulb");
//     lightbulb.shortDescription = "a lightbulb";
//     lightbulb.type = global.ITEM_LIGHT;
//     felix.inventory.push(lightbulb);
//     myWorld.addItem(lightbulb);
    
//     var result = felix.eatItem("all", global.SCMD_EAT);
//     test.equal(result[0][0], "You eat some waybread.");
//     test.equal(result[0][1], "Felix eats some waybread.");
//     test.equal(result[1][0], "You eat some waybread.");
//     test.equal(result[1][1], "Felix eats some waybread.");    
//     test.equal(result[2], "A lightbulb -- You can't eat THAT!");  
//     test.equal(result.length, 3);
//     test.equal(felix.inventory.length, 1);
//     test.equal(felix.hunger, 12);
//     test.done();
// };


// exports.character_drinkFromObjectWorksAsExpected = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var canteen = new Item();
//     canteen.keywords.push("canteen");
//     canteen.shortDescription = "a canteen";
//     canteen.containsLiquid = 0;  // Water
//     canteen.quantity = 10;
//     felix.inventory.push(canteen);
//     myWorld.addItem(canteen);
    
//     var result = felix.drinkFromObject(canteen, global.SCMD_DRINK);
//     test.equal(result[0], "You drink the water.");
//     test.equal(result[1], "Felix drinks water from a canteen.");
//     test.equal(result.length, 2);
//     test.equal(felix.inventory.length, 1);
//     test.equal(canteen.quantity, 2);
//     test.done();
// };

// exports.character_drinkFromObjectAffectsThirst = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.thirst = 12;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var canteen = new Item();
//     canteen.keywords.push("canteen");
//     canteen.shortDescription = "a canteen";
//     canteen.containsLiquid = 0;  // Water
//     canteen.quantity = 10;
//     felix.inventory.push(canteen);
//     myWorld.addItem(canteen);
    
//     var result = felix.drinkFromObject(canteen, global.SCMD_DRINK);
//     test.equal(result[0], "You drink the water.");
//     test.equal(result[1], "Felix drinks water from a canteen.");
//     test.equal(result[2], "You don't feel thirsty anymore.");
//     test.equal(felix.thirst, 22);
//     test.done();
// };

// exports.character_drinkFromObjectAffectsThirstNotHunger = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.thirst = 12;
//     felix.hunger = 8;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var canteen = new Item();
//     canteen.keywords.push("canteen");
//     canteen.shortDescription = "a canteen";
//     canteen.containsLiquid = 1;  // beer
//     canteen.quantity = 10;
//     felix.inventory.push(canteen);
//     myWorld.addItem(canteen);
    
//     var result = felix.drinkFromObject(canteen, global.SCMD_DRINK);
//     test.equal(result[0], "You drink the beer.");
//     test.equal(result[1], "Felix drinks beer from a canteen.");
//     test.equal(felix.thirst, 17);
//     test.equal(felix.hunger, 8);
//     test.done();
// };

// exports.character_drinkFromObjectAffectsDrunkness_1 = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.thirst = 12;
//     felix.hunger = 8;
//     felix.drunk = 10;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var canteen = new Item();
//     canteen.keywords.push("canteen");
//     canteen.shortDescription = "a canteen";
//     canteen.containsLiquid = 7;  // firebreather
//     canteen.quantity = 10;
//     felix.inventory.push(canteen);
//     myWorld.addItem(canteen);
    
//     var result = felix.drinkFromObject(canteen, global.SCMD_DRINK);
//     test.equal(result[0], "You drink the firebreather.");
//     test.equal(result[1], "Felix drinks firebreather from a canteen.");
//     test.equal(result[2], "You are drunk.");
//     test.equal(felix.thirst, 12);
//     test.equal(felix.hunger, 8);
//     test.equal(felix.drunk, 20);
//     test.done();
// };

// exports.character_drinkFromObjectAffectsDrunkness_2 = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.thirst = 12;
//     felix.hunger = 8;
//     felix.drunk = 14;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var canteen = new Item();
//     canteen.keywords.push("canteen");
//     canteen.shortDescription = "a canteen";
//     canteen.containsLiquid = 7;  // firebreather
//     canteen.quantity = 10;
//     felix.inventory.push(canteen);
//     myWorld.addItem(canteen);
    
//     var result = felix.drinkFromObject(canteen, global.SCMD_DRINK);
//     test.equal(result[0], "You drink the firebreather.");
//     test.equal(result[1], "Felix drinks firebreather from a canteen.");
//     test.equal(result[2], "You are REALLY drunk!");
//     test.equal(felix.thirst, 12);
//     test.equal(felix.hunger, 8);
//     test.equal(felix.drunk, 24);
//     test.done();
// };

// exports.character_sipFromObjectAffectsThirstByOne = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.thirst = 12;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var canteen = new Item();
//     canteen.keywords.push("canteen");
//     canteen.shortDescription = "a canteen";
//     canteen.containsLiquid = 0;  // Water
//     canteen.quantity = 10;
//     felix.inventory.push(canteen);
//     myWorld.addItem(canteen);
    
//     var result = felix.drinkFromObject(canteen, global.SCMD_SIP);
//     test.equal(result[0], "It tastes like water.");
//     test.equal(result[1], "Felix sips from a canteen.");
//     test.equal(felix.thirst, 13);
//     test.equal(canteen.quantity, 9);
//     test.done();
// };

// exports.character_drinkFromItemReturnsErrorWhenNotFound = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.thirst = 12;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);

//     var result = felix.drinkItem("canteen", global.SCMD_DRINK);
//     test.equal(result[0], "Drink what?!?");
//     test.equal(felix.thirst, 12);
//     test.done();
// };

// exports.character_drinkFromItemReturnsErrorWhenNotADrinkContainer = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.thirst = 12;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);

//     var shield = new Item();
//     shield.keywords.push("shield");
//     shield.shortDescription = "an iron shield";
//     shield.type = global.ITEM_ARMOR;
//     felix.inventory.push(shield);
//     myWorld.addItem(shield);
    
//     var result = felix.drinkItem("shield", global.SCMD_DRINK);
//     test.equal(result[0], "An iron shield -- You can't drink from THAT!");
//     test.equal(felix.thirst, 12);
//     test.done();
// };

// exports.character_drinkFromItemDrinksFromFountainInRoom = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.thirst = 12;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);

//     var fountain = new Item();
//     fountain.keywords.push("fountain");
//     fountain.shortDescription = "the marble fountain";
//     fountain.type = global.ITEM_FOUNTAIN;
//     fountain.containsLiquid = 6;   // lemonade
//     fountain.quantity = 100;
//     myRoom.addItem(fountain);
//     myWorld.addItem(fountain);
    
//     var result = felix.drinkItem("fountain", global.SCMD_DRINK);
//     test.equal(result[0][0], "You drink the lemonade.");
//     test.equal(result[0][1], "Felix drinks lemonade from the marble fountain.");
//     test.equal(felix.thirst, 20);
//     test.done();
// };

// exports.character_drinkFromItemRequiresItemInInventory = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.thirst = 12;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);

//     var mug = new Item();
//     mug.keywords.push("mug");
//     mug.shortDescription = "a mug";
//     mug.type = global.ITEM_DRINKCONTAINER;
//     mug.containsLiquid = 6;   // lemonade
//     mug.quantity = 7;
//     myRoom.addItem(mug);
//     myWorld.addItem(mug);
    
//     var result = felix.drinkItem("mug", global.SCMD_DRINK);
//     test.equal(result[0], "You have to be holding that to drink from it.");
//     test.equal(felix.thirst, 12);
//     test.done();
// };

// exports.character_drinkFromItemReturnsErrorWhenItemEmpty = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.thirst = 12;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);

//     var mug = new Item();
//     mug.keywords.push("mug");
//     mug.shortDescription = "a mug";
//     mug.type = global.ITEM_DRINKCONTAINER;
//     mug.containsLiquid = 6;   // lemonade
//     mug.quantity = 0;
//     felix.inventory.push(mug);
//     myWorld.addItem(mug);
    
//     var result = felix.drinkItem("mug", global.SCMD_DRINK);
//     test.equal(result[0], "It's empty!");
//     test.equal(felix.thirst, 12);
//     test.done();
// };

// exports.character_drinkFromItemDrinksFromEverything = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.thirst = 0;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);

//     var mug1 = new Item();
//     mug1.keywords.push("mug");
//     mug1.shortDescription = "a mug";
//     mug1.type = global.ITEM_DRINKCONTAINER;
//     mug1.containsLiquid = 6;   // lemonade
//     mug1.quantity = 8;
//     felix.inventory.push(mug1);
//     myWorld.addItem(mug1);
    
//     var mug2 = new Item();
//     mug2.keywords.push("mug");
//     mug2.shortDescription = "a mug";
//     mug2.type = global.ITEM_DRINKCONTAINER;
//     mug2.containsLiquid = 6;   // lemonade
//     mug2.quantity = 8;
//     felix.inventory.push(mug2);
//     myWorld.addItem(mug2);
    
//     var result = felix.drinkItem("all.mug", global.SCMD_DRINK);
//     test.equal(result[0][0], "You drink the lemonade.");
//     test.equal(result[0][1], "Felix drinks lemonade from a mug.");
//     test.equal(result[1][0], "You drink the lemonade.");
//     test.equal(result[1][1], "Felix drinks lemonade from a mug.");    
//     test.equal(felix.thirst, 16);
//     test.done();
// };

// exports.character_drinkFromItemWillNotSetItemQuantityBelowZero = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.thirst = 0;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);

//     var mug = new Item();
//     mug.keywords.push("mug");
//     mug.shortDescription = "a mug";
//     mug.type = global.ITEM_DRINKCONTAINER;
//     mug.containsLiquid = 15;   // clear water
//     mug.quantity = 5;
//     felix.inventory.push(mug);
//     myWorld.addItem(mug);

//     var result = felix.drinkItem("mug", global.SCMD_DRINK);
//     test.equal(result[0][0], "You drink the clear water.");
//     test.equal(result[0][1], "Felix drinks clear water from a mug.");
//     test.equal(felix.thirst, 13);
//     test.equal(mug.quantity, 0);
//     test.done();
// };

// exports.character_giveObjectWorks = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.gender = global.GENDER_MALE;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var strat = new Character();
//     strat.name = "Strat";
//     strat.gender = global.GENDER_MALE;
//     myRoom.addCharacter(strat);
//     myWorld.addCharacter(strat);
    
//     var gloves = new Item();
//     gloves.keywords.push("gloves");
//     gloves.shortDescription = "a pair of gloves";
//     felix.inventory.push(gloves);
//     myWorld.addItem(gloves);
    
//     var result = felix.giveObject(gloves, strat);
//     test.equal(result[0], "You give a pair of gloves to Strat.");
//     test.equal(result[1], "Felix gives you a pair of gloves.");
//     test.equal(result[2], "Felix gives a pair of gloves to Strat.");
//     test.equal(felix.inventory.length, 0);
//     test.equal(strat.inventory[0], gloves);
//     test.done();
// };

// exports.character_giveItemWorks = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.gender = global.GENDER_MALE;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var strat = new Character();
//     strat.name = "Strat";
//     strat.gender = global.GENDER_MALE;
//     myRoom.addCharacter(strat);
//     myWorld.addCharacter(strat);
    
//     var gloves = new Item();
//     gloves.keywords.push("gloves");
//     gloves.shortDescription = "a pair of gloves";
//     felix.inventory.push(gloves);
//     myWorld.addItem(gloves);
    
//     var result = felix.giveItem("gloves", "strat");
//     test.equal(result[0][0], "You give a pair of gloves to Strat.");
//     test.equal(result[0][1], "Felix gives you a pair of gloves.");
//     test.equal(result[0][2], "Felix gives a pair of gloves to Strat.");
//     test.equal(felix.inventory.length, 0);
//     test.equal(strat.inventory[0], gloves);
//     test.done();
// };

// exports.character_giveItemReturnsErrorWhenItemNotFound = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.gender = global.GENDER_MALE;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var strat = new Character();
//     strat.name = "Strat";
//     strat.gender = global.GENDER_MALE;
//     myRoom.addCharacter(strat);
//     myWorld.addCharacter(strat);

//     var result = felix.giveItem("gloves", "strat");
//     test.equal(result[0], "Give what?");
//     test.equal(felix.inventory.length, 0);
//     test.equal(strat.inventory.length, 0);
//     test.done();
// };

// exports.character_giveItemReturnsErrorWhenTargetNotFound = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.gender = global.GENDER_MALE;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);

//     var gloves = new Item();
//     gloves.keywords.push("gloves");
//     gloves.shortDescription = "a pair of gloves";
//     felix.inventory.push(gloves);
//     myWorld.addItem(gloves);
    
//     var result = felix.giveItem("gloves", "strat");
//     test.equal(result[0], "No-one by that name here.");
//     test.equal(felix.inventory[0], gloves);
//     test.done();
// };

// exports.character_giveItemReturnsErrorWhenTargetIsSelf = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.gender = global.GENDER_MALE;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);

//     var gloves = new Item();
//     gloves.keywords.push("gloves");
//     gloves.shortDescription = "a pair of gloves";
//     felix.inventory.push(gloves);
//     myWorld.addItem(gloves);
    
//     var result = felix.giveItem("gloves", "felix");
//     test.equal(result[0], "Give something to yourself?!?");
//     test.equal(felix.inventory[0], gloves);
//     test.done();
// };

// exports.character_giveItemWorksForAllDotItem = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.gender = global.GENDER_MALE;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var strat = new Character();
//     strat.name = "Strat";
//     strat.gender = global.GENDER_MALE;
//     myRoom.addCharacter(strat);
//     myWorld.addCharacter(strat);
    
//     var gloves1 = new Item();
//     gloves1.keywords.push("gloves");
//     gloves1.shortDescription = "a pair of gloves";
//     felix.inventory.push(gloves1);
//     myWorld.addItem(gloves1);

//     var gloves2 = new Item();
//     gloves2.keywords.push("gloves");
//     gloves2.shortDescription = "a pair of gloves";
//     felix.inventory.push(gloves2);
//     myWorld.addItem(gloves2);

//     var scarf = new Item();
//     scarf.keywords.push("scarf");
//     scarf.shortDescription = "a wool scarf";
//     felix.inventory.push(scarf);
//     myWorld.addItem(scarf);
    
//     var result = felix.giveItem("all.gloves", "strat");
//     test.equal(result[0][0], "You give a pair of gloves to Strat.");
//     test.equal(result[0][1], "Felix gives you a pair of gloves.");
//     test.equal(result[0][2], "Felix gives a pair of gloves to Strat.");
//     test.equal(result[1][0], "You give a pair of gloves to Strat.");
//     test.equal(result[1][1], "Felix gives you a pair of gloves.");
//     test.equal(result[1][2], "Felix gives a pair of gloves to Strat.");
//     test.equal(felix.inventory.length, 1);
//     test.equal(strat.inventory[0], gloves1);
//     test.equal(strat.inventory[1], gloves2);
//     test.done();
// };

// exports.character_giveItemWorksForAll = function(test) {
//     var myWorld = new World();
//     var myRoom = new Room();
        
//     var felix = new Character();
//     felix.name = "Felix";
//     felix.gender = global.GENDER_MALE;
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var strat = new Character();
//     strat.name = "Strat";
//     strat.gender = global.GENDER_MALE;
//     myRoom.addCharacter(strat);
//     myWorld.addCharacter(strat);
    
//     var gloves1 = new Item();
//     gloves1.keywords.push("gloves");
//     gloves1.shortDescription = "a pair of gloves";
//     felix.inventory.push(gloves1);
//     myWorld.addItem(gloves1);

//     var gloves2 = new Item();
//     gloves2.keywords.push("gloves");
//     gloves2.shortDescription = "a pair of gloves";
//     felix.inventory.push(gloves2);
//     myWorld.addItem(gloves2);

//     var scarf = new Item();
//     scarf.keywords.push("scarf");
//     scarf.shortDescription = "a wool scarf";
//     felix.inventory.push(scarf);
//     myWorld.addItem(scarf);
    
//     var result = felix.giveItem("all", "strat");
//     test.equal(result[0][0], "You give a pair of gloves to Strat.");
//     test.equal(result[0][1], "Felix gives you a pair of gloves.");
//     test.equal(result[0][2], "Felix gives a pair of gloves to Strat.");
//     test.equal(result[1][0], "You give a pair of gloves to Strat.");
//     test.equal(result[1][1], "Felix gives you a pair of gloves.");
//     test.equal(result[1][2], "Felix gives a pair of gloves to Strat.");
//     test.equal(result[2][0], "You give a wool scarf to Strat.");
//     test.equal(result[2][1], "Felix gives you a wool scarf.");
//     test.equal(result[2][2], "Felix gives a wool scarf to Strat.");    
//     test.equal(felix.inventory.length, 0);
//     test.equal(strat.inventory[0], gloves1);
//     test.equal(strat.inventory[1], gloves2);
//     test.equal(strat.inventory[2], scarf);
//     test.done();
// };

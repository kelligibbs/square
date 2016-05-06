// var constants = require('../constants');
// var Room = require('../room').room;
// var Exit = require('../room').exit;
// var Item = require('../item').item;
// var Character = require("../character").character;
// var World = require('../world');

// exports.room_hasNoPeople = function(test) {
// 	var myRoom = new Room();
// 	test.equal(myRoom.players.length, 0);
// 	test.equal(myRoom.npcs.length, 0);
// 	test.done();
// };

// exports.room_canContainPeople = function(test) {
//     var myRoom = new Room();
//     var actor = new Character();

//     myRoom.players.push(actor);
//     test.equal(myRoom.players.length, 1);
//     test.done();
// };

// exports.room_addCharacterRemoveCharacterWorks = function(test) {
//     var myRoom = new Room();
//     var actor = new Character();

//     test.equal(myRoom.players.length, 0);
//     myRoom.addCharacter(actor);
//     test.equal(myRoom.players.length, 1);
//     myRoom.removeCharacter(actor);
//     test.equal(myRoom.players.length, 0);
//     test.done();
// };

// exports.room_hasNoContents = function(test) {
//     var myRoom = new Room();
//     test.equal(myRoom.contents.length, 0);
//     test.done();
// };

// exports.room_canContainItems = function(test) {
//     var myRoom = new Room();
//     var myItem = new Item();

//     myRoom.contents.push(myItem);
//     test.equal(myRoom.contents.length, 1);
//     test.done();
// };

// exports.room_addItemRemoveItemWorks = function(test) {
//     var myRoom = new Room();
//     var myItem = new Item();

//     myRoom.addItem(myItem);
//     test.equal(myRoom.contents.length, 1);
//     myRoom.removeItem(myItem);
//     test.equal(myRoom.contents.length, 0);
//     test.done();
// };

// exports.room_containsItemWorks = function(test) {
//     var myRoom = new Room();
//     var myItem = new Item();

//     test.equal(myRoom.contains(myItem), false);
//     myRoom.addItem(myItem);
//     test.equal(myRoom.contains(myItem), true);
//     myRoom.removeItem(myItem);
//     test.equal(myRoom.contains(myItem), false);
//     test.done();
// };

// exports.room_showRoomToCharacterReturnsArray = function(test) {
//     var myRoom = new Room();

//     var roomTitle = "Apok's Lounge";
//     var roomDescription = "This is where Apok goes to chill out.";
//     var roomExits = "[ Exits: None! ]";
//     myRoom.title = roomTitle;
//     myRoom.description = roomDescription;

//     var Apok = new Character();

//     var roomAppearance = myRoom.showRoomToCharacter(Apok);
//     test.equal(roomAppearance.length, 3);
//     test.equal(roomAppearance[0].text, roomTitle);
//     test.equal(roomAppearance[0].color, "Cyan");
//     test.equal(roomAppearance[1].text, "     This is where Apok goes to chill out.");
//     test.equal(roomAppearance[1].color, "Gray");
//     test.equal(roomAppearance[2].text, roomExits);
//     test.equal(roomAppearance[2].color, "Cyan");
//     test.done();
// };

// exports.room_showRoomToCharacterIncludesItems = function(test) {
//     var myRoom = new Room();

//     var roomTitle = "Apok's Lounge";
//     var roomDescription = "This is where Apok goes to chill out.";
//     myRoom.title = roomTitle;
//     myRoom.description = roomDescription;

//     var myItem = new Item();
//     var longDescription = "A broken sword has been left behind here.";
//     myItem.longDescription  = longDescription;
//     myRoom.addItem(myItem);

//     var Apok = new Character();

//     var roomAppearance = myRoom.showRoomToCharacter(Apok);
//     test.equal(roomAppearance.length, 4);
//     test.equal(roomAppearance[3].text, longDescription);
//     test.equal(roomAppearance[3].color, "Green");
//     test.done();
// };

// exports.room_getExitReturnsNullWhenNoDoorsExist = function(test) {
//     var myRoom = new Room();
//     var myDoor = myRoom.getExit("N");
//     test.equal(myDoor, null);
//     test.done();
// };

// exports.room_getExitReturnsDoor = function(test) {
//     var myRoom = new Room();

//     var myExit = new Exit();
//     myExit.direction = "N";

//     myRoom.exits.push(myExit);

//     var actual = myRoom.getExit("N");
//     test.equal(actual.direction, myExit.direction);
//     test.done();
// };

// exports.room_listExitsReturnsExpected = function(test) {
//     var myRoom = new Room();
    
//     var myExit = new Exit();
//     myExit.direction = "E";
//     myExit.toRoomId = 15;
//     myExit.isClosed = false;
    
//     myRoom.exits.push(myExit);
    
//     var apokRoom = new Room();
//     apokRoom.title = "Apok's Room";
//     apokRoom.id = 15;
    
//     var myWorld = new World();
//     myWorld.rooms.push(myRoom);
//     myWorld.rooms.push(apokRoom);

//     var felix = new Character();
//     myRoom.addCharacter(felix);
//     myWorld.addCharacter(felix);
    
//     var actual = myRoom.listExits(felix);
//     test.equal(actual[0], "Obvious Exits:");
//     test.equal(actual[1], "  E - Apok's Room");
//     test.done();
// };


// exports.room_findByKeywordReturnsNothingWhenNoContents = function(test) {
//     var myRoom = new Room();
//     var actual = myRoom.contents.findByKeyword("sword");
//     test.equal(actual.items.length, 0);
//     test.done();
// };

// exports.room_findByKeywordReturnsItem = function(test) {
//     var myRoom = new Room();

//     var mySword = new Item();
//     mySword.keywords.push("sword");
//     myRoom.addItem(mySword);

//     var actual = myRoom.contents.findByKeyword("sword");
//     test.equal(actual.items.length, 1);
//     test.equal(actual.items[0], mySword);
//     test.done();
// };

// exports.room_findByKeywordReturnsAllItems = function(test) {
//     var myRoom = new Room();

//     var mySword_1 = new Item();
//     mySword_1.keywords.push("sword");
//     myRoom.addItem(mySword_1);

//     var mySword_2 = new Item();
//     mySword_2.keywords.push("sword");
//     myRoom.addItem(mySword_2);

//     var mySword_3 = new Item();
//     mySword_3.keywords.push("sword");
//     myRoom.addItem(mySword_3);

//     var actual = myRoom.contents.findByKeyword("all.sword");
//     test.equal(actual.items.length, 3);
//     test.equal(actual.items[0], mySword_1);
//     test.equal(actual.items[1], mySword_2);
//     test.equal(actual.items[2], mySword_3);
//     test.done();
// };

// exports.room_findByKeywordReturnsFirstWhenNoDot = function(test) {
//     var myRoom = new Room();

//     var mySword_1 = new Item();
//     mySword_1.keywords.push("sword");
//     myRoom.addItem(mySword_1);

//     var mySword_2 = new Item();
//     mySword_2.keywords.push("sword");
//     myRoom.addItem(mySword_2);

//     var mySword_3 = new Item();
//     mySword_3.keywords.push("sword");
//     myRoom.addItem(mySword_3);

//     var actual = myRoom.contents.findByKeyword("sword");
//     test.equal(actual.items.length, 1);
//     test.equal(actual.items[0], mySword_1);
//     test.done();
// };

// exports.room_findByKeywordHandlesDotNotationForN = function(test) {
//     var myRoom = new Room();

//     var mySword_1 = new Item();
//     mySword_1.keywords.push("sword");
//     myRoom.addItem(mySword_1);

//     var mySword_2 = new Item();
//     mySword_2.keywords.push("sword");
//     myRoom.addItem(mySword_2);

//     var mySword_3 = new Item();
//     mySword_3.keywords.push("sword");
//     myRoom.addItem(mySword_3);

//     var actual = myRoom.contents.findByKeyword("2.sword");
//     test.equal(actual.items.length, 1);
//     test.equal(actual.items[0], mySword_2);
//     test.done();
// };

// exports.room_findByKeywordHandlesDotNotationForNonNumber = function(test) {
//     var myRoom = new Room();

//     var mySword_1 = new Item();
//     mySword_1.keywords.push("sword");
//     myRoom.addItem(mySword_1);

//     var mySword_2 = new Item();
//     mySword_2.keywords.push("sword");
//     myRoom.addItem(mySword_2);

//     var mySword_3 = new Item();
//     mySword_3.keywords.push("sword");
//     myRoom.addItem(mySword_3);

//     var actual = myRoom.contents.findByKeyword("fjdskfj.sword");
//     test.equal(actual.items.length, 0);
//     test.done();
// };

// exports.room_findByKeywordHandlesDotNotationInvalidInput = function(test) {
//     var myRoom = new Room();

//     var mySword_1 = new Item();
//     mySword_1.keywords.push("sword");
//     myRoom.addItem(mySword_1);

//     var mySword_2 = new Item();
//     mySword_2.keywords.push("sword");
//     myRoom.addItem(mySword_2);

//     var mySword_3 = new Item();
//     mySword_3.keywords.push("sword");
//     myRoom.addItem(mySword_3);

//     var actual = myRoom.contents.findByKeyword("2.");
//     test.equal(actual.items.length, 0);
//     test.done();
// };
